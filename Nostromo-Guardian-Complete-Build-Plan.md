# Nostromo Guardian: Dynamic Risk Scoring for Qubic Launches
## Complete Build Plan & Technical Specification

---

## Table of Contents
1. Executive Overview
2. Project Objectives & Impacts
3. Core Features & User Flows
4. Complete Workflow Architecture
5. Comprehensive Tech Stack Guide
6. Smart Contract Integration
7. Security Best Practices
8. Reference Projects & Documentation
9. 48-Hour Build Timeline
10. Submission Checklist

---

## 1. Executive Overview

### Project Title
**Nostromo Guardian: Dynamic Risk Scoring for Qubic Launches**

### Problem Statement
- Qubic's Nostromo launchpad lacks intelligent, standardized risk assessment for projects.
- Retail investors have no transparent way to evaluate project quality before participating.
- Project builders lack clear feedback on what makes them "launch-ready."
- Nostromo's DAO has no data-driven framework for approving projects.

### Solution
An AI/heuristic-powered risk scoring protocol that:
- Analyzes each Nostromo project across 7 key dimensions (tokenomics, vesting, team, docs, community, audits, on-chain signals).
- Produces a transparent score (0–100) + visual risk tags (Green/Yellow/Red).
- Maps scores to dynamic launch parameters (caps, tiers, fees, visibility).
- Provides builders with actionable feedback to improve launch readiness.
- Integrates natively with Nostromo's lifecycle and DAO governance.

### Why This Wins
- **Ecosystem need**: Direct alignment with Nostromo's goal of "secure, community-driven IDOs."
- **Qubic narrative**: Leverages Qubic's feeless, high-TPS design to enable real-time scoring at scale.
- **Judging fit**: Hits all rubric pillars: presentation (clear problem/solution), business value (obvious revenue streams), technology (Qubic + scoring engine + DAO), originality (adaptive, on-chain risk integration).

---

## 2. Project Objectives & Impacts

### Core Objectives
1. **For Investors**: Provide transparent, standardized risk data before IDO participation.
2. **For Builders**: Offer clear quality checklist and scoring sandbox to improve readiness.
3. **For Nostromo/DAO**: Enable data-driven project approval and dynamic fee/cap governance.
4. **For Qubic**: Demonstrate ecosystem infrastructure that protects capital and attracts projects.

### Key Impacts
- **Risk reduction**: Standardized scoring reduces rug-pull and low-quality project participation.
- **Capital attraction**: Safer launchpad narrative attracts institutional interest.
- **Ecosystem maturity**: First-class risk infrastructure signals professional DeFi ecosystem on Qubic.
- **Builder empowerment**: Transparent scoring → faster iteration → more launch-ready teams.
- **DAO governance**: Quantitative data feeds DAO voting on project approvals and fee tiers.

---

## 3. Core Features & User Flows

### Feature 1: Launch Quality Scoring Engine
**What**: Algorithmic analysis of project metadata + on-chain signals → single composite score.

**Scoring Dimensions** (7 pillars):
1. **Tokenomics** (20 points max)
   - Team allocation % (lower is better)
   - Supply distribution fairness
   - Inflation/deflation design clarity
   
2. **Vesting & Lock-ups** (20 points max)
   - Team vesting duration (longer is safer)
   - Founder wallet locks
   - Release schedule transparency
   
3. **Documentation & Clarity** (15 points max)
   - Whitepaper/litepaper completeness
   - Tokenomics clarity
   - Roadmap specificity
   
4. **Team & On-Chain History** (15 points max)
   - Team members' prior project track record
   - Linked wallet behavior (no prior rugs)
   - Contract deployment history
   
5. **Community Signals** (15 points max)
   - Social followers (Twitter, Discord)
   - GitHub activity (commits, repos)
   - Community size & engagement
   
6. **Audit & Security** (10 points max)
   - Smart contract audits (if any)
   - Bug bounty program
   - Security best practices documentation
   
7. **Launch Readiness** (5 points max)
   - Legal/KYC preparation
   - Compliance indicators

**Output**:
- **Score**: 0–100
- **Grade**: Green (80+), Yellow (60–79), Red (<60)
- **Risk tags**: E.g., "High team allocation", "No vesting", "No audits"
- **Recommendation**: "Good for launch", "Needs improvement", "Not recommended yet"

---

### Feature 2: Risk-to-Action Configuration Engine
**What**: Map score bands to Nostromo launch parameters.

**Logic**:
```
Score ≥ 80 (Green):
  - Standard cap (100K–500K QUBIC)
  - Standard fee tier (2–3%)
  - All investor tiers eligible
  - Highlighted on homepage
  
Score 60–79 (Yellow):
  - Reduced cap (50K–200K QUBIC)
  - Higher fee tier (4–5%)
  - Mid-tier+ investors only
  - Secondary listing
  
Score < 60 (Red):
  - Minimal cap (10K–50K QUBIC)
  - Highest fee tier (6–8%)
  - Accredited tier only
  - Must pass manual DAO review
  - Warning labels throughout
```

**Storage**: JSON config stored in backend, conceptually readable by Nostromo contract.

---

### Feature 3: Guardian Dashboard (Web App)
**What**: Public-facing UI for investors, builders, and analysts.

**Pages**:
1. **Launches List** (`/launches`)
   - Table: Project name | Score | Grade | Cap | Status | Details link
   - Filters: by score band, by tier, by status
   - Sort: by score, by launch date, by tier
   - Quick stats: Total projects, avg score, % green/yellow/red

2. **Launch Detail** (`/launches/:id`)
   - Score breakdown chart (radar or bar per dimension)
   - Risk tags & flags
   - Team allocation pie chart
   - Vesting timeline
   - Key documents (whitepaper, GitHub link, audit link)
   - Recommended launch parameters
   - Score history (how score changed over time if applicable)
   - External links: X, Discord, website

