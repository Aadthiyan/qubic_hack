/**
 * Validation Utilities
 * Input validation and sanitization helpers
 */

import { REGEX, VALIDATION_RULES } from './constants';

export class ValidationError extends Error {
    constructor(public field: string, message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
    return REGEX.URL.test(url);
}

/**
 * Validate Twitter handle
 */
export function isValidTwitterHandle(handle: string): boolean {
    return REGEX.TWITTER_HANDLE.test(handle);
}

/**
 * Validate Discord invite
 */
export function isValidDiscordInvite(invite: string): boolean {
    return REGEX.DISCORD_INVITE.test(invite);
}

/**
 * Validate GitHub URL
 */
export function isValidGithubUrl(url: string): boolean {
    return REGEX.GITHUB_URL.test(url);
}

/**
 * Validate UUID format
 */
export function isValidUuid(uuid: string): boolean {
    return REGEX.UUID.test(uuid);
}

/**
 * Validate score range (0-100)
 */
export function isValidScore(score: number): boolean {
    return score >= VALIDATION_RULES.SCORE_MIN && score <= VALIDATION_RULES.SCORE_MAX;
}

/**
 * Validate team allocation percentage
 */
export function isValidTeamAllocation(percent: number): boolean {
    return percent >= 0 && percent <= VALIDATION_RULES.TEAM_ALLOCATION_MAX;
}

/**
 * Validate vesting months
 */
export function isValidVestingMonths(months: number): boolean {
    return months >= 0;
}

/**
 * Validate pagination parameters
 */
export function validatePagination(page?: number, limit?: number): { page: number; limit: number } {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 && limit <= 100 ? limit : 10;
    return { page: validPage, limit: validLimit };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate required fields
 */
export function validateRequired(fields: Record<string, any>): void {
    for (const [field, value] of Object.entries(fields)) {
        if (value === undefined || value === null || value === '') {
            throw new ValidationError(field, `${field} is required`);
        }
    }
}

/**
 * Validate project submission data
 */
export interface ProjectSubmissionData {
    name: string;
    description?: string;
    websiteUrl?: string;
    whitepaperUrl?: string;
    githubUrl?: string;
    twitterHandle?: string;
    discordInvite?: string;
    teamAllocationPercent: number;
    teamVestingMonths: number;
    hasFounderLocks: boolean;
    supplyDistributionFair: boolean;
}

export function validateProjectSubmission(data: ProjectSubmissionData): void {
    // Required fields
    validateRequired({ name: data.name });

    // Name length
    if (data.name.length < 3 || data.name.length > 255) {
        throw new ValidationError('name', 'Name must be between 3 and 255 characters');
    }

    // URL validations
    if (data.websiteUrl && !isValidUrl(data.websiteUrl)) {
        throw new ValidationError('websiteUrl', 'Invalid website URL');
    }

    if (data.whitepaperUrl && !isValidUrl(data.whitepaperUrl)) {
        throw new ValidationError('whitepaperUrl', 'Invalid whitepaper URL');
    }

    if (data.githubUrl && !isValidGithubUrl(data.githubUrl)) {
        throw new ValidationError('githubUrl', 'Invalid GitHub URL');
    }

    if (data.twitterHandle && !isValidTwitterHandle(data.twitterHandle)) {
        throw new ValidationError('twitterHandle', 'Invalid Twitter handle');
    }

    if (data.discordInvite && !isValidDiscordInvite(data.discordInvite)) {
        throw new ValidationError('discordInvite', 'Invalid Discord invite');
    }

    // Team allocation
    if (!isValidTeamAllocation(data.teamAllocationPercent)) {
        throw new ValidationError('teamAllocationPercent', 'Team allocation must be between 0 and 100');
    }

    // Vesting months
    if (!isValidVestingMonths(data.teamVestingMonths)) {
        throw new ValidationError('teamVestingMonths', 'Vesting months must be non-negative');
    }
}

/**
 * Validate simulate request data
 */
export interface SimulateRequestData {
    name: string;
    teamAllocationPercent: number;
    teamVestingMonths: number;
    hasFounderLocks: boolean;
    supplyDistributionFair: boolean;
    hasWhitepaper: boolean;
    hasRoadmap: boolean;
    documentationClarity: number;
    priorProjects: number;
    trackRecord: 'good' | 'neutral' | 'bad';
    twitterFollowers: number;
    discordMembers: number;
    githubActivity: number;
    hasAudit: boolean;
    hasBugBounty: boolean;
    hasKYC: boolean;
}

export function validateSimulateRequest(data: SimulateRequestData): void {
    validateRequired({ name: data.name });

    if (!isValidTeamAllocation(data.teamAllocationPercent)) {
        throw new ValidationError('teamAllocationPercent', 'Invalid team allocation');
    }

    if (!isValidVestingMonths(data.teamVestingMonths)) {
        throw new ValidationError('teamVestingMonths', 'Invalid vesting months');
    }

    if (data.documentationClarity < 0 || data.documentationClarity > 10) {
        throw new ValidationError('documentationClarity', 'Documentation clarity must be 0-10');
    }

    if (data.priorProjects < 0) {
        throw new ValidationError('priorProjects', 'Prior projects must be non-negative');
    }

    if (!['good', 'neutral', 'bad'].includes(data.trackRecord)) {
        throw new ValidationError('trackRecord', 'Invalid track record value');
    }

    if (data.twitterFollowers < 0) {
        throw new ValidationError('twitterFollowers', 'Twitter followers must be non-negative');
    }

    if (data.discordMembers < 0) {
        throw new ValidationError('discordMembers', 'Discord members must be non-negative');
    }

    if (data.githubActivity < 0 || data.githubActivity > 10) {
        throw new ValidationError('githubActivity', 'GitHub activity must be 0-10');
    }
}
