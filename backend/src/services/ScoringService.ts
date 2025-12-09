/**
 * Scoring Service
 * Core 7-dimension risk scoring algorithm for project evaluation
 */

import {
    Project,
    ProjectMetadata,
    ScoreBreakdown,
    ScoreResult,
    RiskFlag,
    SimulateRequest,
} from '../types';
import {
    SCORE_DIMENSIONS,
    SCORE_THRESHOLDS,
    RISK_GRADES,
    SEVERITY_LEVELS,
    VALIDATION_RULES,
    RiskGrade,
} from '../utils/constants';
import { logger } from '../utils/logger';

/**
 * Extended project data for scoring
 */
export interface ScoringInput {
    // From Project table
    name: string;
    whitepaperUrl?: string;
    githubUrl?: string;
    twitterHandle?: string;
    discordInvite?: string;

    // From ProjectMetadata table
    teamAllocationPercent: number;
    teamVestingMonths: number;
    hasFounderLocks: boolean;
    supplyDistributionFair: boolean;

    // Additional scoring inputs (from SimulateRequest or external APIs)
    hasWhitepaper?: boolean;
    hasRoadmap?: boolean;
    documentationClarity?: number; // 0-10
    priorProjects?: number;
    trackRecord?: 'good' | 'neutral' | 'bad';
    twitterFollowers?: number;
    discordMembers?: number;
    githubActivity?: number; // 0-10
    hasAudit?: boolean;
    hasBugBounty?: boolean;
    hasKYC?: boolean;
}