3. **Builder Sandbox** (`/simulate`)
   - Form inputs: team allocation %, vesting months, supply splits, docs score, audit status, social followers, etc.
   - Real-time score calculator
   - "What to improve" checklist
   - Comparison view: "Current vs. Target Score"
   - Export as shareable recommendation

4. **Analytics** (`/analytics`)
   - Distribution of scores across ecosystem
   - Avg score by category (DeFi, payments, infra, etc.)
   - Historical trends
   - Success metrics (if data available)

---

### Feature 4: Nostromo Integration UI Layer
**What**: Mocked Nostromo launchpad UI showing Guardian scores.

**Integration Points**:
- Each project card on Nostromo pool list calls `/api/score/:projectId`
- Displays: "Score: 85 (Green) ✓ Safe for launch"
- Color-coded badge, risk tags visible
- Link to full Guardian detail page
- (For hackathon: can be static HTML overlay or React component embedded in demo)

---

### User Flows

#### Flow 1: Investor Decision-Making
```
1. Investor visits Nostromo homepage
2. Sees list of upcoming IDO pools
3. Each pool card shows Guardian score + grade (Green/Yellow/Red) + 2–3 key risk flags
4. Investor clicks pool → see full Guardian detail page
   a. Detailed score breakdown (radar chart)
   b. All risk flags with explanations
   c. Team allocation, vesting, audit info
   d. Recommended launch parameters
5. Investor makes informed decision to participate or skip
6. If participating, sees their tier-specific cap and fee based on Guardian score
```

#### Flow 2: Project Builder Iteration
```
1. Project team visits Guardian Builder Sandbox
2. Enters initial project data (tokenomics, team info, vesting plan)
3. Guardian calculates score → shows "72 (Yellow) – Needs work"
4. Sees checklist:
   a. ✗ Team allocation too high (40% vs. ideal 15%)
   b. ✗ No vesting schedule
   c. ✓ Whitepaper complete
   d. ✗ GitHub private or minimal activity
5. Team iterates on design:
   a. Reduces team allocation to 20%
   b. Adds 2-year founder vesting
   c. Pushes GitHub activity
   d. Resimulates → Score jumps to "82 (Green) – Ready for launch"
6. Team exports score + recommendations
7. Team submits project to Nostromo with Guardian score as proof of quality
```

#### Flow 3: DAO Governance
```
1. Nostromo DAO votes on new project approval
2. DAO members see Guardian score + full analysis as decision support
3. DAO proposal notes: "Guardian recommends YELLOW tier, recommend 3% fee, 150K cap"
4. DAO votes on these parameters (could be auto-set by score, or manually adjusted)
5. Project approved → enters launch pool with DAO-decided parameters
```

---

## 4. Complete Workflow Architecture

