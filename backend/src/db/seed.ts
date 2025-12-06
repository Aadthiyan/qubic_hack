import { query, testConnection, closePool } from './connection';

/**
 * Database Seed Script
 * Populates database with 10 mock projects across all score bands
 * 
 * Run with: npm run seed
 */

interface MockProject {
    name: string;
    description: string;
    websiteUrl: string;
    whitepaperUrl?: string;
    githubUrl?: string;
    twitterHandle: string;
    discordInvite?: string;
    status: string;
    metadata: {
        teamAllocationPercent: number;
        teamVestingMonths: number;
        hasFounderLocks: boolean;
        supplyDistributionFair: boolean;
        totalSupply: bigint;
        initialCirculatingSupply: bigint;
    };
    scores: {
        tokenomics: number;
        vesting: number;
        documentation: number;
        teamHistory: number;
        community: number;
        audit: number;
        launchReadiness: number;
    };
}

const mockProjects: MockProject[] = [
    // GREEN PROJECTS (Score 80+)
    {
        name: 'QubicSwap',
        description: 'Decentralized exchange protocol for Qubic ecosystem with advanced AMM features',
        websiteUrl: 'https://qubicswap.io',
        whitepaperUrl: 'https://docs.qubicswap.io/whitepaper.pdf',
        githubUrl: 'https://github.com/qubicswap',
        twitterHandle: '@QubicSwap',
        discordInvite: 'https://discord.gg/qubicswap',
        status: 'approved',
        metadata: {
            teamAllocationPercent: 15.0,
            teamVestingMonths: 24,
            hasFounderLocks: true,
            supplyDistributionFair: true,
            totalSupply: BigInt(1000000000),
            initialCirculatingSupply: BigInt(300000000),
        },
        scores: {
            tokenomics: 18,
            vesting: 20,
            documentation: 14,
            teamHistory: 13,
            community: 14,
            audit: 9,
            launchReadiness: 4,
        },
    },
    {
        name: 'QubicLend',
        description: 'Peer-to-peer lending protocol with over-collateralization and liquidation mechanisms',
        websiteUrl: 'https://qubiclend.finance',
        whitepaperUrl: 'https://docs.qubiclend.finance/litepaper.pdf',
        githubUrl: 'https://github.com/qubiclend',
        twitterHandle: '@QubicLend',
        discordInvite: 'https://discord.gg/qubiclend',
        status: 'approved',
        metadata: {
            teamAllocationPercent: 12.0,
            teamVestingMonths: 36,
            hasFounderLocks: true,
            supplyDistributionFair: true,
            totalSupply: BigInt(500000000),
            initialCirculatingSupply: BigInt(200000000),
        },
        scores: {
            tokenomics: 19,
            vesting: 20,
            documentation: 15,
            teamHistory: 14,
            community: 13,
            audit: 10,
            launchReadiness: 5,
        },
    },
    {
        name: 'QubicBridge',
        description: 'Cross-chain bridge connecting Qubic to Ethereum, BSC, and other major chains',
        websiteUrl: 'https://qubicbridge.network',
        whitepaperUrl: 'https://docs.qubicbridge.network/technical.pdf',
        githubUrl: 'https://github.com/qubicbridge',
        twitterHandle: '@QubicBridge',
        discordInvite: 'https://discord.gg/qubicbridge',
        status: 'submitted',
        metadata: {
            teamAllocationPercent: 18.0,
            teamVestingMonths: 24,
            hasFounderLocks: true,
            supplyDistributionFair: true,
            totalSupply: BigInt(750000000),
            initialCirculatingSupply: BigInt(250000000),
        },
        scores: {
            tokenomics: 17,
            vesting: 20,
            documentation: 14,
            teamHistory: 12,
            community: 15,
            audit: 8,
            launchReadiness: 4,
        },
    },

    // YELLOW PROJECTS (Score 60-79)
    {
        name: 'QubicPay',
        description: 'Payment gateway for merchants to accept Qubic and other cryptocurrencies',
        websiteUrl: 'https://qubicpay.com',
        whitepaperUrl: 'https://docs.qubicpay.com/overview.pdf',
        twitterHandle: '@QubicPay',
        status: 'submitted',
        metadata: {
            teamAllocationPercent: 25.0,
            teamVestingMonths: 12,
            hasFounderLocks: true,
            supplyDistributionFair: false,
            totalSupply: BigInt(2000000000),
            initialCirculatingSupply: BigInt(500000000),
        },
        scores: {
            tokenomics: 12,
            vesting: 15,
            documentation: 12,
            teamHistory: 10,
            community: 11,
            audit: 5,
            launchReadiness: 3,
        },
    },
    {
        name: 'QubicNFT',
        description: 'NFT marketplace and minting platform built on Qubic',
        websiteUrl: 'https://qubicnft.art',
        githubUrl: 'https://github.com/qubicnft',
        twitterHandle: '@QubicNFT',
        discordInvite: 'https://discord.gg/qubicnft',
        status: 'submitted',
        metadata: {
            teamAllocationPercent: 22.0,
            teamVestingMonths: 18,
            hasFounderLocks: false,
            supplyDistributionFair: true,
            totalSupply: BigInt(1000000000),
            initialCirculatingSupply: BigInt(400000000),
        },
        scores: {
            tokenomics: 14,
            vesting: 16,
            documentation: 10,
            teamHistory: 8,
            community: 13,
            audit: 6,
            launchReadiness: 3,
        },
    },
    {
        name: 'QubicStake',
        description: 'Liquid staking protocol for Qubic with auto-compounding rewards',
        websiteUrl: 'https://qubicstake.io',
        twitterHandle: '@QubicStake',
        status: 'draft',
        metadata: {
            teamAllocationPercent: 20.0,
            teamVestingMonths: 12,
            hasFounderLocks: true,
            supplyDistributionFair: true,
            totalSupply: BigInt(500000000),
            initialCirculatingSupply: BigInt(150000000),
        },
        scores: {
            tokenomics: 15,
            vesting: 15,
            documentation: 11,
            teamHistory: 9,
            community: 10,
            audit: 7,
            launchReadiness: 2,
        },
    },
    {
        name: 'QubicDAO',
        description: 'Decentralized autonomous organization governance platform',
        websiteUrl: 'https://qubicdao.org',
        whitepaperUrl: 'https://docs.qubicdao.org/governance.pdf',
        twitterHandle: '@QubicDAO',
        status: 'submitted',
        metadata: {
            teamAllocationPercent: 28.0,
            teamVestingMonths: 18,
            hasFounderLocks: true,
            supplyDistributionFair: false,
            totalSupply: BigInt(1000000000),
            initialCirculatingSupply: BigInt(300000000),
        },
        scores: {
            tokenomics: 11,
            vesting: 16,
            documentation: 13,
            teamHistory: 11,
            community: 12,
            audit: 4,
            launchReadiness: 3,
        },
    },

    // RED PROJECTS (Score < 60)
    {
        name: 'MoonQubic',
        description: 'High-yield farming protocol with innovative tokenomics',
        websiteUrl: 'https://moonqubic.finance',
        twitterHandle: '@MoonQubic',
        status: 'draft',
        metadata: {
            teamAllocationPercent: 40.0,
            teamVestingMonths: 6,
            hasFounderLocks: false,
            supplyDistributionFair: false,
            totalSupply: BigInt(10000000000),
            initialCirculatingSupply: BigInt(1000000000),
        },
        scores: {
            tokenomics: 6,
            vesting: 8,
            documentation: 7,
            teamHistory: 5,
            community: 9,
            audit: 0,
            launchReadiness: 1,
        },
    },
    {
        name: 'QubicMeme',
        description: 'Community-driven meme token on Qubic',
        websiteUrl: 'https://qubicmeme.fun',
        twitterHandle: '@QubicMeme',
        discordInvite: 'https://discord.gg/qubicmeme',
        status: 'draft',
        metadata: {
            teamAllocationPercent: 35.0,
            teamVestingMonths: 0,
            hasFounderLocks: false,
            supplyDistributionFair: false,
            totalSupply: BigInt(1000000000000),
            initialCirculatingSupply: BigInt(500000000000),
        },
        scores: {
            tokenomics: 5,
            vesting: 0,
            documentation: 6,
            teamHistory: 4,
            community: 12,
            audit: 0,
            launchReadiness: 0,
        },
    },
    {
        name: 'SafeQubic',
        description: 'Reflection token with automatic rewards distribution',
        websiteUrl: 'https://safequbic.io',
        twitterHandle: '@SafeQubic',
        status: 'draft',
        metadata: {
            teamAllocationPercent: 45.0,
            teamVestingMonths: 3,
            hasFounderLocks: false,
            supplyDistributionFair: false,
            totalSupply: BigInt(1000000000),
            initialCirculatingSupply: BigInt(550000000),
        },
        scores: {
            tokenomics: 4,
            vesting: 5,
            documentation: 8,
            teamHistory: 3,
            community: 8,
            audit: 0,
            launchReadiness: 1,
        },
    },
];

