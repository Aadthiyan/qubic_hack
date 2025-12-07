import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/docs
 * API Documentation endpoint
 */
router.get('/', (req: Request, res: Response) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const docs = {
        title: 'Nostromo Guardian API',
        version: '1.0.0',
        description: 'Dynamic Risk Scoring Engine for Qubic Launches',
        baseUrl: `${baseUrl}/api`,
        endpoints: {
            health: {
                method: 'GET',
                path: '/health',
                description: 'Check API health status',
                example: `${baseUrl}/api/health`,
                response: {
                    success: true,
                    data: {
                        status: 'ok',
                        database: 'connected',
                        timestamp: new Date().toISOString()
                    }
                }
            },
            projects: {
                list: {
                    method: 'GET',
                    path: '/projects',
                    description: 'List all projects with pagination',
                    queryParams: {
                        page: 'number (default: 1)',
                        limit: 'number (default: 10)',
                        status: 'string (optional: draft, submitted, approved, launched)'
                    },
                    example: `${baseUrl}/api/projects?page=1&limit=10`,
                },
                getById: {
                    method: 'GET',
                    path: '/projects/:id',
                    description: 'Get detailed project information',
                    example: `${baseUrl}/api/projects/{project-id}`,
                },
                create: {
                    method: 'POST',
                    path: '/projects',
                    description: 'Create a new project',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'your-api-key'
                    },
                    body: {
                        name: 'string',
                        description: 'string',
                        websiteUrl: 'string (optional)',
                        // ... other fields
                    },
                    example: `${baseUrl}/api/projects`,
                }
            },
            simulate: {
                method: 'POST',
                path: '/simulate',
                description: 'Calculate risk score without saving (real-time simulation)',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    name: 'string',
                    teamAllocationPercent: 'number (0-100)',
                    teamVestingMonths: 'number',
                    hasFounderLocks: 'boolean',
                    supplyDistributionFair: 'boolean',
                    hasWhitepaper: 'boolean',
                    hasRoadmap: 'boolean',
                    documentationClarity: 'number (0-10)',
                    priorProjects: 'number',
                    trackRecord: 'string (good|neutral|bad)',
                    twitterFollowers: 'number',
                    discordMembers: 'number',
                    githubActivity: 'number (0-10)',
                    hasAudit: 'boolean',
                    hasBugBounty: 'boolean',
                    hasKYC: 'boolean'
                },
                example: `${baseUrl}/api/simulate`,
                response: {
                    success: true,
                    data: {
                        score: 85,
                        grade: 'Green',
                        breakdown: {
                            tokenomics: 18,
                            vesting: 18,
                            documentation: 13,
                            teamHistory: 12,
                            community: 12,
                            audit: 7,
                            launchReadiness: 5
                        },
                        flags: [],
                        recommendation: 'Safe for launch...'
                    }
                }
            },
            analytics: {
                method: 'GET',
                path: '/analytics',
                description: 'Get ecosystem-wide analytics',
                example: `${baseUrl}/api/analytics`,
            },
            contract: {
                getScore: {
                    method: 'GET',
                    path: '/contract/score/:projectId',
                    description: 'Get on-chain score from Qubic Smart Contract',
                    example: `${baseUrl}/api/contract/score/{project-id}`,
                },
                setScore: {
                    method: 'POST',
                    path: '/contract/set-score',
                    description: 'Publish score to Qubic Smart Contract (Admin only)',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'admin-api-key'
                    },
                    body: {
                        projectId: 'string',
                        score: 'number (0-100)',
                        grade: 'number (0=Red, 1=Yellow, 2=Green)'
                    },
                    example: `${baseUrl}/api/contract/set-score`,
                }
            }
        },
        authentication: {
            description: 'Some endpoints require API key authentication',
            header: 'x-api-key',
            example: 'x-api-key: your-api-key-here'
        },
        smartContract: {
            network: 'Qubic Testnet',
            contractId: 'FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE',
            explorer: 'https://explorer.qubic.org/address/FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE'
        },
        links: {
            github: 'https://github.com/Aadthiyan/qubic_hack',
            documentation: 'See API.md in repository'
        }
    };

    // Return HTML documentation page
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nostromo Guardian API Documentation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: #e0e0e0;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h1 {
            background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        h2 {
            color: #60a5fa;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        h3 {
            color: #a855f7;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-right: 10px;
        }
        .badge.get { background: #10b981; color: white; }
        .badge.post { background: #3b82f6; color: white; }
        .endpoint {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
        }
        .endpoint-path {
            font-family: 'Courier New', monospace;
            background: rgba(96, 165, 250, 0.1);
            padding: 8px 12px;
            border-radius: 6px;
            display: inline-block;
            margin: 10px 0;
            color: #60a5fa;
        }
        code {
            background: rgba(168, 85, 247, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            color: #a855f7;
        }
        pre {
            background: #1a1a2e;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 10px 0;
            border: 1px solid rgba(96, 165, 250, 0.2);
        }
        pre code {
            background: none;
            padding: 0;
            color: #60a5fa;
        }
        .status {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #10b981;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        a {
            color: #60a5fa;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .info-box {
            background: rgba(96, 165, 250, 0.1);
            border-left: 4px solid #60a5fa;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 ${docs.title}</h1>
        <p style="color: #9ca3af; margin-bottom: 20px;">${docs.description}</p>
        
        <div class="info-box">
            <strong><span class="status"></span>API Status: Online</strong><br>
            <strong>Base URL:</strong> <code>${docs.baseUrl}</code><br>
            <strong>Version:</strong> ${docs.version}
        </div>

        <h2>📡 Endpoints</h2>

        <div class="endpoint">
            <span class="badge get">GET</span>
            <strong>Health Check</strong>
            <div class="endpoint-path">${docs.endpoints.health.path}</div>
            <p>${docs.endpoints.health.description}</p>
            <p><strong>Try it:</strong> <a href="${docs.endpoints.health.example}" target="_blank">${docs.endpoints.health.example}</a></p>
        </div>

        <h3>Projects</h3>
        
        <div class="endpoint">
            <span class="badge get">GET</span>
            <strong>List Projects</strong>
            <div class="endpoint-path">${docs.endpoints.projects.list.path}</div>
            <p>${docs.endpoints.projects.list.description}</p>
            <p><strong>Example:</strong> <a href="${docs.endpoints.projects.list.example}" target="_blank">${docs.endpoints.projects.list.example}</a></p>
        </div>

        <div class="endpoint">
            <span class="badge get">GET</span>
            <strong>Get Project Details</strong>
            <div class="endpoint-path">${docs.endpoints.projects.getById.path}</div>
            <p>${docs.endpoints.projects.getById.description}</p>
        </div>

        <div class="endpoint">
            <span class="badge post">POST</span>
            <strong>Create Project</strong>
            <div class="endpoint-path">${docs.endpoints.projects.create.path}</div>
            <p>${docs.endpoints.projects.create.description}</p>
            <p><strong>Requires:</strong> <code>x-api-key</code> header</p>
        </div>

        <h3>Simulation</h3>
        
        <div class="endpoint">
            <span class="badge post">POST</span>
            <strong>Simulate Score</strong>
            <div class="endpoint-path">${docs.endpoints.simulate.path}</div>
            <p>${docs.endpoints.simulate.description}</p>
            <p><strong>Example Response:</strong></p>
            <pre><code>${JSON.stringify(docs.endpoints.simulate.response, null, 2)}</code></pre>
        </div>

        <h3>Analytics</h3>
        
        <div class="endpoint">
            <span class="badge get">GET</span>
            <strong>Get Analytics</strong>
            <div class="endpoint-path">${docs.endpoints.analytics.path}</div>
            <p>${docs.endpoints.analytics.description}</p>
            <p><strong>Try it:</strong> <a href="${docs.endpoints.analytics.example}" target="_blank">${docs.endpoints.analytics.example}</a></p>
        </div>

        <h3>Smart Contract</h3>
        
        <div class="endpoint">
            <span class="badge get">GET</span>
            <strong>Get On-Chain Score</strong>
            <div class="endpoint-path">${docs.endpoints.contract.getScore.path}</div>
            <p>${docs.endpoints.contract.getScore.description}</p>
        </div>

        <div class="endpoint">
            <span class="badge post">POST</span>
            <strong>Publish Score to Contract</strong>
            <div class="endpoint-path">${docs.endpoints.contract.setScore.path}</div>
            <p>${docs.endpoints.contract.setScore.description}</p>
            <p><strong>Requires:</strong> Admin API key</p>
        </div>

        <h2>⛓️ Smart Contract</h2>
        <div class="info-box">
            <strong>Network:</strong> ${docs.smartContract.network}<br>
            <strong>Contract ID:</strong> <code>${docs.smartContract.contractId}</code><br>
            <strong>Explorer:</strong> <a href="${docs.smartContract.explorer}" target="_blank">View on Qubic Explorer</a>
        </div>

        <h2>🔐 Authentication</h2>
        <p>${docs.authentication.description}</p>
        <pre><code>${docs.authentication.header}: ${docs.authentication.example}</code></pre>

        <h2>📚 Resources</h2>
        <ul style="list-style: none; padding-left: 0;">
            <li>📖 <a href="${docs.links.github}" target="_blank">GitHub Repository</a></li>
            <li>📄 <a href="${docs.links.github}/blob/main/API.md" target="_blank">Full API Documentation</a></li>
            <li>🏗️ <a href="${docs.links.github}/blob/main/ARCHITECTURE.md" target="_blank">Architecture</a></li>
        </ul>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #6b7280;">
            <p>Built with ❤️ for the Qubic ecosystem</p>
        </div>
    </div>
</body>
</html>
    `;

    res.send(html);
});

/**
 * GET /api/docs/json
 * Return raw JSON documentation
 */
router.get('/json', (req: Request, res: Response) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json({
        title: 'Nostromo Guardian API',
        version: '1.0.0',
        baseUrl: `${baseUrl}/api`,
        endpoints: [
            { method: 'GET', path: '/health', description: 'Health check' },
            { method: 'GET', path: '/projects', description: 'List projects' },
            { method: 'GET', path: '/projects/:id', description: 'Get project details' },
            { method: 'POST', path: '/projects', description: 'Create project' },
            { method: 'POST', path: '/simulate', description: 'Simulate score' },
            { method: 'GET', path: '/analytics', description: 'Get analytics' },
            { method: 'GET', path: '/contract/score/:id', description: 'Get on-chain score' },
            { method: 'POST', path: '/contract/set-score', description: 'Publish score to contract' },
        ]
    });
});

export default router;