### End-to-End Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       Project Submission                        │
│  (Team fills form or connects wallet/GitHub/social metadata)    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Data Aggregation & Validation (Backend)            │
│  - Fetch GitHub activity, Twitter followers, on-chain history  │
│  - Parse whitepaper/docs URLs                                   │
│  - Validate tokenomics (sum to 100%, realistic vesting)         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│        Scoring Engine (Scoring Service / Microservice)          │
│  Input: Project profile (tokenomics, team, docs, social, etc.)  │
│                                                                  │
│  Process:                                                        │
│  1. Validate inputs                                             │
│  2. Calculate subscores for each of 7 dimensions                │
│  3. Apply weighting (default: equal 1/7 each)                   │
│  4. Aggregate to single score (0–100)                           │
│  5. Assign grade (Green/Yellow/Red)                             │
│  6. Generate risk tags & recommendations                        │
│                                                                  │
│  Output: Score object (score, grade, tags, subscores)           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Config Engine (Risk-to-Action Mapper)              │
│  Input: Score object                                            │
│  Process: Map score band → launch config                        │
│  Output: Launch config JSON (cap, fee tier, access tier)        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Database Storage (PostgreSQL/MongoDB)              │
│  Tables:                                                         │
│  - projects (id, name, status, created_at)                      │
│  - scores (project_id, score, grade, subscores, timestamp)      │
│  - configs (project_id, cap, fee_tier, access_tier)             │
│  - flags (score_id, flag_text, severity)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  API Layer (REST Endpoints)                     │
│  - GET /api/projects → list all projects                        │
│  - GET /api/projects/:id → full project + score + config        │
│  - POST /api/projects → submit new project                      │
│  - POST /api/simulate → calculate score for form inputs         │
│  - GET /api/analytics → ecosystem stats                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Frontend (React/Next.js Web App)                    │
│  - Dashboard: project list + filters                            │
│  - Detail pages: score breakdown, risk flags, docs              │
│  - Sandbox: real-time score simulator for builders              │
│  - Analytics: ecosystem trends                                  │
│  - Nostromo integration layer: mock UI overlay                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│         Qubic Smart Contract / Config (Testnet/Future)         │
│  (Minimal for hackathon, conceptual for judges)                 │
│  - Store Guardian scores on-chain                               │
│  - Guard checks: can't start sale if score < threshold          │
│  - Nostromo reads score to auto-set caps/fees                   │
│  - (Could integrate with Nostromo's IDO template in future)    │
└─────────────────────────────────────────────────────────────────┘
```

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌────────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │  Dashboard     │  │   Sandbox   │  │  Analytics UI    │  │
│  │  (Project List)│  │  (Builder)  │  │  (Trends)        │  │
│  └────────────────┘  └─────────────┘  └──────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐│
│  │        Nostromo Integration Layer (Mock UI)             ││
│  └──────────────────────────────────────────────────────────┘│
└─────────────────────┬──────────────────────────────────────┘
                      │ HTTP/REST
                      ▼
┌──────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            API Gateway / Route Handler                  │ │
│  │  - Authentication & rate limiting                       │ │
│  │  - Request validation                                   │ │
│  │  - Response serialization                               │ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Service Layer                              │ │
│  │  ┌───────────────┐  ┌──────────────┐  ┌────────────┐   │ │
│  │  │ Project       │  │ Score        │  │ Config     │   │ │
│  │  │ Service       │  │ Service      │  │ Service    │   │ │
│  │  │ (CRUD)        │  │ (Scoring)    │  │ (Mapping)  │   │ │
│  │  └───────────────┘  └──────────────┘  └────────────┘   │ │
│  │  ┌───────────────┐  ┌──────────────┐  ┌────────────┐   │ │
│  │  │ Data Fetch    │  │ Analytics    │  │ Admin      │   │ │
│  │  │ Service       │  │ Service      │  │ Service    │   │ │
│  │  │ (External     │  │ (Aggregation)│  │ (Mgmt)     │   │ │
│  │  │  APIs)        │  │              │  │            │   │ │
│  │  └───────────────┘  └──────────────┘  └────────────┘   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────────┐
│  Database    │  │  Qubic RPC  │  │  External APIs   │
│  (PostgreSQL/│  │  (Testnet)  │  │  (GitHub, X,     │
│   MongoDB)   │  │             │  │   CoinGecko, etc)│
└──────────────┘  └─────────────┘  └──────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     BLOCKCHAIN LAYER                         │
│  ┌──────────────────────────────────────────────────────────┐│
│  │   Qubic Testnet                                          ││
│  │   ┌────────────────────────────────────────────────────┐ ││
│  │   │ Guardian Score Contract (C++ or Config JSON)      │ ││
│  │   │ - Store project scores on-chain                   │ ││
│  │   │ - Guard checks for IDO launch                     │ ││
│  │   │ - Fee/cap parameter setters                       │ ││
│  │   └────────────────────────────────────────────────────┘ ││
│  │                                                            ││
│  │   ┌────────────────────────────────────────────────────┐ ││
│  │   │ Integration with Nostromo IDO Template            │ ││
│  │   │ - Nostromo reads Guardian score                   │ ││
│  │   │ - Enforces caps/fees based on score              │ ││
│  │   │ - Tier-gated access                               │ ││
│  │   └────────────────────────────────────────────────────┘ ││
│  └──────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Comprehensive Tech Stack Guide

### Frontend Stack

**Primary Framework**: Next.js + TypeScript

**Why Next.js**:
- Fast static generation for dashboard pages
- Built-in API routes (can host mock backend during demo)
- Excellent deployment to Vercel (clean demo URL)
- Fast, modern dev experience
- SEO-friendly (good for presenting to investors)

**Core Libraries**:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "typescript": "^5.0.0",
    
    "UI & Styling": {
      "tailwindcss": "^3.3.0",
      "recharts": "^2.10.0",           // Charts/visualizations
      "react-icons": "^4.11.0"         // Icon library
    },
    
    "State & Data": {
      "axios": "^1.6.0",               // HTTP client
      "react-query": "^3.39.0",        // Server state mgmt
      "zustand": "^4.4.0"              // Client state (optional)
    },
    
    "Forms & Validation": {
      "react-hook-form": "^7.48.0",
      "zod": "^3.22.0"                 // Schema validation
    },
    
    "Utilities": {
      "date-fns": "^2.30.0",           // Date handling
      "lodash": "^4.17.21",            // Utility functions
      "classnames": "^2.3.0"           // Conditional className
    }
  }
}
```

**Component Structure**:
```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── Dashboard/
│   │   ├── ProjectList.tsx
│   │   ├── ProjectCard.tsx
│   │   └── FilterBar.tsx
│   ├── Detail/
│   │   ├── ScoreBreakdown.tsx
│   │   ├── RiskFlags.tsx
│   │   └── TokenomicsChart.tsx
│   └── Sandbox/
│       ├── SimulatorForm.tsx
│       ├── RealTimeScore.tsx
│       └── Checklist.tsx
├── pages/
│   ├── index.tsx          // Home/Dashboard
│   ├── launches/
│   │   ├── index.tsx      // List
│   │   └── [id].tsx       // Detail
│   ├── sandbox.tsx        // Builder sandbox
│   └── analytics.tsx      // Analytics
├── api/
│   ├── projects.ts        // Mock API endpoints (during hackathon)
│   ├── scores.ts
│   └── simulate.ts
├── hooks/
│   ├── useProjects.ts
│   ├── useScore.ts
│   └── useSandbox.ts
├── utils/
│   ├── scoring.ts         // Scoring logic (frontend helper)
│   ├── formatters.ts
│   └── constants.ts
└── types/
    └── index.ts           // TypeScript interfaces
```

**Key Pages**:
1. **`pages/index.tsx`** – Dashboard landing page
2. **`pages/launches/index.tsx`** – Launches list with filters
3. **`pages/launches/[id].tsx`** – Project detail + score breakdown
4. **`pages/sandbox.tsx`** – Builder simulator
5. **`pages/analytics.tsx`** – Ecosystem analytics

---

### Backend Stack

**Framework**: Node.js + Express (or Nest.js for structure)

**Why Express/NestJS**:
- Fast, lightweight
- Mature ecosystem
- Easy to deploy
- Good for REST APIs
- Can use TypeScript for type safety

**Architecture**:
```
backend/
├── src/
│   ├── main.ts               // App entry point
│   ├── app.ts                // Express app setup
│   ├── middleware/
│   │   ├── auth.ts           // API key validation
│   │   ├── rateLimiting.ts
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── projects.ts
│   │   ├── scores.ts
│   │   ├── simulate.ts
│   │   └── analytics.ts
│   ├── services/
│   │   ├── ProjectService.ts
│   │   ├── ScoringService.ts      // Core scoring logic
│   │   ├── ConfigService.ts       // Risk-to-action mapping
│   │   ├── DataFetchService.ts    // External API calls
│   │   └── AnalyticsService.ts
│   ├── controllers/
│   │   ├── ProjectController.ts
│   │   ├── ScoreController.ts
│   │   └── SimulationController.ts
│   ├── models/
│   │   ├── Project.ts        // TypeScript interfaces
│   │   ├── Score.ts
│   │   ├── Config.ts
│   │   └── RiskFlag.ts
│   ├── db/
│   │   ├── connection.ts     // DB setup
│   │   └── seed.ts           // Mock data for demo
│   └── utils/
│       ├── logger.ts
│       ├── validation.ts
│       └── constants.ts
├── package.json
└── tsconfig.json
```

**Core Dependencies**:
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "typescript": "^5.0.0",
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    
    "Database": {
      "pg": "^8.10.0",             // PostgreSQL
      "mongoose": "^7.5.0"         // MongoDB (alternative)
    },
    
    "Validation": {
      "joi": "^17.10.0",           // Schema validation
      "class-validator": "^0.14.0"
    },
    
    "External APIs": {
      "axios": "^1.6.0",
      "octokit": "^2.0.0"          // GitHub API
    },
    
    "Utilities": {
      "dotenv": "^16.3.0",
      "cors": "^2.8.0",
      "helmet": "^7.0.0",          // Security headers
      "uuid": "^9.0.0"
    },
    
    "Logging & Monitoring": {
      "winston": "^3.11.0",
      "morgan": "^1.10.0"
    }
  }
}
```

**Scoring Service Pseudocode**:
```typescript
// src/services/ScoringService.ts

