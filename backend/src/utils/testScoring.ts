/**
 * Scoring Service Test Script
 * Tests the 7-dimension scoring algorithm with various scenarios
 * 
 * Run with: npm run test:scoring
 */

import { ScoringService, ScoringInput } from '../services/ScoringService';

const scoringService = new ScoringService();

// Test scenarios
const testScenarios: Array<{ name: string; input: ScoringInput; expectedGrade: string }> = [
    // GREEN PROJECT (Expected: 80-100)
    {
        name: 'Excellent Project (Green)',
        expectedGrade: 'Green',
        input: {
            name: 'QubicSwap DEX',
            whitepaperUrl: 'https://docs.qubicswap.io/whitepaper.pdf',
            githubUrl: 'https://github.com/qubicswap',
            twitterHandle: '@QubicSwap',
            discordInvite: 'https://discord.gg/qubicswap',
            teamAllocationPercent: 10,
            teamVestingMonths: 24,
            hasFounderLocks: true,
            supplyDistributionFair: true,
            hasWhitepaper: true,
            hasRoadmap: true,
            documentationClarity: 9,
            priorProjects: 3,
            trackRecord: 'good',
            twitterFollowers: 15000,
            discordMembers: 5000,
            githubActivity: 9,
            hasAudit: true,
            hasBugBounty: true,
            hasKYC: true,
        },
    },

    // YELLOW PROJECT (Expected: 60-79)
    {
        name: 'Moderate Project (Yellow)',
        expectedGrade: 'Yellow',
        input: {
            name: 'QubicPay Gateway',
            whitepaperUrl: 'https://docs.qubicpay.com/overview.pdf',
            twitterHandle: '@QubicPay',
            teamAllocationPercent: 25,
            teamVestingMonths: 12,
            hasFounderLocks: true,
            supplyDistributionFair: false,
            hasWhitepaper: true,
            hasRoadmap: true,
            documentationClarity: 6,
            priorProjects: 1,
            trackRecord: 'neutral',
            twitterFollowers: 2000,
            discordMembers: 800,
            githubActivity: 5,
            hasAudit: false,
            hasBugBounty: false,
            hasKYC: true,
        },
    },

    // RED PROJECT (Expected: <60)
    {
        name: 'High Risk Project (Red)',
        expectedGrade: 'Red',
        input: {
            name: 'MoonQubic',
            twitterHandle: '@MoonQubic',
            teamAllocationPercent: 40,
            teamVestingMonths: 0,
            hasFounderLocks: false,
            supplyDistributionFair: false,
            hasWhitepaper: false,
            hasRoadmap: false,
            documentationClarity: 3,
            priorProjects: 0,
            trackRecord: 'neutral',
            twitterFollowers: 500,
            discordMembers: 200,
            githubActivity: 2,
            hasAudit: false,
            hasBugBounty: false,
            hasKYC: false,
        },
    },
];

async function runScoringTests() {
    console.log('🧪 Testing Scoring Service\n');
    console.log('='.repeat(80));

    let passedTests = 0;
    let failedTests = 0;

    for (const scenario of testScenarios) {
        console.log(`\n📊 Testing: ${scenario.name}`);
        console.log('-'.repeat(80));

        try {
            const result = scoringService.calculateCompositeScore(scenario.input);

            // Display results
            console.log(`\n✅ Score: ${result.score}/100`);
            console.log(`   Grade: ${result.grade}`);
            console.log(`   Expected: ${scenario.expectedGrade}`);

            // Display subscores
            console.log('\n   Subscores:');
            console.log(`     Tokenomics:     ${result.subscores.tokenomics}/20`);
            console.log(`     Vesting:        ${result.subscores.vesting}/20`);
            console.log(`     Documentation:  ${result.subscores.documentation}/15`);
            console.log(`     Team History:   ${result.subscores.teamHistory}/15`);
            console.log(`     Community:      ${result.subscores.community}/15`);
            console.log(`     Audit:          ${result.subscores.audit}/10`);
            console.log(`     Launch Ready:   ${result.subscores.launchReadiness}/5`);

            // Verify total
            const subscoreTotal = Object.values(result.subscores).reduce((sum, score) => sum + score, 0);
            console.log(`\n   Total Subscores: ${subscoreTotal}`);
            console.log(`   Final Score:     ${result.score}`);

            // Display risk flags
            console.log(`\n   Risk Flags (${result.flags.length}):`);
            if (result.flags.length === 0) {
                console.log('     None');
            } else {
                result.flags.forEach((flag, index) => {
                    const emoji = flag.severity === 'high' ? '🔴' : flag.severity === 'medium' ? '🟡' : '🔵';
                    console.log(`     ${index + 1}. ${emoji} [${flag.severity.toUpperCase()}] ${flag.text}`);
                });
            }

            // Verify grade matches expected
            if (result.grade === scenario.expectedGrade) {
                console.log(`\n   ✅ TEST PASSED`);
                passedTests++;
            } else {
                console.log(`\n   ❌ TEST FAILED: Expected ${scenario.expectedGrade}, got ${result.grade}`);
                failedTests++;
            }

        } catch (error) {
            console.log(`\n   ❌ TEST ERROR: ${error}`);
            failedTests++;
        }
    }

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log(`\n✅ Passed: ${passedTests}/${testScenarios.length}`);
    console.log(`❌ Failed: ${failedTests}/${testScenarios.length}\n`);
}

// Run tests
runScoringTests().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
