/**
 * Authentication Middleware
 * API key validation for protected endpoints
 */

import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, ERROR_CODES, API_MESSAGES } from '../utils/constants';
import { AppError } from './errorHandler';

/**
 * Simple API key authentication middleware
 * For production, use JWT or OAuth2
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'] as string;

    // For hackathon, we'll use a simple API key from env
    // In production, use proper authentication (JWT, OAuth2, etc.)
    const validApiKey = process.env.API_KEY || 'dev-api-key-123';

    if (!apiKey) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            'API key is required',
            ERROR_CODES.UNAUTHORIZED
        );
    }

    if (apiKey !== validApiKey) {
        throw new AppError(
            HTTP_STATUS.UNAUTHORIZED,
            'Invalid API key',
            ERROR_CODES.UNAUTHORIZED
        );
    }

    next();
}

/**
 * Optional authentication - doesn't fail if no key provided
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
    const apiKey = req.headers['x-api-key'] as string;

    if (apiKey) {
        const validApiKey = process.env.API_KEY || 'dev-api-key-123';
        if (apiKey === validApiKey) {
            (req as any).authenticated = true;
        }
    }

    next();
}
