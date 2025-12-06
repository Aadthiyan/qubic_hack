/**
 * Simulate Routes
 * Handles sandbox scoring without database persistence
 */

import { Router, Request, Response } from 'express';
import { scoringService } from '../services/ScoringService';
import { asyncHandler } from '../middleware/errorHandler';
import { validateSimulateRequest } from '../utils/validation';
import { HTTP_STATUS } from '../utils/constants';

const router = Router();

/**
 * POST /api/simulate
 * Calculate score for form inputs without saving to database
 */
router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        // Validate input
        validateSimulateRequest(req.body);

        // Calculate score
        const result = scoringService.scoreSimulation(req.body);

        // Get launch config based on grade
        const { LAUNCH_CONFIGS } = require('../utils/constants');
        const config = LAUNCH_CONFIGS[result.grade];

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: {
                score: result.score,
                grade: result.grade,
                subscores: result.subscores,
                flags: result.flags,
                recommendation: result.recommendation,
                suggestedConfig: {
                    capMin: config.capMin,
                    capMax: config.capMax,
                    feeTierPercent: config.feeTierPercent,
                    accessTier: config.accessTier,
                },
            },
            timestamp: new Date().toISOString(),
        });
    })
);

export default router;
