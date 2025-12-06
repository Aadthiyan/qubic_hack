/**
 * Application Constants
 * Centralized configuration and constant values
 */

// Score Thresholds
export const SCORE_THRESHOLDS = {
    GREEN_MIN: 80,
    YELLOW_MIN: 60,
    RED_MAX: 59,
} as const;

// Score Dimension Max Points
export const SCORE_DIMENSIONS = {
    TOKENOMICS: 20,
    VESTING: 20,
    DOCUMENTATION: 15,
    TEAM_HISTORY: 15,
    COMMUNITY: 15,
    AUDIT: 10,
    LAUNCH_READINESS: 5,
    TOTAL: 100,
} as const;

// Project Status Values
export const PROJECT_STATUS = {
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    APPROVED: 'approved',
    LAUNCHED: 'launched',
    FAILED: 'failed',
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

// Risk Grades
export const RISK_GRADES = {
    GREEN: 'Green',
    YELLOW: 'Yellow',
    RED: 'Red',
} as const;

export type RiskGrade = typeof RISK_GRADES[keyof typeof RISK_GRADES];

// Risk Flag Severity
export const SEVERITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
} as const;

export type SeverityLevel = typeof SEVERITY_LEVELS[keyof typeof SEVERITY_LEVELS];

// Access Tiers
export const ACCESS_TIERS = {
    PUBLIC: 'public',
    MID_TIER: 'mid-tier',
    ACCREDITED: 'accredited',
} as const;

export type AccessTier = typeof ACCESS_TIERS[keyof typeof ACCESS_TIERS];

// Launch Config Recommendations by Grade
export const LAUNCH_CONFIGS = {
    [RISK_GRADES.GREEN]: {
        capMin: 100000,
        capMax: 500000,
        feeTierPercent: 2.5,
        accessTier: ACCESS_TIERS.PUBLIC,
        recommendation: 'Safe for launch. Standard parameters recommended.',
    },
    [RISK_GRADES.YELLOW]: {
        capMin: 50000,
        capMax: 200000,
        feeTierPercent: 4.0,
        accessTier: ACCESS_TIERS.MID_TIER,
        recommendation: 'Proceed with caution. Reduced cap and higher fees recommended.',
    },
    [RISK_GRADES.RED]: {
        capMin: 10000,
        capMax: 50000,
        feeTierPercent: 6.0,
        accessTier: ACCESS_TIERS.ACCREDITED,
        recommendation: 'High risk. Minimal cap, highest fees, and accredited investors only.',
    },
} as const;

// API Response Messages
export const API_MESSAGES = {
    SUCCESS: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;

// Pagination Defaults
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
    TEAM_ALLOCATION_MAX: 100,
    TEAM_ALLOCATION_RECOMMENDED_MAX: 20,
    VESTING_MONTHS_RECOMMENDED_MIN: 12,
    VESTING_MONTHS_RECOMMENDED_MAX: 36,
    SCORE_MIN: 0,
    SCORE_MAX: 100,
} as const;

// Regular Expressions
export const REGEX = {
    URL: /^https?:\/\/.+/,
    TWITTER_HANDLE: /^@?[A-Za-z0-9_]{1,15}$/,
    DISCORD_INVITE: /^https:\/\/discord\.gg\/.+/,
    GITHUB_URL: /^https:\/\/github\.com\/.+/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
} as const;

// Error Codes
export const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    DUPLICATE: 'DUPLICATE',
    DATABASE_ERROR: 'DATABASE_ERROR',
    EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
