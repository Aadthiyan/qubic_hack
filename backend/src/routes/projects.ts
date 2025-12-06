/**
 * Projects Routes
 * Handles project CRUD operations
 */

import { Router, Request, Response } from 'express';
import { projectService } from '../services/ProjectService';
import { scoringService } from '../services/ScoringService';
import { asyncHandler } from '../middleware/errorHandler';
import { validateProjectSubmission, validatePagination } from '../utils/validation';
import { HTTP_STATUS, API_MESSAGES } from '../utils/constants';
import { query } from '../db/connection';

const router = Router();

/**
 * GET /api/projects
 * List all projects with pagination
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const status = req.query.status as string | undefined;

        const { page: validPage, limit: validLimit } = validatePagination(page, limit);

        const { projects, total } = await projectService.getAllProjects(validPage, validLimit, status);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: {
                projects,
                pagination: {
                    page: validPage,
                    limit: validLimit,
                    total,
                    totalPages: Math.ceil(total / validLimit),
                },
            },
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * GET /api/projects/:id
 * Get project details with latest score and config
 */
router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const { project, metadata, score, config } = await projectService.getProjectById(id);

        // Get risk flags if score exists
        let flags = [];
        if (score) {
            const flagsResult = await query('SELECT * FROM risk_flags WHERE score_id = $1', [score.id]);
            flags = flagsResult.rows;
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: {
                project,
                metadata,
                score: score ? { ...score, flags } : null,
                config,
            },
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * POST /api/projects
 * Create new project
 */
router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        // Validate input
        validateProjectSubmission(req.body);

        // Create project
        const { project, metadata } = await projectService.createProject({
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            whitepaperUrl: req.body.whitepaperUrl,
            githubUrl: req.body.githubUrl,
            twitterHandle: req.body.twitterHandle,
            discordInvite: req.body.discordInvite,
            teamAllocationPercent: req.body.teamAllocationPercent,
            teamVestingMonths: req.body.teamVestingMonths,
            hasFounderLocks: req.body.hasFounderLocks,
            supplyDistributionFair: req.body.supplyDistributionFair,
            totalSupply: req.body.totalSupply ? BigInt(req.body.totalSupply) : undefined,
            initialCirculatingSupply: req.body.initialCirculatingSupply
                ? BigInt(req.body.initialCirculatingSupply)
                : undefined,
        });

        // Calculate initial score
        const scoreResult = await scoringService.scoreProject(project, metadata);

        // Save score to database
        const client = await (await import('../db/connection')).getClient();
        try {
            await client.query('BEGIN');

            // Insert score
            const scoreInsertResult = await client.query(
                `INSERT INTO scores (
          project_id, score, grade, tokenomics_score, vesting_score,
          documentation_score, team_history_score, community_score,
          audit_score, launch_readiness_score
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
                [
                    project.id,
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

            // Insert launch config
            const configParams = getConfigFromGrade(scoreResult.grade);
            await client.query(
                `INSERT INTO launch_configs (
          project_id, score_id, cap_min, cap_max, fee_tier_percent,
          access_tier, recommendation
        )
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    project.id,
                    savedScore.id,
                    configParams.capMin,
                    configParams.capMax,
                    configParams.feeTierPercent,
                    configParams.accessTier,
                    scoreResult.recommendation,
                ]
            );

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: API_MESSAGES.CREATED,
            data: {
                project,
                metadata,
                score: scoreResult,
            },
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * PATCH /api/projects/:id/status
 * Update project status
 */
router.patch(
    '/:id/status',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Status is required',
                },
            });
        }

        const project = await projectService.updateProjectStatus(id, status);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: API_MESSAGES.UPDATED,
            data: { project },
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * DELETE /api/projects/:id
 * Delete project
 */
router.delete(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        await projectService.deleteProject(id);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: API_MESSAGES.DELETED,
            timestamp: new Date().toISOString(),
        });
    })
);

// Helper function to get config parameters from grade
function getConfigFromGrade(grade: string) {
    const { LAUNCH_CONFIGS } = require('../utils/constants');
    return LAUNCH_CONFIGS[grade];
}

export default router;
