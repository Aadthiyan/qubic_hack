/**
 * Express Application Setup
 * Main application configuration and middleware setup
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';
import { testConnection } from './db/connection';

// Import routes
import projectRoutes from './routes/projects';
import scoreRoutes from './routes/scores';
import simulateRoutes from './routes/simulate';
import analyticsRoutes from './routes/analytics';
import contractRoutes from './routes/contract';

// Load environment variables
dotenv.config();

/**
 * Create and configure Express application
 */
export function createApp(): Express {
    const app = express();

    // ========================================
    // MIDDLEWARE
    // ========================================

    // Security middleware
    app.use(helmet());

    // CORS configuration
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true,
        })
    );

    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    app.use(requestLogger);

    // ========================================
    // ROUTES
    // ========================================

    // Health check endpoint
    app.get('/api/health', async (req: Request, res: Response) => {
        try {
            const dbHealthy = await testConnection();

            res.status(200).json({
                success: true,
                data: {
                    status: 'ok',
                    message: 'Nostromo Guardian API is running',
                    timestamp: new Date().toISOString(),
                    version: '1.0.0',
                    database: dbHealthy ? 'connected' : 'disconnected',
                },
            });
        } catch (error) {
            res.status(503).json({
                success: false,
                data: {
                    status: 'degraded',
                    message: 'API is running but database is unavailable',
                    timestamp: new Date().toISOString(),
                    version: '1.0.0',
                    database: 'disconnected',
                },
            });
        }
    });

    // Root endpoint
    app.get('/', (req: Request, res: Response) => {
        res.json({
            success: true,
            data: {
                name: 'Nostromo Guardian API',
                description: 'Risk Scoring Engine for Qubic Launches',
                version: '1.0.0',
                documentation: '/api/docs',
                endpoints: {
                    health: '/api/health',
                    projects: '/api/projects',
                    scores: '/api/scores',
                    simulate: '/api/simulate',
                    analytics: '/api/analytics',
                },
            },
        });
    });

    // API Routes
    app.use('/api/projects', projectRoutes);
    app.use('/api/scores', scoreRoutes);
    app.use('/api/simulate', simulateRoutes);
    app.use('/api/analytics', analyticsRoutes);
    app.use('/api/contract', contractRoutes);

    // ========================================
    // ERROR HANDLING
    // ========================================

    // 404 handler (must be after all routes)
    app.use(notFoundHandler);

    // Global error handler (must be last)
    app.use(errorHandler);

    return app;
}

/**
 * Start the Express server
 */
export async function startServer(app: Express): Promise<void> {
    const PORT = process.env.PORT || 4000;

    try {
        // Test database connection
        logger.info('Testing database connection...');
        const dbConnected = await testConnection();

        if (!dbConnected) {
            logger.warn('Database connection failed - API will run in degraded mode');
        }

        // Start server
        app.listen(PORT, () => {
            logger.info(`🚀 Server is running on http://localhost:${PORT}`);
            logger.info(`📊 Health check: http://localhost:${PORT}/api/health`);
            logger.info(`📚 API docs: http://localhost:${PORT}/`);
            logger.info(`🗄️  Database: ${dbConnected ? 'Connected ✅' : 'Disconnected ⚠️'}`);
        });
    } catch (error) {
        logger.error('Failed to start server', error as Error);
        process.exit(1);
    }
}
