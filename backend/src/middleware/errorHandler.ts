/**
 * Error Handler Middleware
 * Centralized error handling for the Express application
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { HTTP_STATUS, API_MESSAGES, ERROR_CODES } from '../utils/constants';
import { ValidationError } from '../utils/validation';

export interface ApiError extends Error {
    statusCode?: number;
    code?: string;
    details?: any;
}

/**
 * Custom error class for API errors
 */
export class AppError extends Error implements ApiError {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error response format
 */
interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
        stack?: string;
    };
    timestamp: string;
}

/**
 * Format error response
 */
function formatErrorResponse(
    error: ApiError,
    includeStack: boolean = false
): ErrorResponse {
    return {
        success: false,
        error: {
            code: error.code || ERROR_CODES.DATABASE_ERROR,
            message: error.message,
            details: error.details,
            ...(includeStack && { stack: error.stack }),
        },
        timestamp: new Date().toISOString(),
    };
}

/**
 * Global error handler middleware
 */
export function errorHandler(
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Log the error
    logger.error('Error occurred', err, {
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
    });

    // Validation errors
    if (err instanceof ValidationError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(
            formatErrorResponse({
                ...err,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                code: ERROR_CODES.VALIDATION_ERROR,
                message: err.message,
                details: { field: err.field },
            })
        );
        return;
    }

    // App errors (custom errors)
    if (err instanceof AppError) {
        res.status(err.statusCode).json(
            formatErrorResponse(err, process.env.NODE_ENV === 'development')
        );
        return;
    }

    // Database errors
    if (err.message?.includes('duplicate key') || err.message?.includes('unique constraint')) {
        res.status(HTTP_STATUS.CONFLICT).json(
            formatErrorResponse({
                ...err,
                statusCode: HTTP_STATUS.CONFLICT,
                code: ERROR_CODES.DUPLICATE,
                message: 'Resource already exists',
            })
        );
        return;
    }

    // Foreign key errors
    if (err.message?.includes('foreign key constraint')) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(
            formatErrorResponse({
                ...err,
                statusCode: HTTP_STATUS.BAD_REQUEST,
                code: ERROR_CODES.VALIDATION_ERROR,
                message: 'Invalid reference to related resource',
            })
        );
        return;
    }

    // Default to 500 server error
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json(
        formatErrorResponse(
            {
                ...err,
                statusCode,
                code: err.code || ERROR_CODES.DATABASE_ERROR,
                message: err.message || API_MESSAGES.SERVER_ERROR,
            },
            process.env.NODE_ENV === 'development'
        )
    );
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response): void {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: {
            code: ERROR_CODES.NOT_FOUND,
            message: `Route ${req.method} ${req.path} not found`,
        },
        timestamp: new Date().toISOString(),
    });
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
