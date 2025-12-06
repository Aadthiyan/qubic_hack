/**
 * API Testing Script
 * Comprehensive tests for all Nostromo Guardian API endpoints
 * 
 * Run with: npm run test:api
 */

import axios from 'axios';

const BASE_URL = process.env.API_URL || 'http://localhost:4000';
const API_KEY = process.env.API_KEY || 'test-api-key';

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function log(message: string, color: string = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function logTest(name: string, passed: boolean, details?: string) {
    totalTests++;
    if (passed) {
        passedTests++;
        log(`✅ ${name}`, colors.green);
    } else {
        failedTests++;
        log(`❌ ${name}`, colors.red);
    }
    if (details) {
        log(`   ${details}`, colors.cyan);
    }
}

async function testEndpoint(
    name: string,
    method: string,
    url: string,
    data?: any,
    expectedStatus: number = 200
): Promise<any> {
    try {
        const startTime = Date.now();
        const config: any = {
            method,
            url: `${BASE_URL}${url}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            config.data = data;
        }

        const response = await axios(config);
        const duration = Date.now() - startTime;

        const passed = response.status === expectedStatus;
        logTest(
            name,
            passed,
            `Status: ${response.status}, Duration: ${duration}ms`
        );

        return response.data;
    } catch (error: any) {
        const duration = Date.now() - Date.now();
        const status = error.response?.status || 'ERROR';
        const passed = status === expectedStatus;

        logTest(
            name,
            passed,
            `Status: ${status}, Error: ${error.message}`
        );

        if (!passed) {
            throw error;
        }
        return error.response?.data;
    }
}

async function runTests() {
    log('\n🧪 Starting API Tests\n', colors.blue);
    log('='.repeat(80), colors.blue);

    // Test 1: Health Check
    log('\n📊 Test Group 1: Health & Info', colors.yellow);
    await testEndpoint('GET / - API Info', 'GET', '/');
    await testEndpoint('GET /api/health - Health Check', 'GET', '/api/health');

    // Test 2: Analytics (before data)
    log('\n📊 Test Group 2: Analytics (Empty State)', colors.yellow);
    await testEndpoint('GET /api/analytics - Empty Analytics', 'GET', '/api/analytics');

    // Test 3: Simulate Endpoint
    log('\n📊 Test Group 3: Simulate Endpoint', colors.yellow);

    const greenProject = {
        name: 'Excellent Project',
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
    };

    const greenResult = await testEndpoint(
        'POST /api/simulate - Green Project',
        'POST',
        '/api/simulate',
        greenProject
    );

    if (greenResult?.data?.grade === 'Green') {
        logTest('Simulate: Green grade correct', true, `Score: ${greenResult.data.score}`);
    } else {
        logTest('Simulate: Green grade correct', false, `Expected Green, got ${greenResult?.data?.grade}`);
    }

    const yellowProject = {
        name: 'Moderate Project',
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
    };

    const yellowResult = await testEndpoint(
        'POST /api/simulate - Yellow Project',
        'POST',
        '/api/simulate',
        yellowProject
    );

    if (yellowResult?.data?.grade === 'Yellow') {
        logTest('Simulate: Yellow grade correct', true, `Score: ${yellowResult.data.score}`);
    } else {
        logTest('Simulate: Yellow grade correct', false, `Expected Yellow, got ${yellowResult?.data?.grade}`);
    }

    const redProject = {
        name: 'High Risk Project',
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
    };

    const redResult = await testEndpoint(
        'POST /api/simulate - Red Project',
        'POST',
        '/api/simulate',
        redProject
    );

    if (redResult?.data?.grade === 'Red') {
        logTest('Simulate: Red grade correct', true, `Score: ${redResult.data.score}`);
    } else {
        logTest('Simulate: Red grade correct', false, `Expected Red, got ${redResult?.data?.grade}`);
    }

    // Test 4: Error Handling
    log('\n📊 Test Group 4: Error Handling', colors.yellow);

    await testEndpoint(
        'POST /api/simulate - Invalid Score Range',
        'POST',
        '/api/simulate',
        { ...greenProject, teamAllocationPercent: 150 },
        400
    );

    await testEndpoint(
        'POST /api/simulate - Missing Required Field',
        'POST',
        '/api/simulate',
        { name: 'Test' },
        400
    );

    await testEndpoint(
        'GET /api/projects/:id - Invalid UUID',
        'GET',
        '/api/projects/invalid-uuid',
        null,
        404
    );

    // Test 5: Projects Endpoint (if DB is available)
    log('\n📊 Test Group 5: Projects Endpoint', colors.yellow);

    try {
        const projectsResult = await testEndpoint(
            'GET /api/projects - List Projects',
            'GET',
            '/api/projects?page=1&limit=10'
        );

        if (projectsResult?.data?.projects) {
            logTest(
                'Projects: Response structure correct',
                true,
                `Found ${projectsResult.data.projects.length} projects`
            );
        }
    } catch (error) {
        log('⚠️  Database not available - skipping project tests', colors.yellow);
    }

    // Summary
    log('\n' + '='.repeat(80), colors.blue);
    log('\n📈 Test Summary\n', colors.blue);
    log(`Total Tests:  ${totalTests}`, colors.cyan);
    log(`✅ Passed:    ${passedTests}`, colors.green);
    log(`❌ Failed:    ${failedTests}`, colors.red);
    log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`, colors.cyan);

    if (failedTests === 0) {
        log('🎉 All tests passed!\n', colors.green);
        process.exit(0);
    } else {
        log(`⚠️  ${failedTests} test(s) failed\n`, colors.yellow);
        process.exit(1);
    }
}

// Run tests
runTests().catch((error) => {
    log(`\n❌ Fatal error: ${error.message}\n`, colors.red);
    process.exit(1);
});