class ScoringService {
  // Dimension 1: Tokenomics (20 points)
  scoreTokenomics(project: Project): number {
    let score = 0;
    
    // Team allocation check (0-10 points)
    if (project.teamAllocation <= 10) score += 10;
    else if (project.teamAllocation <= 20) score += 6;
    else if (project.teamAllocation <= 30) score += 2;
    else score += 0;
    
    // Supply fairness (0-10 points)
    if (project.supplyDistribution.isBalanced) score += 10;
    else score += 5;
    
    return Math.min(score, 20);
  }
  
  // Dimension 2: Vesting & Lock-ups (20 points)
  scoreVesting(project: Project): number {
    let score = 0;
    
    if (project.teamVestingMonths >= 24) score += 15;
    else if (project.teamVestingMonths >= 12) score += 10;
    else if (project.teamVestingMonths >= 6) score += 5;
    else score += 0;
    
    if (project.hasFounderLocks) score += 5;
    
    return Math.min(score, 20);
  }
  
  // ... (similar for 5 other dimensions)
  
  // Aggregate all dimensions
  calculateCompositeScore(project: Project): ScoreResult {
    const subscores = {
      tokenomics: this.scoreTokenomics(project),
      vesting: this.scoreVesting(project),
      documentation: this.scoreDocumentation(project),
      teamHistory: this.scoreTeamHistory(project),
      community: this.scoreCommunity(project),
      audit: this.scoreAudit(project),
      launchReadiness: this.scoreLaunchReadiness(project)
    };
    
    const total = Object.values(subscores).reduce((a, b) => a + b, 0);
    
    // Generate grade
    let grade: 'Green' | 'Yellow' | 'Red';
    if (total >= 80) grade = 'Green';
    else if (total >= 60) grade = 'Yellow';
    else grade = 'Red';
    
    // Generate risk flags
    const flags = this.generateRiskFlags(project, subscores);
    
    return {
      score: total,
      grade,
      subscores,
      flags,
      recommendation: this.getRecommendation(grade)
    };
  }
  
  // Generate actionable risk flags
  private generateRiskFlags(project: Project, subscores: any): RiskFlag[] {
    const flags: RiskFlag[] = [];
    
    if (project.teamAllocation > 25) {
      flags.push({
        text: `High team allocation (${project.teamAllocation}%), recommended <20%`,
        severity: 'high'
      });
    }
    
    if (!project.teamVestingMonths || project.teamVestingMonths < 12) {
      flags.push({
        text: 'No or short team vesting, recommended 12-24 months',
        severity: 'high'
      });
    }
    
    if (!project.whitepaperUrl) {
      flags.push({
        text: 'No whitepaper found',
        severity: 'medium'
      });
    }
    
    if (!project.auditReport) {
      flags.push({
        text: 'No audit report (optional but recommended for >$1M raises)',
        severity: 'low'
      });
    }
    
    return flags;
  }
}
```

---

### Database Schema

**PostgreSQL (Recommended for structured data)**:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website_url VARCHAR(500),
  whitepaper_url VARCHAR(500),
  github_url VARCHAR(500),
  twitter_handle VARCHAR(100),
  discord_invite VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft', -- draft, submitted, approved, launched, failed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Scores table (historical)
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  score INT CHECK (score >= 0 AND score <= 100),
  grade VARCHAR(10), -- 'Green', 'Yellow', 'Red'
  tokenomics_score INT,
  vesting_score INT,
  documentation_score INT,
  team_history_score INT,
  community_score INT,
  audit_score INT,
  launch_readiness_score INT,
  calculated_at TIMESTAMP DEFAULT NOW(),
  INDEX (project_id, calculated_at)
);

-- Risk flags table
CREATE TABLE risk_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  score_id UUID NOT NULL REFERENCES scores(id) ON DELETE CASCADE,
  flag_text TEXT NOT NULL,
  severity VARCHAR(10), -- 'low', 'medium', 'high'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Launch configs table
CREATE TABLE launch_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  score_id UUID REFERENCES scores(id),
  cap_min INT, -- e.g., 50000
  cap_max INT, -- e.g., 200000
  fee_tier_percent DECIMAL(5,2), -- e.g., 4.50
  access_tier VARCHAR(50), -- 'public', 'mid-tier', 'accredited'
  recommendation TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id) -- Only latest config per project
);

-- Project metadata (tokenomics, team, etc.)
CREATE TABLE project_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  team_allocation_percent DECIMAL(5,2),
  team_vesting_months INT,
  founder_wallet_address VARCHAR(500),
  has_founder_locks BOOLEAN DEFAULT FALSE,
  supply_distribution_fair BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id)
);
```

