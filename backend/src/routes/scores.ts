/**
 * Scores Routes
 * Handles score calculation and history
 */

import { Router, Request, Response } from 'express';
import { scoringService } from '../services/ScoringService';
import { projectService } from '../services/ProjectService';
import { asyncHandler } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import { query, getClient } from '../db/connection';

const router = Router();

/**
 * POST /api/scores/:projectId
 * Recalculate score for a project
 */
router.post(
    '/:projectId',
    asyncHandler(async (req: Request, res: Response) => {
        const { projectId } = req.params;

        // Get project and metadata
        const { project, metadata } = await projectService.getProjectById(projectId);

        if (!metadata) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Project metadata not found',
                },
            });
        }

        // Calculate new score
        const scoreResult = await scoringService.scoreProject(project, metadata);

        // Save to database
        const client = await getClient();
        try {
            await client.query('BEGIN');

            // Insert new score
            const scoreInsertResult = await client.query(
                `INSERT INTO scores (
          project_id, score, grade, tokenomics_score, vesting_score,
          documentation_score, team_history_score, community_score,
          audit_score, launch_readiness_score
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
                [
                    projectId,
                    scoreResult.score,
                    scoreResult.grade,
                    scoreResult.subscores.tokenomics,
                    scoreResult.subscores.vesting,
                    scoreResult.subscores.documentation,
                    scoreResult.subscores.teamHistory,
                    scoreResult.subscores.community,
                    scoreResult.subscores.audit,
                    scoreResult.subscores.launchReadiness,
                ]
            );

            const savedScore = scoreInsertResult.rows[0];

            // Insert risk flags
            for (const flag of scoreResult.flags) {
                await client.query(
                    'INSERT INTO risk_flags (score_id, flag_text, severity) VALUES ($1, $2, $3)',
                    [savedScore.id, flag.text, flag.severity]
                );
            }

            // Update launch config
            const { LAUNCH_CONFIGS } = require('../utils/constants');
            const configParams = LAUNCH_CONFIGS[scoreResult.grade];

            await client.query(
                `INSERT INTO launch_configs (
          project_id, score_id, cap_min, cap_max, fee_tier_percent,
          access_tier, recommendation
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (project_id) DO UPDATE SET
           score_id = EXCLUDED.score_id,
           cap_min = EXCLUDED.cap_min,
           cap_max = EXCLUDED.cap_max,
           fee_tier_percent = EXCLUDED.fee_tier_percent,
           access_tier = EXCLUDED.access_tier,
           recommendation = EXCLUDED.recommendation,
           created_at = NOW()`,
                [
                    projectId,
                    savedScore.id,
                    configParams.capMin,
                    configParams.capMax,
                    configParams.feeTierPercent,
                    configParams.accessTier,
                    scoreResult.recommendation,
                ]
            );

            await client.query('COMMIT');

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: 'Score recalculated successfully',
                data: {
                    score: scoreResult,
                },
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    })
);

/**
 * GET /api/scores/:projectId/history
 * Get score history for a project
 */
router.get(
    '/:projectId/history',
    asyncHandler(async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const limit = parseInt(req.query.limit as string) || 10;

        // Get score history
        const scoresResult = await query(
            `SELECT * FROM scores 
       WHERE project_id = $1 
       ORDER BY calculated_at DESC 
       LIMIT $2`,
            [projectId, limit]
        );

        // Get flags for each score
        const scoresWithFlags = await Promise.all(
            scoresResult.rows.map(async (score) => {
                const flagsResult = await query('SELECT * FROM risk_flags WHERE score_id = $1', [score.id]);
                return {
                    ...score,
                    flags: flagsResult.rows,
                };
            })
        );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: {
                scores: scoresWithFlags,
                count: scoresWithFlags.length,
            },
            timestamp: new Date().toISOString(),
        });
    })
);

export default router;