function calculateTotalScore(scores: any): number {
    return (
        scores.tokenomics +
        scores.vesting +
        scores.documentation +
        scores.teamHistory +
        scores.community +
        scores.audit +
        scores.launchReadiness
    );
}

function getGrade(score: number): string {
    if (score >= 80) return 'Green';
    if (score >= 60) return 'Yellow';
    return 'Red';
}

function generateRiskFlags(project: MockProject, score: number): Array<{ text: string; severity: string }> {
    const flags: Array<{ text: string; severity: string }> = [];

    if (project.metadata.teamAllocationPercent > 25) {
        flags.push({
            text: `High team allocation (${project.metadata.teamAllocationPercent}%), recommended <20%`,
            severity: 'high',
        });
    }

    if (project.metadata.teamVestingMonths < 12) {
        flags.push({
            text: `Short or no vesting period (${project.metadata.teamVestingMonths} months), recommended 12-24 months`,
            severity: 'high',
        });
    }

    if (!project.metadata.hasFounderLocks) {
        flags.push({
            text: 'No founder wallet locks in place',
            severity: 'medium',
        });
    }

    if (!project.whitepaperUrl) {
        flags.push({
            text: 'No whitepaper available',
            severity: 'medium',
        });
    }

    if (!project.githubUrl) {
        flags.push({
            text: 'No public GitHub repository',
            severity: 'low',
        });
    }

    if (project.scores.audit === 0) {
        flags.push({
            text: 'No security audit conducted',
            severity: 'high',
        });
    }

    if (!project.metadata.supplyDistributionFair) {
        flags.push({
            text: 'Unbalanced token supply distribution',
            severity: 'medium',
        });
    }

    return flags;
}

