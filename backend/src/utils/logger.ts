/**
 * Logger Utility
 * Provides consistent logging across the application
 */

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

class Logger {
    private getTimestamp(): string {
        return new Date().toISOString();
    }

    private formatMessage(level: LogLevel, message: string, meta?: any): string {
        const timestamp = this.getTimestamp();
        const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] [${level}] ${message}${metaStr}`;
    }

    debug(message: string, meta?: any): void {
        console.debug(this.formatMessage(LogLevel.DEBUG, message, meta));
    }

    info(message: string, meta?: any): void {
        console.info(this.formatMessage(LogLevel.INFO, message, meta));
    }

    warn(message: string, meta?: any): void {
        console.warn(this.formatMessage(LogLevel.WARN, message, meta));
    }

    error(message: string, error?: Error | any, meta?: any): void {
        const errorMeta = error instanceof Error
            ? { message: error.message, stack: error.stack, ...meta }
            : { error, ...meta };
        console.error(this.formatMessage(LogLevel.ERROR, message, errorMeta));
    }

    // HTTP request logging
    logRequest(method: string, path: string, statusCode: number, duration: number): void {
        const emoji = statusCode >= 500 ? '❌' : statusCode >= 400 ? '⚠️' : '✅';
        this.info(`${emoji} ${method} ${path} - ${statusCode} (${duration}ms)`);
    }
}

export const logger = new Logger();
export default logger;