---

### Qubic Integration (Blockchain Layer)

**What we need from Qubic**:
1. RPC endpoints (testnet + mainnet URLs)
2. Smart contract SDK/framework (C++)
3. Transaction signing & broadcasting

**RPC Endpoints**:
```typescript
// src/config/qubic.ts
export const QUBIC_CONFIG = {
  TESTNET_RPC: 'https://testnet-rpc.qubic.org',
  MAINNET_RPC: 'https://rpc.qubic.org',
  
  // For hackathon, teams may get assigned nodes
  ASSIGNED_NODE_IP: process.env.QUBIC_NODE_IP || 'http://66.248.204.226',
};
```

**Smart Contract Stub (C++)**:
```cpp
// GuardianScore.cpp
// Minimal proof-of-concept for hackathon

#include <qubic.h>

// Simple struct to store score
struct GuardianScoreData {
  u64 projectId;
  u8 score;  // 0-100
  u8 grade;  // 0=Green, 1=Yellow, 2=Red
};

// State variables
struct {
  GuardianScoreData scores[100];  // Array of project scores
  u32 scoreCount;
} state;

// Procedure: setGuardianScore (write)
void setGuardianScore(GuardianScoreData input) {
  // Guard check: only authorized scorer can call
  // In real version: check signer against list of authorized accounts
  
  // Find or create score entry
  for (u32 i = 0; i < state.scoreCount; i++) {
    if (state.scores[i].projectId == input.projectId) {
      state.scores[i] = input;
      return;
    }
  }
  
  // Add new score
  if (state.scoreCount < 100) {
    state.scores[state.scoreCount++] = input;
  }
}

// Function: getGuardianScore (read)
GuardianScoreData getGuardianScore(u64 projectId) {
  for (u32 i = 0; i < state.scoreCount; i++) {
    if (state.scores[i].projectId == projectId) {
      return state.scores[i];
    }
  }
  return {0, 0, 0};  // Not found
}

// IDO Guard Check: can only start if score >= 60
bool canStartIDO(u64 projectId) {
  GuardianScoreData score = getGuardianScore(projectId);
  return score.score >= 60;  // Only Green and Yellow allowed
}
```

**Frontend Integration with Qubic**:
```typescript
// src/services/QubicService.ts

import axios from 'axios';

class QubicService {
  private rpcUrl: string;
  
  constructor(rpcUrl = process.env.REACT_APP_QUBIC_RPC) {
    this.rpcUrl = rpcUrl;
  }
  
  // Get network status
  async getNetworkStatus() {
    const response = await axios.get(`${this.rpcUrl}/v1/status`);
    return response.data;
  }
  
  // Get specific tick info
  async getTickInfo(tickNumber: number) {
    const response = await axios.get(
      `${this.rpcUrl}/v1/ticks/${tickNumber}`
    );
    return response.data;
  }
  
  // Broadcast transaction to call setGuardianScore
  async setGuardianScore(
    projectId: number,
    score: number,
    grade: number,
    sourcePublicKey: string
  ) {
    // Build transaction
    const tx = {
      destinationPublicKey: process.env.GUARDIAN_CONTRACT_ADDRESS,
      transactionData: {
        procedureIndex: 1,  // setGuardianScore
        inputData: {
          projectId,
          score,
          grade
        }
      },
      sourcePublicKey
    };
    
    // Broadcast
    const response = await axios.post(
      `${this.rpcUrl}/v1/broadcast-transaction`,
      tx
    );
    
    return response.data;
  }
}

export default new QubicService();
```

---

## 6. Smart Contract Integration

### Contract Architecture

**Guardian Score Contract** (on Qubic testnet)

**Purpose**: Store and manage project scores on-chain, provide guard checks for IDO launches.

**Key Functions**:

1. **`setGuardianScore(projectId, score, grade)`** – Callable by authorized scorer
   - Input: project ID, score (0–100), grade (0=Green, 1=Yellow, 2=Red)
   - Effect: Update or create score entry
   - Guard: Only allow if sender is authorized

2. **`getGuardianScore(projectId)`** – Public read function
   - Input: project ID
   - Output: (score, grade)
   - Use: Nostromo reads this to determine launch parameters

3. **`canLaunchIDO(projectId)`** – Public query
   - Input: project ID
   - Output: boolean
   - Logic: `score >= 60` → true (Green or Yellow), `score < 60` → false (Red)

4. **`getRecommendedConfig(projectId)`** – Public query
   - Input: project ID
   - Output: config JSON (cap, fee, tier)
   - Logic: Based on score band, return recommended parameters

**Integration with Nostromo**:
- Nostromo IDO template queries Guardian contract before allowing sale to start
- Nostromo reads recommended config to set user tiers and fees
- DAO can vote to override config if needed

---

## 7. Security Best Practices

### Smart Contract Security

**1. Input Validation**
- Always validate `projectId`, `score` (0–100), `grade` (0–2) bounds
- Revert on invalid inputs with clear error messages

```cpp
void setGuardianScore(GuardianScoreData input) {
  // Validate inputs
  if (input.score > 100) {
    // Revert: invalid score
    return;
  }
  if (input.grade > 2) {
    // Revert: invalid grade
    return;
  }
  // ... proceed
}
```

**2. Access Control**
- Only authorized scorer can call `setGuardianScore`
- Use multi-sig or DAO governance for critical parameter changes
- Store authorized accounts in contract state

