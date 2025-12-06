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
    createdAt: string;
    updatedAt: string;
}

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
    calculatedAt: string;
}

export interface RiskFlag {
    text: string;
    severity: 'low' | 'medium' | 'high';
}

export interface ProjectDetail extends Project {
    metadata: {
        teamAllocationPercent: number;
        teamVestingMonths: number;
        hasFounderLocks: boolean;
        supplyDistributionFair: boolean;
        totalSupply: string;
        initialCirculatingSupply: string;
    };
    latestScore?: Score;
    riskFlags?: RiskFlag[];
    launchConfig?: {
        capMin: number;
        capMax: number;
        feeTierPercent: number;
        accessTier: string;
        recommendation: string;
    };
}

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

export interface SimulateResponse {
    score: number;
    grade: 'Green' | 'Yellow' | 'Red';
    breakdown: {
        tokenomics: number;
        vesting: number;
        documentation: number;
        teamHistory: number;
        community: number;
        audit: number;
        launchReadiness: number;
    };
    flags: RiskFlag[];
    recommendation: string;
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
