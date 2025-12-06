/**
 * Analytics Routes
 * Provides ecosystem statistics and insights
 */

import { Router, Request, Response } from 'express';
import { analyticsService } from '../services/AnalyticsService';
import { asyncHandler } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../utils/constants';

const router = Router();

/**
 * GET /api/analytics
 * Get ecosystem analytics
 */
router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const analytics = await analyticsService.getAnalytics();

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: analytics,
            timestamp: new Date().toISOString(),
        });
    })
);

/**
 * GET /api/analytics/flags
 * Get risk flag statistics
 */
router.get(
    '/flags',
    asyncHandler(async (req: Request, res: Response) => {
        const flagStats = await analyticsService.getRiskFlagStats();

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: flagStats,
            timestamp: new Date().toISOString(),
        });
    })
);

export default router;