export class ScoringService {
    /**
     * DIMENSION 1: Tokenomics (0-20 points)
     * Evaluates token distribution and economic model
     */
    scoreTokenomics(input: ScoringInput): number {
        let score = 0;

        // Team allocation (0-10 points) - lower is better
        const teamAllocation = input.teamAllocationPercent;
        if (teamAllocation <= 10) {
            score += 10;
        } else if (teamAllocation <= 15) {
            score += 8;
        } else if (teamAllocation <= 20) {
            score += 6;
        } else if (teamAllocation <= 25) {
            score += 4;
        } else if (teamAllocation <= 30) {
            score += 2;
        } else {
            score += 0; // >30% is very high risk
        }

        // Supply distribution fairness (0-10 points)
        if (input.supplyDistributionFair) {
            score += 10;
        } else {
            score += 5; // Partial credit for transparency
        }

        logger.debug('Tokenomics score calculated', {
            teamAllocation,
            supplyFair: input.supplyDistributionFair,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.TOKENOMICS);
    }

    /**
     * DIMENSION 2: Vesting & Lock-ups (0-20 points)
     * Evaluates team commitment and token release schedules
     */
    scoreVesting(input: ScoringInput): number {
        let score = 0;

        // Team vesting duration (0-15 points) - longer is better
        const vestingMonths = input.teamVestingMonths;
        if (vestingMonths >= 36) {
            score += 15; // 3+ years is excellent
        } else if (vestingMonths >= 24) {
            score += 13; // 2 years is good
        } else if (vestingMonths >= 18) {
            score += 10; // 1.5 years is acceptable
        } else if (vestingMonths >= 12) {
            score += 7; // 1 year is minimum
        } else if (vestingMonths >= 6) {
            score += 3; // <1 year is risky
        } else {
            score += 0; // No vesting is very risky
        }

        // Founder wallet locks (0-5 points)
        if (input.hasFounderLocks) {
            score += 5;
        }

        logger.debug('Vesting score calculated', {
            vestingMonths,
            hasLocks: input.hasFounderLocks,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.VESTING);
    }

    /**
     * DIMENSION 3: Documentation & Clarity (0-15 points)
     * Evaluates project documentation quality
     */
    scoreDocumentation(input: ScoringInput): number {
        let score = 0;

        // Whitepaper presence (0-7 points)
        const hasWhitepaper = input.hasWhitepaper ?? !!input.whitepaperUrl;
        if (hasWhitepaper) {
            score += 7;
        }

        // Documentation clarity (0-5 points)
        const clarity = input.documentationClarity ?? 5; // Default to medium
        score += Math.min(clarity / 2, 5); // Scale 0-10 to 0-5

        // Roadmap presence (0-3 points)
        const hasRoadmap = input.hasRoadmap ?? false;
        if (hasRoadmap) {
            score += 3;
        }

        logger.debug('Documentation score calculated', {
            hasWhitepaper,
            clarity,
            hasRoadmap,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.DOCUMENTATION);
    }

    /**
     * DIMENSION 4: Team History (0-15 points)
     * Evaluates team's track record and experience
     */
    scoreTeamHistory(input: ScoringInput): number {
        let score = 0;

        // Prior projects (0-8 points)
        const priorProjects = input.priorProjects ?? 0;
        if (priorProjects >= 5) {
            score += 8; // Very experienced
        } else if (priorProjects >= 3) {
            score += 6; // Experienced
        } else if (priorProjects >= 1) {
            score += 4; // Some experience
        } else {
            score += 2; // First project (not necessarily bad)
        }

        // Track record (0-7 points)
        const trackRecord = input.trackRecord ?? 'neutral';
        if (trackRecord === 'good') {
            score += 7;
        } else if (trackRecord === 'neutral') {
            score += 4;
        } else {
            score += 0; // Bad track record is disqualifying
        }

        logger.debug('Team history score calculated', {
            priorProjects,
            trackRecord,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.TEAM_HISTORY);
    }

    /**
     * DIMENSION 5: Community (0-15 points)
     * Evaluates social presence and community engagement
     */
    scoreCommunity(input: ScoringInput): number {
        let score = 0;

        // Twitter followers (0-5 points)
        const twitterFollowers = input.twitterFollowers ?? 0;
        if (twitterFollowers >= 10000) {
            score += 5;
        } else if (twitterFollowers >= 5000) {
            score += 4;
        } else if (twitterFollowers >= 1000) {
            score += 3;
        } else if (twitterFollowers >= 500) {
            score += 2;
        } else if (twitterFollowers >= 100) {
            score += 1;
        }

        // Discord members (0-5 points)
        const discordMembers = input.discordMembers ?? 0;
        if (discordMembers >= 5000) {
            score += 5;
        } else if (discordMembers >= 2000) {
            score += 4;
        } else if (discordMembers >= 1000) {
            score += 3;
        } else if (discordMembers >= 500) {
            score += 2;
        } else if (discordMembers >= 100) {
            score += 1;
        }

        // GitHub activity (0-5 points)
        const githubActivity = input.githubActivity ?? 0; // 0-10 scale
        score += Math.min(githubActivity / 2, 5); // Scale to 0-5

        logger.debug('Community score calculated', {
            twitterFollowers,
            discordMembers,
            githubActivity,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.COMMUNITY);
    }

    /**
     * DIMENSION 6: Audit & Security (0-10 points)
     * Evaluates security measures and audits
     */
    scoreAudit(input: ScoringInput): number {
        let score = 0;

        // Audit report (0-7 points)
        const hasAudit = input.hasAudit ?? false;
        if (hasAudit) {
            score += 7;
        }

        // Bug bounty program (0-3 points)
        const hasBugBounty = input.hasBugBounty ?? false;
        if (hasBugBounty) {
            score += 3;
        }

        logger.debug('Audit score calculated', {
            hasAudit,
            hasBugBounty,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.AUDIT);
    }

    /**
     * DIMENSION 7: Launch Readiness (0-5 points)
     * Evaluates legal and compliance preparation
     */
    scoreLaunchReadiness(input: ScoringInput): number {
        let score = 0;

        // KYC/Legal preparation (0-5 points)
        const hasKYC = input.hasKYC ?? false;
        if (hasKYC) {
            score += 5;
        } else {
            score += 2; // Partial credit for being transparent about lack of KYC
        }

        logger.debug('Launch readiness score calculated', {
            hasKYC,
            score,
        });

        return Math.min(score, SCORE_DIMENSIONS.LAUNCH_READINESS);
    }

    /**
     * Calculate composite score from all dimensions
     */
    calculateCompositeScore(input: ScoringInput): ScoreResult {
        logger.info('Calculating composite score', { projectName: input.name });

        // Calculate all dimension scores (rounded to integers)
        const subscores: ScoreBreakdown = {
            tokenomics: Math.round(this.scoreTokenomics(input)),
            vesting: Math.round(this.scoreVesting(input)),
            documentation: Math.round(this.scoreDocumentation(input)),
            teamHistory: Math.round(this.scoreTeamHistory(input)),
            community: Math.round(this.scoreCommunity(input)),
            audit: Math.round(this.scoreAudit(input)),
            launchReadiness: Math.round(this.scoreLaunchReadiness(input)),
        };

        // Sum all subscores
        const totalScore = Object.values(subscores).reduce((sum, score) => sum + score, 0);

        // Ensure score is within valid range
        const finalScore = Math.max(0, Math.min(100, Math.round(totalScore)));

        // Assign grade based on thresholds
        const grade = this.assignGrade(finalScore);

        // Generate risk flags
        const flags = this.generateRiskFlags(input, subscores);

        // Get recommendation
        const recommendation = this.getRecommendation(grade);

        logger.info('Composite score calculated', {
            projectName: input.name,
            score: finalScore,
            grade,
            flagCount: flags.length,
        });

        return {
            score: finalScore,
            grade,
            subscores,
            flags,
            recommendation,
        };
    }

    /**
     * Assign grade based on score
     */
    private assignGrade(score: number): RiskGrade {
        if (score >= SCORE_THRESHOLDS.GREEN_MIN) {
            return RISK_GRADES.GREEN;
        } else if (score >= SCORE_THRESHOLDS.YELLOW_MIN) {
            return RISK_GRADES.YELLOW;
        } else {
            return RISK_GRADES.RED;
        }
    }

    /**
     * Generate risk flags based on project data and subscores
     */
    generateRiskFlags(input: ScoringInput, subscores: ScoreBreakdown): RiskFlag[] {
        const flags: RiskFlag[] = [];

        // Tokenomics flags
        if (input.teamAllocationPercent > VALIDATION_RULES.TEAM_ALLOCATION_RECOMMENDED_MAX) {
            flags.push({
                text: `High team allocation (${input.teamAllocationPercent}%), recommended <${VALIDATION_RULES.TEAM_ALLOCATION_RECOMMENDED_MAX}%`,
                severity: input.teamAllocationPercent > 30 ? SEVERITY_LEVELS.HIGH : SEVERITY_LEVELS.MEDIUM,
            });
        }

        if (!input.supplyDistributionFair) {
            flags.push({
                text: 'Unbalanced token supply distribution',
                severity: SEVERITY_LEVELS.MEDIUM,
            });
        }

        // Vesting flags
        if (input.teamVestingMonths < VALIDATION_RULES.VESTING_MONTHS_RECOMMENDED_MIN) {
            flags.push({
                text: `Short or no vesting period (${input.teamVestingMonths} months), recommended ${VALIDATION_RULES.VESTING_MONTHS_RECOMMENDED_MIN}-${VALIDATION_RULES.VESTING_MONTHS_RECOMMENDED_MAX} months`,
                severity: input.teamVestingMonths === 0 ? SEVERITY_LEVELS.HIGH : SEVERITY_LEVELS.MEDIUM,
            });
        }

        if (!input.hasFounderLocks) {
            flags.push({
                text: 'No founder wallet locks in place',
                severity: SEVERITY_LEVELS.MEDIUM,
            });
        }

        // Documentation flags
        const hasWhitepaper = input.hasWhitepaper ?? !!input.whitepaperUrl;
        if (!hasWhitepaper) {
            flags.push({
                text: 'No whitepaper available',
                severity: SEVERITY_LEVELS.MEDIUM,
            });
        }

        if (!input.hasRoadmap) {
            flags.push({
                text: 'No public roadmap available',
                severity: SEVERITY_LEVELS.LOW,
            });
        }

        // Team history flags
        if (input.trackRecord === 'bad') {
            flags.push({
                text: 'Team has poor track record from previous projects',
                severity: SEVERITY_LEVELS.HIGH,
            });
        }

        if ((input.priorProjects ?? 0) === 0) {
            flags.push({
                text: 'Team has no prior project experience',
                severity: SEVERITY_LEVELS.LOW,
            });
        }

        // Community flags
        if (!input.githubUrl) {
            flags.push({
                text: 'No public GitHub repository',
                severity: SEVERITY_LEVELS.LOW,
            });
        }

        if ((input.twitterFollowers ?? 0) < 100) {
            flags.push({
                text: 'Limited social media presence',
                severity: SEVERITY_LEVELS.LOW,
            });
        }

        // Audit flags
        if (!input.hasAudit) {
            flags.push({
                text: 'No security audit conducted (recommended for raises >$1M)',
                severity: SEVERITY_LEVELS.HIGH,
            });
        }

        if (!input.hasBugBounty) {
            flags.push({
                text: 'No bug bounty program in place',
                severity: SEVERITY_LEVELS.LOW,
            });
        }

        // Launch readiness flags
        if (!input.hasKYC) {
            flags.push({
                text: 'No KYC/legal compliance preparation',
                severity: SEVERITY_LEVELS.MEDIUM,
            });
        }

        logger.debug('Risk flags generated', { flagCount: flags.length });

        return flags;
    }

    /**
     * Get human-readable recommendation based on grade
     */
    getRecommendation(grade: RiskGrade): string {
        switch (grade) {
            case RISK_GRADES.GREEN:
                return 'Safe for launch. Project meets high quality standards with minimal risk factors. Recommended for standard launch parameters.';
            case RISK_GRADES.YELLOW:
                return 'Proceed with caution. Project shows promise but has some risk factors. Recommended for reduced caps and higher fees with additional due diligence.';
            case RISK_GRADES.RED:
                return 'High risk. Project has significant risk factors and should undergo thorough review. Recommended for minimal caps, highest fees, and accredited investors only.';
            default:
                return 'Unable to determine recommendation';
        }
    }

    /**
     * Score a project from database
     */
    async scoreProject(project: Project, metadata: ProjectMetadata): Promise<ScoreResult> {
        const extra = metadata.extra_metadata || {};

        const input: ScoringInput = {
            name: project.name,
            whitepaperUrl: project.whitepaperUrl,
            githubUrl: project.githubUrl,
            twitterHandle: project.twitterHandle,
            discordInvite: project.discordInvite,
            teamAllocationPercent: metadata.teamAllocationPercent,
            teamVestingMonths: metadata.teamVestingMonths,
            hasFounderLocks: metadata.hasFounderLocks,
            supplyDistributionFair: metadata.supplyDistributionFair,

            // Use stored extra metadata, falling back to defaults if not present
            hasWhitepaper: extra.hasWhitepaper ?? !!project.whitepaperUrl,
            hasRoadmap: extra.hasRoadmap ?? true,
            documentationClarity: extra.documentationClarity ?? 7,
            priorProjects: extra.priorProjects ?? 1,
            trackRecord: extra.trackRecord ?? 'neutral',
            twitterFollowers: extra.twitterFollowers ?? 1000,
            discordMembers: extra.discordMembers ?? 500,
            githubActivity: extra.githubActivity ?? 5,
            hasAudit: extra.hasAudit ?? false,
            hasBugBounty: extra.hasBugBounty ?? false,
            hasKYC: extra.hasKYC ?? false,
        };

        return this.calculateCompositeScore(input);
    }

    /**
     * Score a simulation request
     */
    scoreSimulation(request: SimulateRequest): ScoreResult {
        const input: ScoringInput = {
            name: request.name,
            teamAllocationPercent: request.teamAllocationPercent,
            teamVestingMonths: request.teamVestingMonths,
            hasFounderLocks: request.hasFounderLocks,
            supplyDistributionFair: request.supplyDistributionFair,
            hasWhitepaper: request.hasWhitepaper,
            hasRoadmap: request.hasRoadmap,
            documentationClarity: request.documentationClarity,
            priorProjects: request.priorProjects,
            trackRecord: request.trackRecord,
            twitterFollowers: request.twitterFollowers,
            discordMembers: request.discordMembers,
            githubActivity: request.githubActivity,
            hasAudit: request.hasAudit,
            hasBugBounty: request.hasBugBounty,
            hasKYC: request.hasKYC,
        };

        return this.calculateCompositeScore(input);
    }
}

// Export singleton instance
export const scoringService = new ScoringService();
