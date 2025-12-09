// Project Types
export interface Project {
    id: string;
    name: string;
    description: string;
    websiteUrl?: string;
    whitepaperUrl?: string;
    githubUrl?: string;
    twitterHandle?: string;
    discordInvite?: string;
    status: 'draft' | 'submitted' | 'approved' | 'launched' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}

// Project Metadata
export interface ProjectMetadata {
    id: string;
    projectId: string;
    teamAllocationPercent: number;
    teamVestingMonths: number;
    founderWalletAddress?: string;
    hasFounderLocks: boolean;
    supplyDistributionFair: boolean;
    total_supply?: string;
    initial_circulating_supply?: string;
    extra_metadata?: any;
    createdAt: Date;
}

// Score Types
export interface Score {
    id: string;
    projectId: string;
    score: number; // 0-100
    grade: 'Green' | 'Yellow' | 'Red';
    tokenomicsScore: number;
    vestingScore: number;
    documentationScore: number;
    teamHistoryScore: number;
    communityScore: number;
    auditScore: number;
    launchReadinessScore: number;
    calculatedAt: Date;
}

export interface ScoreBreakdown {
    tokenomics: number;
    vesting: number;
    documentation: number;
    teamHistory: number;
    community: number;
    audit: number;
    launchReadiness: number;
}

export interface ScoreResult {
    score: number;
    grade: 'Green' | 'Yellow' | 'Red';
    subscores: ScoreBreakdown;
    flags: RiskFlag[];
    recommendation: string;
}

// Risk Flag Types
export interface RiskFlag {
    id?: string;
    scoreId?: string;
    text: string;
    severity: 'low' | 'medium' | 'high';
    createdAt?: Date;
}

// Launch Configuration
export interface LaunchConfig {
    id: string;
    projectId: string;
    scoreId?: string;
    capMin: number;
    capMax: number;
    feeTierPercent: number;
    accessTier: 'public' | 'mid-tier' | 'accredited';
    recommendation: string;
    createdAt: Date;
}

// API Request/Response Types
export interface SimulateRequest {
    name: string;
    teamAllocationPercent: number;
    teamVestingMonths: number;
    hasFounderLocks: boolean;
    supplyDistributionFair: boolean;
    hasWhitepaper: boolean;
    hasRoadmap: boolean;
    documentationClarity: number; // 0-10
    priorProjects: number;
    trackRecord: 'good' | 'neutral' | 'bad';
    twitterFollowers: number;
    discordMembers: number;
    githubActivity: number; // 0-10
    hasAudit: boolean;
    hasBugBounty: boolean;
    hasKYC: boolean;
}

export interface AnalyticsResponse {
    totalProjects: number;
    avgScore: number;
    distribution: {
        green: number;
        yellow: number;
        red: number;
    };
    statusCounts: Record<string, number>;
    detailedDistribution: Array<{
        grade: string;
        count: number;
        avgScore: number;
        minScore: number;
        maxScore: number;
    }>;
}