function generateLaunchConfig(score: number, grade: string) {
    if (grade === 'Green') {
        return {
            capMin: 100000,
            capMax: 500000,
            feeTierPercent: 2.5,
            accessTier: 'public',
            recommendation: 'Safe for launch. Standard parameters recommended.',
        };
    } else if (grade === 'Yellow') {
        return {
            capMin: 50000,
            capMax: 200000,
            feeTierPercent: 4.0,
            accessTier: 'mid-tier',
            recommendation: 'Proceed with caution. Reduced cap and higher fees recommended.',
        };
    } else {
        return {
            capMin: 10000,
            capMax: 50000,
            feeTierPercent: 6.0,
            accessTier: 'accredited',
            recommendation: 'High risk. Minimal cap, highest fees, and accredited investors only.',
        };
    }
}

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');
    console.log('='.repeat(60));

    try {
        // Test connection
        const connected = await testConnection();
        if (!connected) {
            throw new Error('Database connection failed');
        }

        console.log('\n📦 Inserting mock projects...\n');

        for (let i = 0; i < mockProjects.length; i++) {
            const project = mockProjects[i];
            const totalScore = calculateTotalScore(project.scores);
            const grade = getGrade(totalScore);

            console.log(`${i + 1}/${mockProjects.length} Seeding: ${project.name} (${grade} - ${totalScore}/100)`);

            // Insert project
            const projectResult = await query(
                `INSERT INTO projects (name, description, website_url, whitepaper_url, github_url, twitter_handle, discord_invite, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
                [
                    project.name,
                    project.description,
                    project.websiteUrl,
                    project.whitepaperUrl || null,
                    project.githubUrl || null,
                    project.twitterHandle,
                    project.discordInvite || null,
                    project.status,
                ]
            );

            const projectId = projectResult.rows[0].id;

            // Insert metadata
            await query(
                `INSERT INTO project_metadata (project_id, team_allocation_percent, team_vesting_months, has_founder_locks, supply_distribution_fair, total_supply, initial_circulating_supply)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    projectId,
                    project.metadata.teamAllocationPercent,
                    project.metadata.teamVestingMonths,
                    project.metadata.hasFounderLocks,
                    project.metadata.supplyDistributionFair,
                    project.metadata.totalSupply.toString(),
                    project.metadata.initialCirculatingSupply.toString(),
                ]
            );

            // Insert score
            const scoreResult = await query(
                `INSERT INTO scores (project_id, score, grade, tokenomics_score, vesting_score, documentation_score, team_history_score, community_score, audit_score, launch_readiness_score)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id`,
                [
                    projectId,
                    totalScore,
                    grade,
                    project.scores.tokenomics,
                    project.scores.vesting,
                    project.scores.documentation,
                    project.scores.teamHistory,
                    project.scores.community,
                    project.scores.audit,
                    project.scores.launchReadiness,
                ]
            );

            const scoreId = scoreResult.rows[0].id;

            // Insert risk flags
            const flags = generateRiskFlags(project, totalScore);
            for (const flag of flags) {
                await query(
                    `INSERT INTO risk_flags (score_id, flag_text, severity)
           VALUES ($1, $2, $3)`,
                    [scoreId, flag.text, flag.severity]
                );
            }

            // Insert launch config
            const config = generateLaunchConfig(totalScore, grade);
            await query(
                `INSERT INTO launch_configs (project_id, score_id, cap_min, cap_max, fee_tier_percent, access_tier, recommendation)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [projectId, scoreId, config.capMin, config.capMax, config.feeTierPercent, config.accessTier, config.recommendation]
            );

            console.log(`   ✅ ${project.name} seeded successfully`);
        }

        // Verify data
        console.log('\n🔍 Verifying seeded data...\n');

        const projectCount = await query('SELECT COUNT(*) as count FROM projects');
        const scoreCount = await query('SELECT COUNT(*) as count FROM scores');
        const flagCount = await query('SELECT COUNT(*) as count FROM risk_flags');
        const configCount = await query('SELECT COUNT(*) as count FROM launch_configs');

        console.log(`   Projects: ${projectCount.rows[0].count}`);
        console.log(`   Scores: ${scoreCount.rows[0].count}`);
        console.log(`   Risk Flags: ${flagCount.rows[0].count}`);
        console.log(`   Launch Configs: ${configCount.rows[0].count}`);

        // Show score distribution
        console.log('\n📊 Score Distribution:\n');
        const distribution = await query(`
      SELECT 
        grade,
        COUNT(*) as count,
        ROUND(AVG(score), 2) as avg_score
      FROM scores
      GROUP BY grade
      ORDER BY 
        CASE grade
          WHEN 'Green' THEN 1
          WHEN 'Yellow' THEN 2
          WHEN 'Red' THEN 3
        END
    `);

        distribution.rows.forEach((row: any) => {
            const emoji = row.grade === 'Green' ? '🟢' : row.grade === 'Yellow' ? '🟡' : '🔴';
            console.log(`   ${emoji} ${row.grade}: ${row.count} projects (avg: ${row.avg_score})`);
        });

        console.log('\n' + '='.repeat(60));
        console.log('✅ Database seeding completed successfully!\n');
    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        throw error;
    } finally {
        await closePool();
    }
}

// Run seeding
seedDatabase().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