```cpp
struct {
  u8 authorizedScorers[10];  // Public keys of authorized signers
} config;

void setGuardianScore(GuardianScoreData input) {
  // Check if sender is authorized
  bool authorized = false;
  for (u32 i = 0; i < 10; i++) {
    if (config.authorizedScorers[i] == tx.sender) {
      authorized = true;
      break;
    }
  }
  
  if (!authorized) {
    // Revert: unauthorized
    return;
  }
  
  // ... proceed
}
```

**3. State Management**
- Track historical scores (don't overwrite, append new entry with timestamp)
- Immutable audit trail for transparency
- Use arrays or mappings for efficient lookup

**4. Emergency Pause**
- Add ability to pause scoring updates in case of emergency
- Only callable by multi-sig owner

```cpp
bool scoringPaused = false;

void pauseScoring() {
  // Check multi-sig authorization
  scoringPaused = true;
}

void resumeScoring() {
  scoringPaused = false;
}

void setGuardianScore(GuardianScoreData input) {
  if (scoringPaused) return;
  // ... proceed
}
```

---

### Backend / API Security

**1. Input Validation**
- Validate all form inputs: numbers, strings, URLs
- Use schema validation libraries (Joi, Zod, class-validator)

```typescript
// Validation schema
const projectSchema = Joi.object({
  name: Joi.string().required().max(255),
  teamAllocation: Joi.number().min(0).max(100).required(),
  teamVestingMonths: Joi.number().min(0).max(120).required(),
  websiteUrl: Joi.string().uri().required(),
  whitepaperUrl: Joi.string().uri().optional(),
});

// Use in route
app.post('/api/projects', (req, res) => {
  const { error, value } = projectSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  
  // ... process valid project
});
```

**2. API Authentication & Authorization**
- Require API key for write endpoints
- Rate limit to prevent abuse
- Use CORS to restrict origins

```typescript
// API key middleware
function apiKeyAuth(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Rate limiting middleware
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                     // max 100 requests per window
});

// Apply middleware
app.use('/api/', limiter);
app.post('/api/projects', apiKeyAuth, (req, res) => { ... });
```

**3. Secret Management**
- Never commit `.env` files or private keys
- Use environment variables for sensitive data
- Rotate keys regularly

```bash
# .env file (DO NOT COMMIT)
DATABASE_URL=postgresql://user:password@localhost/guardian
API_KEY=super_secret_key_12345
QUBIC_RPC=https://testnet-rpc.qubic.org
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

```typescript
// Load from env
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
```

**4. Database Security**
- Use parameterized queries to prevent SQL injection
- Encrypt sensitive data (tokens, wallet addresses)
- Use connection pooling
- Regular backups

```typescript
// Parameterized query (safe)
const project = await db.query(
  'SELECT * FROM projects WHERE id = $1',
  [projectId]
);

// NOT safe (vulnerable to injection)
// const project = await db.query(`SELECT * FROM projects WHERE id = ${projectId}`);
```

**5. HTTPS & Transport Security**
- Always use HTTPS in production
- Use security headers (Helmet.js)
- CORS restrictions

```typescript
import helmet from 'helmet';
import cors from 'cors';

app.use(helmet());  // Sets security headers
app.use(cors({ origin: process.env.FRONTEND_URL }));
```

---

### Frontend Security

**1. Input Sanitization**
- Sanitize user input before displaying (prevent XSS)
- Use libraries like `DOMPurify` or React's automatic escaping

```typescript
// React automatically escapes JSX values
const projectName = "<script>alert('xss')</script>";
<h1>{projectName}</h1>  // Safe: displays as text, not executed
```

**2. Secure API Calls**
- Don't store sensitive tokens in localStorage (use httpOnly cookies)
- Validate API responses
- Handle errors gracefully

```typescript
// Fetch with error handling
async function fetchProjects() {
  try {
    const response = await fetch('/api/projects', {
      headers: {
        'X-API-Key': process.env.REACT_APP_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    // Show user-friendly error message
  }
}
```

**3. Environment Variables**
- Use `REACT_APP_` prefix for frontend env vars (only non-sensitive!)
- Never store private keys or sensitive tokens in frontend code

```bash
# .env.local (DO NOT COMMIT)
REACT_APP_API_URL=https://api.example.com
REACT_APP_QUBIC_RPC=https://testnet-rpc.qubic.org
# NOT SAFE: REACT_APP_API_KEY=secret (visible in bundle!)
```

---

## 8. Reference Projects & Documentation

### Must Study First

**1. Qubic Ecosystem & Documentation**
- **Qubic Docs** (https://docs.qubic.org)
  - Smart Contracts section: Contract structure, QPI, best practices
  - RPC API: Endpoint reference, transaction format
  - Developer setup: C++ SDK, testnet access
  
- **Qubic Hackathon Repo** (https://github.com/qubic/qubic-hackathon)
  - Example contracts in C++
  - Frontend integration patterns
  - RPC usage examples
  - Testnet configuration

- **Nostromo Launchpad Blog** (https://qubic.org/blog-detail/nostromo-launchpad-a-new-frontier-for-decentralized-funding-on-qubic)
  - Launchpad lifecycle: Draft → Approved → Funded/Failed
  - DAO governance model
  - Fee tiers and access tiers
  - How projects qualify

---

**2. Frontend Best Practices**
- **Next.js Official Docs** (https://nextjs.org/docs)
  - App router vs pages router
  - API routes
  - Deployment to Vercel
  
- **Tailwind CSS** (https://tailwindcss.com)
  - Utility-first styling
  - Dark mode support
  - Responsive design

- **React Query / TanStack Query** (https://tanstack.com/query)
  - Server state management
  - Caching, background updates
  - Error handling

- **Recharts** (https://recharts.org)
  - Build score breakdown charts
  - Radar charts for multi-dimensional scores
  - Responsive charts

---

**3. Backend Best Practices**
- **NestJS Documentation** (https://docs.nestjs.com) – if using NestJS
  - Module structure
  - Services, controllers, middleware
  - Database integration

- **Express.js Official** (https://expressjs.com)
  - Middleware guide
  - Error handling
  - Routing

- **PostgreSQL Official** (https://www.postgresql.org/docs)
  - Schema design
  - Indexing
  - Query optimization

- **TypeORM or Prisma** (https://typeorm.io or https://www.prisma.io)
  - ORM for database abstraction
  - Migrations
  - Query builder

---

**4. Security & Best Practices**
- **OWASP Top 10** (https://owasp.org/Top10/)
  - Common web vulnerabilities
  - Mitigation strategies

- **Solidity Security Best Practices** (adapted for C++)
  - Checks-effects-interactions pattern
  - Reentrancy guards
  - Overflow/underflow protection

- **Lablab.ai Success Guide** (https://lablab.ai/how-to-be-successful-at-the-hackathon)
  - Submission requirements
  - Judging criteria
  - Demo best practices

---

### Secondary References

- **GitHub Action CI/CD** – for automated testing & deployment
- **Docker** – containerize backend for easy deployment
- **Postman/Insomnia** – API testing tools
- **Figma** – design mockups for UI/UX
- **Slender** – create architecture diagrams

---

## 9. 48-Hour Build Timeline

### Day 1 (Dec 5) – Foundation & Backend

**Hours 0–2: Setup & Planning**
- Clone boilerplate repos (Next.js + Express templates)
- Set up GitHub repo with proper .gitignore
- Create development branches
- Establish team communication (Discord/Slack)

**Hours 2–8: Backend Core**
- Set up Express + TypeScript boilerplate
- Create database schema (PostgreSQL migrations)
- Implement ProjectService (CRUD operations)
- Implement ScoringService (7-dimension scoring logic)
- Implement ConfigService (score-to-config mapping)
- Add mock data / seed database

**Hours 8–12: API Routes & Testing**
- Build REST endpoints:
  - `GET /api/projects` – list all
  - `POST /api/projects` – submit new
  - `GET /api/projects/:id` – get by ID
  - `POST /api/simulate` – calculate score for form inputs
- Test endpoints with Postman
- Add input validation

**Hours 12–14: External Integrations (Optional)**
- Integrate GitHub API to fetch repo stats
- Integrate Twitter API for follower count (or mock if rate-limited)
- Cache results to avoid API limits

**Hours 14–16: Qubic Contract Stub**
- Write minimal smart contract (C++) to store Guardian scores
- Set up contract compilation
- Deploy to Qubic testnet (or prepare deployment script)

**Hours 16–20: Deployment Prep**
- Deploy backend to Render / Fly.io / Railway
- Test deployed backend
- Set up environment variables

**Day 1 End**: Backend fully functional, API tested, contract deployed.

---

### Day 2 (Dec 6) – Frontend & Integration

**Hours 0–4: Frontend Setup**
- Create Next.js project with Tailwind + TypeScript
- Set up project structure (components, pages, hooks)
- Create base Layout component (header, sidebar)
- Set up environment variables

**Hours 4–10: Core Pages**
- Build Dashboard (`/index`) – project list with filters
- Build Launch List (`/launches`) – detailed project table
- Build Launch Detail (`/launches/[id]`) – score breakdown + risk flags
- Implement filtering & sorting

**Hours 10–14: Interactive Features**
- Build Builder Sandbox (`/sandbox`) – form inputs, real-time score
- Build Analytics page (`/analytics`) – charts and trends
- Add charts using Recharts (radar chart for score breakdown)

**Hours 14–18: Nostromo Integration Layer**
- Create mock Nostromo UI
- Call backend `/api/projects/:id` to fetch scores
- Display scores on mock launchpad cards
- Show risk tags and color-coded grades

**Hours 18–20: Testing & Polish**
- Test all pages in Chrome, Firefox
- Ensure responsive design (mobile-friendly)
- Fix any bugs or styling issues
- Add loading states and error messages

**Day 2 End**: Frontend fully functional, integrated with backend.

---

### Day 3 (Dec 7) – Polish, Documentation & Submission

**Hours 0–4: Documentation**
- Write comprehensive README.md:
  - Project overview
  - Feature list
  - Tech stack
  - Setup instructions
  - API documentation
  - Security considerations
  
- Add inline code comments
- Create ARCHITECTURE.md with system diagrams

**Hours 4–6: Demo Preparation**
- Record 5-minute demo video:
  - Show problem (lack of risk scoring on launchpad)
  - Walk through dashboard
  - Simulate project scoring in sandbox
  - Show Nostromo integration
  - Explain Qubic integration path
  
- Prepare slides (problem, solution, tech, market, roadmap)

**Hours 6–8: Create Submission Package**
- Ensure GitHub repo is public and well-organized
- Create deployed frontend URL (Vercel)
- Create deployed backend URL (Render/Fly.io)
- Test all links work

**Hours 8–10: Final Testing & Fixes**
- Full end-to-end test:
  - Submit project via form
  - See score update in dashboard
  - View on Nostromo mock page
- Fix any last-minute bugs

**Hours 10–12: Submit to Lablab**
- Fill out hackathon submission form:
  - Project title & description
  - GitHub link
  - Live demo URLs (frontend + backend)
  - Video link (YouTube)
  - Slide deck (PDF)
  - Team members + contact info
  
- Double-check all links
- Submit before deadline

---

## 10. Submission Checklist

### Code & Documentation
- [ ] Public GitHub repo with clear structure
- [ ] README.md with setup instructions, feature list, tech stack
- [ ] ARCHITECTURE.md with system diagrams
- [ ] Inline code comments in key services (scoring, config, contract)
- [ ] .env.example file showing required environment variables
- [ ] No API keys or secrets committed

### Frontend
- [ ] Live Vercel deployment with working URL
- [ ] All 5 main pages functional:
  - [ ] Dashboard (project list + filters)
  - [ ] Launch detail (score breakdown + risk flags)
  - [ ] Builder sandbox (real-time simulator)
  - [ ] Analytics page
  - [ ] Nostromo integration mock
  
- [ ] Responsive design (mobile-friendly)
- [ ] Error handling & loading states
- [ ] Dark mode support (nice-to-have)

### Backend
- [ ] Live deployment (Render/Fly.io/Railway) with working API
- [ ] All REST endpoints functional:
  - [ ] `GET /api/projects`
  - [ ] `POST /api/projects`
  - [ ] `GET /api/projects/:id`
  - [ ] `POST /api/simulate`
  - [ ] `GET /api/analytics`
  
- [ ] Input validation on all endpoints
- [ ] Error handling with meaningful messages
- [ ] API documentation (in README or Postman)

### Smart Contract
- [ ] C++ contract compiles without errors
- [ ] Contract deployed to Qubic testnet (or deployment script ready)
- [ ] Key functions implemented:
  - [ ] `setGuardianScore()`
  - [ ] `getGuardianScore()`
  - [ ] `canLaunchIDO()`
  
- [ ] Contract code well-commented
- [ ] Security checks: input validation, access control

### Demo & Video
- [ ] 5-minute video recorded and uploaded to YouTube
- [ ] Video covers:
  - [ ] Problem statement (lack of risk scoring)
  - [ ] Solution overview (what is Guardian)
  - [ ] Dashboard walkthrough (project list, scoring)
  - [ ] Sandbox demo (builder scoring simulation)
  - [ ] Nostromo integration (mock launchpad with scores)
  - [ ] Qubic contract integration (show contract code, deployment)
  - [ ] Go-to-market & revenue model
  - [ ] Roadmap & future plans
  
- [ ] Video quality is acceptable (clear audio, visible code/UI)
- [ ] Video is unlisted or public on YouTube

### Slide Deck
- [ ] PDF slide deck (8–12 slides)
- [ ] Covers:
  - [ ] Title slide (team name, project name, date)
  - [ ] Problem slide (what problem are we solving?)
  - [ ] Solution overview (what is Nostromo Guardian?)
  - [ ] Core features (scoring, config, dashboard, sandbox)
  - [ ] User flows (investor, builder, DAO)
  - [ ] Tech stack (frontend, backend, blockchain)
  - [ ] Business model (revenue streams, market size)
  - [ ] Roadmap (phase 1, 2, 3)
  - [ ] Team slide (names, roles, brief bios)
  - [ ] Call-to-action / Q&A

### Lablab.ai Submission Form
- [ ] Project title: "Nostromo Guardian: Dynamic Risk Scoring for Qubic Launches"
- [ ] Description (150–300 words): Clear problem, solution, and Qubic fit
- [ ] GitHub link (public repo)
- [ ] Live frontend URL (Vercel)
- [ ] Live backend URL (Render/Fly.io)
- [ ] Video link (YouTube)
- [ ] Slide deck link (Google Drive PDF)
- [ ] Team member names + emails
- [ ] Primary language: English
- [ ] Track: Nostromo Launchpad
- [ ] All required fields filled
- [ ] Submitted before deadline

---

## Appendix: Quick Reference

### Key Scoring Weights (7 Dimensions)
```
Tokenomics:        20 points (team allocation, supply fairness)
Vesting:           20 points (team vesting, founder locks)
Documentation:     15 points (whitepaper, clarity)
Team History:      15 points (track record, wallet history)
Community:         15 points (social, GitHub activity)
Audit:             10 points (security audits, bug bounties)
Launch Readiness:  5 points (legal prep, compliance)
────────────────────────────
TOTAL:             100 points
```

### Score-to-Grade Mapping
```
Score ≥ 80:   Green     → Recommended, standard launch
Score 60-79:  Yellow    → Proceed with caution, reduced cap
Score < 60:   Red       → Not recommended, DAO review only
```

### Score-to-Config Mapping
```
Green (80+):      Standard cap, 2-3% fee, all tiers, highlighted
Yellow (60-79):   Reduced cap (50-75%), 4-5% fee, mid-tier+, secondary listing
Red (<60):        Minimal cap (10-50%), 6-8% fee, accredited only, warnings
```

### Tech Stack Quick Summary
```
Frontend:    Next.js + TypeScript + Tailwind + Recharts
Backend:     Node.js + Express + TypeScript + PostgreSQL
Blockchain:  Qubic testnet + C++ smart contract
Deployment:  Vercel (frontend) + Render/Fly.io (backend)
```

### References to Study
```
Priority 1:
- Qubic docs.qubic.org
- Qubic hackathon repo github.com/qubic/qubic-hackathon
- Nostromo blog post

Priority 2:
- Next.js docs
- Express.js docs
- PostgreSQL docs
- Lablab.ai submission guide

Priority 3:
- Tailwind, Recharts, react-query docs
- TypeScript handbook
- OWASP best practices
```

---

## Conclusion

**Nostromo Guardian** is a timely, ecosystem-native solution that addresses a real need (risk assessment for IDO launches) using Qubic's core strengths (feeless transactions, high TPS for real-time scoring). By winning this hackathon, you position yourself to potentially launch this protocol with Qubic foundation support or venture capital, scaling from a 48-hour MVP to a production system.

**Key to winning:**
1. **Clear narrative**: "Safer launchpads = more capital attracted to Qubic"
2. **Working demo**: Investors see the dashboard, builders see the sandbox, everyone understands the Qubic integration path
3. **Professional execution**: Well-structured code, complete tech stack, thoughtful security
4. **Market fit**: Revenue model (fee sharing, API licensing) is obvious and compelling

Good luck! 🚀

---

*Document Version: 1.0*  
*Created: December 4, 2025*  
*For: Qubic Hack the Future Hackathon (Dec 5–7, 2025)*