# Nostromo Guardian: Dynamic Risk Scoring for Qubic Launches
## Detailed Sprint Plan & Implementation Roadmap

---

## Table of Contents
1. Sprint Overview & Scope
2. Development Phases & Milestones
3. Day 1 (Dec 5) – Backend Foundation & Smart Contract
4. Day 2 (Dec 6) – Frontend Development & Integration
5. Day 3 (Dec 7) – Testing, Polish & Submission
6. Parallel Workstreams & Coordination
7. Quality Assurance & Testing Strategy
8. Security Implementation Checklist
9. Judging Criteria Alignment Matrix
10. Risk Mitigation & Contingency Plans

---

## 1. Sprint Overview & Scope

### Hackathon Duration
**December 5–7, 2025** (48 hours)
- Start: Friday, December 5, 10:00 AM IST
- End: Sunday, December 7, 10:00 AM IST

### Success Definition
A **production-ready prototype** that:
- Demonstrates clear problem-solution fit
- Shows working scoring engine and dashboard
- Integrates with Qubic testnet
- Includes mock Nostromo launchpad integration
- Passes security checks and validation tests
- Meets all Lablab submission requirements

### Core Deliverables
1. **Backend API** – Fully functional REST endpoints with scoring logic
2. **Frontend Dashboard** – Interactive UI with all 4 core pages
3. **Smart Contract** – Deployed on Qubic testnet (or testnet-ready)
4. **Demo Package** – 5-minute video, slide deck, documentation
5. **Production Ready** – No TODOs, clean code, full error handling

### Team Roles (Recommended)
- **Backend Lead**: Database, APIs, scoring service, Qubic integration
- **Frontend Lead**: Dashboard, Sandbox, Nostromo integration UI
- **DevOps/Deployment**: Environment setup, deployments, CI/CD
- **Documentation**: README, ARCHITECTURE.md, slide deck, video

---

## 2. Development Phases & Milestones

### Phase 1: Foundation (Hours 0–6)
**Goal**: Core infrastructure ready for feature development

**Key Milestones**:
- ✅ Repos cloned and configured
- ✅ Database schema created
- ✅ API project structure established
- ✅ Frontend project scaffolded
- ✅ Qubic dev environment accessible

**Success Metrics**:
- Both backend and frontend repos can start local development
- Database migrations run successfully
- First API route responds on `localhost:3000/api/health`
- Tailwind CSS compiles and responsive grid works

---

### Phase 2: Core Development (Hours 6–30)
**Goal**: Scoring engine, APIs, and main UI pages functional

**Key Milestones**:
- ✅ Scoring service logic fully implemented
- ✅ All 5 REST endpoints working
- ✅ Dashboard and detail pages rendering
- ✅ Builder sandbox interactive
- ✅ Mock Qubic contract ready

**Success Metrics**:
- `POST /api/simulate` returns accurate scores for test projects
- Dashboard loads 10+ mock projects with sorting/filtering
- Builder Sandbox real-time score updates work correctly
- Contract compiles without errors

---

### Phase 3: Integration (Hours 30–38)
**Goal**: All components connected end-to-end

**Key Milestones**:
- ✅ Frontend calls backend successfully
- ✅ Qubic RPC integration working
- ✅ Nostromo mock UI displays scores
- ✅ Error handling and loading states in place
- ✅ Contract deployed to testnet

**Success Metrics**:
- Submit project via dashboard → see score appear
- Nostromo mock page loads scores from backend
- Contract calls from frontend work correctly
- All error states display user-friendly messages

---

### Phase 4: Testing & Optimization (Hours 38–42)
**Goal**: Bug-free, polished, production-ready

**Key Milestones**:
- ✅ Unit tests passing
- ✅ E2E tests covering critical flows
- ✅ Performance optimized
- ✅ Responsive design tested
- ✅ Security vulnerabilities addressed

**Success Metrics**:
- Zero console errors in production build
- Mobile, tablet, desktop all render correctly
- All forms handle invalid input gracefully
- API response times < 500ms

---

### Phase 5: Documentation & Submission (Hours 42–48)
**Goal**: Everything documented and submitted

**Key Milestones**:
- ✅ README and ARCHITECTURE docs complete
- ✅ Demo video recorded and uploaded
- ✅ Slide deck finalized
- ✅ Submission form filled
- ✅ All links tested and working

**Success Metrics**:
- README includes setup, features, and deployment instructions
- Video is clear, concise, and covers all key features
- Slides tell compelling story aligned with judging criteria
- Submission accepted by Lablab.ai platform

---

## 3. Day 1 (December 5) – Backend Foundation & Smart Contract

### Morning Session: Setup & Architecture (Hours 0–3)

#### Task 1.1: Repository & Environment Setup
**Objective**: Both teams have development environments ready

**What to do**:
1. Create GitHub organization for the hackathon team
2. Clone Next.js boilerplate for frontend repo
   - Follow Next.js TypeScript template
   - Install Tailwind CSS
   - Configure ESLint and Prettier
3. Clone Express/NestJS boilerplate for backend repo
   - Set up TypeScript configuration
   - Install required npm packages
   - Configure environment files (.env.example)
4. Set up development databases (local PostgreSQL or use Neon/Supabase)
   - Create hackathon DB
   - Enable connection pooling
5. Create Discord/Slack channel for team communication
6. Set up shared Figma board for UI/UX reference (optional)

**Deliverables**:
- [ ] Two public GitHub repos (front-end, back-end)
- [ ] `.env.example` files in both repos
- [ ] `.gitignore` configured (no .env, node_modules, etc.)
- [ ] Both repos have README.md stubs
- [ ] Local development can start immediately

**Completion Criteria**:
- `npm run dev` works on frontend → opens Next.js dev server on localhost:3000
- `npm run dev` works on backend → API responds to `http://localhost:4000/api/health`
- Database connection successful (test query runs)
- All team members can pull and run locally

**Success Metrics**:
- 0 environment setup failures
- All developers can start coding immediately
- Clear documentation exists for setup

---

#### Task 1.2: Qubic Testnet Access & RPC Configuration
**Objective**: Verify Qubic testnet access and RPC endpoints

**What to do**:
1. Get Qubic testnet RPC endpoint (from hackathon organizers or docs.qubic.org)
   - Testnet RPC URL (e.g., http://66.248.204.226:21841)
   - Mainnet RPC URL for reference
2. Test RPC connectivity
   - Use Postman or curl to test `GET /api/status`
   - Verify response includes chain info
3. Document RPC endpoint in `.env.example`
4. Create RPC service template in backend
   - File: `src/services/QubicRpcService.ts`
   - Initialize with endpoint from env
5. Get Qubic hackathon SDK/documentation link
   - Save links to README for future reference

**Deliverables**:
- [ ] Qubic testnet RPC URL working and documented
- [ ] RPC test successful (endpoint responds)
- [ ] Backend RPC service template created
- [ ] Qubic SDK/resources documented

**Completion Criteria**:
- RPC health check returns 200 status
- Backend can initialize RPC connection
- Team has access to Qubic documentation

**Success Metrics**:
- RPC latency < 1000ms
- No connection errors
- Clear endpoint configuration

---

### Midday Session: Backend Architecture & Database (Hours 3–8)

#### Task 1.3: Database Schema & Migrations
**Objective**: PostgreSQL schema fully designed and deployed

**What to do**:
1. Create migration files for all 5 tables (in order):
   - Projects table (id, name, description, URLs, status, timestamps)
   - Project metadata table (tokenomics data, vesting info, founder info)
   - Scores table (score, grade, subscores, timestamp)
   - Risk flags table (related to scores, text, severity)
   - Launch configs table (cap, fee tier, access tier, recommendations)
2. Define proper constraints
   - Primary keys on all tables
   - Foreign key relationships (metadata → projects, scores → projects, etc.)
   - UNIQUE constraints (one config per project)
   - CHECK constraints (score 0–100, valid statuses)
3. Create indexes on frequently queried columns
   - `projects.status` (for filtering)
   - `scores.project_id, calculated_at` (for score history)
   - `project_metadata.project_id` (for metadata lookups)
4. Set up database seeding
   - Create seed script with 5–10 mock projects
   - Include various score bands (Green, Yellow, Red)
   - Seed with realistic tokenomics data
5. Document schema in SCHEMA.md
   - ERD (Entity Relationship Diagram)
   - Table descriptions
   - Relationships explained

**Deliverables**:
- [ ] Migration files created for all tables
- [ ] Schema deployed to dev/staging database
- [ ] Seed script runs successfully
- [ ] SCHEMA.md with ERD diagram
- [ ] All constraints and indexes in place

**Completion Criteria**:
- All tables created without errors
- Foreign keys enforced
- Seed data loads (5–10 projects visible in DB)
- No migration rollback needed

**Success Metrics**:
- `SELECT * FROM projects` returns mock data
- Constraints prevent invalid data (e.g., score > 100 rejected)
- Query performance acceptable (joins < 100ms)

---

#### Task 1.4: Backend Project Structure & Core Services
**Objective**: Backend folder structure and service layer ready

**What to do**:
1. Create folder structure in `src/`
   - `middleware/` → auth.ts, errorHandler.ts, validation.ts
   - `routes/` → projects.ts, scores.ts, simulate.ts, analytics.ts
   - `services/` → ProjectService.ts, ScoringService.ts, ConfigService.ts, QubicService.ts
   - `controllers/` → ProjectController.ts, ScoreController.ts, etc.
   - `models/` → Project.ts, Score.ts, Config.ts, RiskFlag.ts (TypeScript interfaces)
   - `db/` → connection.ts, seed.ts
   - `utils/` → logger.ts, validation.ts, constants.ts
2. Create base Express app in `app.ts`
   - Initialize Express instance
   - Set up middleware (CORS, helmet, body-parser)
   - Mount routes (placeholder for now)
   - Error handling middleware
3. Set up database connection in `db/connection.ts`
   - PostgreSQL pool initialization
   - Connection test/verification
   - Logging on connect/disconnect
4. Create TypeScript interfaces in `models/`
   - `Project` interface (all fields from schema)
   - `Score` interface (score, grade, subscores, flags)
   - `Config` interface (cap, fee, tier, recommendation)
   - `RiskFlag` interface (text, severity)
   - `ScoreResult` interface (score, grade, subscores, flags, recommendation)
5. Create utility functions in `utils/`
   - Input validation helpers
   - Score formatting helpers
   - Error responses
   - Logger setup

**Deliverables**:
- [ ] Complete folder structure created
- [ ] Base Express app running on port 4000
- [ ] Database connection successful
- [ ] TypeScript models/interfaces defined
- [ ] Utility functions ready

**Completion Criteria**:
- `npm run dev` starts backend without errors
- No TypeScript compilation errors
- Database connection verified
- Request to `/api/health` returns 200

**Success Metrics**:
- Clean, organized code structure
- No unused imports
- Consistent naming conventions

---

#### Task 1.5: Implement Scoring Service (Core Logic)
**Objective**: Complete 7-dimension scoring algorithm implemented

**What to do**:
1. Create `ScoringService.ts` in `src/services/`
2. Implement 7 scoring methods (each max points indicated):
   - `scoreTokenomics(project)` → 0–20 points
     - Team allocation % (lower better)
     - Supply fairness boolean
     - Inflation clarity
   - `scoreVesting(project)` → 0–20 points
     - Team vesting duration (months)
     - Founder locks boolean
     - Release schedule clarity
   - `scoreDocumentation(project)` → 0–15 points
     - Whitepaper present
     - Clarity score
     - Roadmap specificity
   - `scoreTeamHistory(project)` → 0–15 points
     - Prior projects count
     - Track record
     - Linked wallet behavior
   - `scoreCommunity(project)` → 0–15 points
     - Social followers (Twitter, Discord)
     - GitHub activity
     - Engagement signals
   - `scoreAudit(project)` → 0–10 points
     - Audit report present
     - Bug bounty program
     - Security documentation
   - `scoreLaunchReadiness(project)` → 0–5 points
     - Legal KYC preparation
     - Compliance indicators
3. Implement `calculateCompositeScore(project)` method
   - Call all 7 methods
   - Sum subscores
   - Assign grade (Green ≥80, Yellow 60–79, Red <60)
4. Implement `generateRiskFlags(project, subscores)` method
   - Generate specific flag text for each dimension
   - Assign severity (high, medium, low)
   - Return array of risk flags
5. Implement `getRecommendation(grade)` method
   - Return human-readable recommendation
   - E.g., "Green: Safe for launch", "Yellow: Needs caution"
6. Create unit test file structure (tests not required for hackathon, but template ready)

**Deliverables**:
- [ ] ScoringService.ts fully implemented
- [ ] All 7 scoring methods functional
- [ ] Composite score calculation working
- [ ] Risk flag generation working
- [ ] Grade assignment correct

**Completion Criteria**:
- Test data runs through scoring without errors
- Score totals to 0–100 correctly
- Grades assigned correctly based on thresholds
- Risk flags generated for each dimension
- No division by zero or NaN results

**Success Metrics**:
- Test project (50% team, no vesting, docs present, small community) scores Yellow (60–79)
- Test project (10% team, 24mo vesting, full docs, active community) scores Green (80+)
- Test project (80% team, no vesting, no docs, no community) scores Red (<60)

---

### Evening Session: API Routes & Smart Contract Setup (Hours 8–14)

#### Task 1.6: Implement REST API Routes
**Objective**: All 5 core API endpoints functional and tested

**What to do**:
1. Create `routes/projects.ts`
   - `GET /api/projects` → List all projects with pagination
     - Query params: `page`, `limit`, `status`
     - Response: array of projects + total count
   - `POST /api/projects` → Submit new project
     - Body: project form data (name, URLs, team info, etc.)
     - Response: created project with ID
   - `GET /api/projects/:id` → Get project + latest score + config
     - Response: full project details + score breakdown + flags
2. Create `routes/scores.ts`
   - `POST /api/scores/:projectId` → Recalculate score for project
     - Response: new score object
   - `GET /api/scores/:projectId/history` → Score history (optional)
     - Response: array of historical scores
3. Create `routes/simulate.ts`
   - `POST /api/simulate` → Calculate score for form inputs (no DB save)
     - Body: project form data
     - Response: calculated score + flags + recommendations
4. Create `routes/analytics.ts`
   - `GET /api/analytics` → Ecosystem statistics
     - Response: score distribution, avg score, counts by grade
5. Create `middleware/auth.ts`
   - API key validation for write endpoints
   - Rate limiting setup (optional for hackathon)
6. Create `middleware/errorHandler.ts`
   - Catch all errors
   - Return consistent error format
   - Log errors with timestamp
7. Set up request logging middleware
   - Log method, path, status, response time
8. Test all endpoints with Postman/curl
   - Save Postman collection for reference

**Deliverables**:
- [ ] All 5 REST endpoints implemented
- [ ] Request/response formats consistent
- [ ] Error handling in place
- [ ] Input validation on all endpoints
- [ ] Postman collection created

**Completion Criteria**:
- `GET /api/projects` returns mock projects
- `POST /api/simulate` returns accurate scores
- `POST /api/projects` saves project to DB
- `GET /api/projects/:id` returns full details
- `GET /api/analytics` returns stats

**Success Metrics**:
- All endpoints respond < 500ms
- All error responses include message and code
- Input validation catches invalid data
- 0 unhandled errors

---

#### Task 1.7: Qubic Smart Contract Setup
**Objective**: Guardian Score contract ready for deployment

**What to do**:
1. Create contract file structure
   - File: `contracts/GuardianScore.cpp` (or similar per Qubic framework)
2. Design contract functionality:
   - **State variables**:
     - `GuardianScoreData scores[100]` → array of project scores
     - `u32 scoreCount` → current count
     - `u8 authorizedScorers[10]` → list of authorized signers
   - **Write procedures** (called by authorized user):
     - `setGuardianScore(projectId, score, grade)` → update/create score
     - `addAuthorizedScorer(publicKey)` → add new scorer
     - `pauseScoring()` / `resumeScoring()` → emergency pause
   - **Read functions** (public query):
     - `getGuardianScore(projectId)` → retrieve score
     - `canLaunchIDO(projectId)` → return true if score ≥ 60
     - `getRecommendedConfig(projectId)` → return launch params
3. Implement input validation
   - Check `score` is 0–100
   - Check `grade` is 0–2 (Green, Yellow, Red)
   - Validate `projectId` format
   - Check sender is authorized before writes
4. Create contract comments/documentation
   - Explain each procedure/function
   - Note parameter meanings
   - Document return values
5. Set up contract compilation environment
   - Install Qubic SDK/compiler
   - Test compilation without errors
6. Create deployment script
   - Script to deploy to testnet
   - Document deployment steps

**Deliverables**:
- [ ] GuardianScore.cpp fully coded
- [ ] Contract compiles without errors
- [ ] Input validation implemented
- [ ] Deployment script ready
- [ ] Contract code documented

**Completion Criteria**:
- Contract compiles cleanly
- All functions/procedures have clear signatures
- No unhandled edge cases (e.g., division by zero)
- Authorization checks in place

**Success Metrics**:
- Zero compilation warnings
- Contract size reasonable
- Input bounds checking correct

---

#### Task 1.8: Backend Testing & Validation
**Objective**: Backend API tested and validated with mock data

**What to do**:
1. Populate database with mock data
   - Run seed script with 10 mock projects
   - Verify data in DB: `SELECT * FROM projects;`
2. Test all API endpoints manually
   - Use Postman or curl to test each route
   - Verify request/response formats
   - Test error cases (invalid input, missing fields)
3. Test scoring calculation
   - Send simulate request with various project profiles
   - Verify scores calculated correctly
   - Check risk flags generated
4. Test data integrity
   - Verify constraints enforced (e.g., score < 0 rejected)
   - Verify foreign key relationships
5. Performance testing
   - Time API responses with various data sizes
   - Ensure response times acceptable
6. Document any bugs or issues
   - Create GitHub issues for bugs
   - Prioritize fixes for Day 2

**Deliverables**:
- [ ] Mock data seeded
- [ ] All endpoints respond correctly
- [ ] Error handling verified
- [ ] Postman collection with examples
- [ ] Performance metrics documented

**Completion Criteria**:
- All 5 endpoints responding
- Mock projects visible in `/api/projects`
- Score calculation accurate
- No database errors

**Success Metrics**:
- Average response time < 300ms
- Error responses clear and actionable
- 0 unexpected database errors

---

### Late Evening: Deployment Preparation (Hours 14–18)

#### Task 1.9: Backend Deployment Setup
**Objective**: Backend ready to deploy to staging environment

**What to do**:
1. Choose backend hosting platform
   - Options: Render, Fly.io, Railway, Heroku
   - Criteria: free tier, quick deployment, PostgreSQL support
2. Create deployment configuration
   - Dockerfile (if using container deployment)
   - `.env.production` template
   - Database migration scripts
3. Set up environment variables
   - Database URL (staging DB)
   - API key (for testing)
   - Qubic RPC endpoint
   - Port configuration
4. Create CI/CD pipeline (optional but recommended)
   - GitHub Actions workflow
   - Automated tests on push (minimal)
   - Auto-deploy on main branch
5. Deploy to staging
   - Push code to production branch
   - Trigger deployment
   - Verify deployed API responds
6. Document deployment process
   - Step-by-step guide
   - Troubleshooting section
   - Rollback procedure

**Deliverables**:
- [ ] Staging backend deployed and live
- [ ] Deployment documentation created
- [ ] Environment variables configured
- [ ] Deployment URL working

**Completion Criteria**:
- Deployed API responds to requests
- All endpoints work on deployed version
- Database migrations applied successfully

**Success Metrics**:
- Deployed API has < 2s response time
- 0 deployment errors
- HTTPS certificate valid

---

#### Task 1.10: End-of-Day 1 Verification
**Objective**: All Day 1 deliverables verified and tracked

**What to do**:
1. Run checklist of all Day 1 tasks
   - Mark completed items
   - Document any incomplete items
   - Note any blockers or issues
2. Verify all code is committed and pushed
   - No uncommitted changes
   - Branches merged to main
3. Create Day 2 task list
   - Prioritize based on dependencies
   - Identify critical path items
4. Document current state
   - Write summary of what's done
   - List remaining tasks
   - Note any known issues

**Deliverables**:
- [ ] Completion checklist signed off
- [ ] All code committed
- [ ] Day 2 priorities identified
- [ ] Status document created

**Completion Criteria**:
- All Day 1 tasks reviewed
- No critical blockers
- Clear handoff to Day 2

**Success Metrics**:
- ≥ 85% of Day 1 tasks completed
- 0 blocking issues
- Clear Day 2 roadmap

---

## 4. Day 2 (December 6) – Frontend Development & Integration

### Morning Session: Frontend Architecture & Core Pages (Hours 18–26)

#### Task 2.1: Frontend Project Setup & Scaffolding
**Objective**: Next.js project fully structured and ready for page development

**What to do**:
1. Initialize Next.js TypeScript project
   - Use `create-next-app` with TypeScript template
   - Install and configure Tailwind CSS
   - Set up dark mode support
2. Create folder structure
   - `src/components/` → Layout, Dashboard, Detail, Sandbox folders
   - `src/pages/` → index, launches/[id], sandbox, analytics
   - `src/hooks/` → useProjects, useScore, useSandbox
   - `src/utils/` → formatting, scoring helpers, constants
   - `src/types/` → TypeScript interfaces (Project, Score, Config)
   - `src/styles/` → CSS modules (optional, use Tailwind mostly)
3. Configure environment variables
   - Create `.env.local` with API_URL pointing to backend
   - Create `.env.example` for repo
4. Set up reusable hooks
   - `useProjects()` → fetch projects list
   - `useScore()` → fetch score for project
   - `useSimulate()` → calculate score on form change
   - Use react-query for state management
5. Set up global layout
   - Create Layout component (header, sidebar, footer)
   - Apply to all pages via `_app.tsx`
6. Configure TypeScript
   - Create `types/index.ts` with all interfaces
   - Enable strict mode

**Deliverables**:
- [ ] Next.js project scaffolded
- [ ] Tailwind CSS working
- [ ] Folder structure created
- [ ] Hooks initialized
- [ ] Layout component created

**Completion Criteria**:
- `npm run dev` starts dev server on localhost:3000
- Tailwind styles apply correctly
- No TypeScript errors
- Layout renders on all pages

**Success Metrics**:
- Clean, responsive layout visible
- No console errors
- Page loads quickly

---

#### Task 2.2: Build Dashboard Page (Project List)
**Objective**: Home page with project list, filters, and sorting

**What to do**:
1. Create `pages/index.tsx` (Dashboard landing)
2. Design page sections:
   - Hero/header with description
   - Quick stats (total projects, avg score, % green/yellow/red)
   - Project table/cards list:
     - Columns: Project name, Score, Grade (color badge), Status, Last updated, Action link
     - Mobile: Use cards instead of table
3. Implement filtering
   - Filter by score band (Green, Yellow, Red)
   - Filter by status (draft, approved, launched, failed)
   - Filter by category (optional)
4. Implement sorting
   - Sort by score (ascending/descending)
   - Sort by date (newest/oldest)
   - Sort by name (A–Z)
5. Add pagination
   - Load 10 projects per page
   - Show page navigation
6. Fetch data
   - Call `GET /api/projects` on page load
   - Handle loading state (skeleton loaders)
   - Handle error state (error message with retry)
7. Add interactivity
   - Click project row → navigate to detail page
   - Click filter → update list
   - Click sort → reorder list
8. Make responsive
   - Desktop: table layout
   - Tablet/Mobile: card layout

**Deliverables**:
- [ ] Dashboard page fully rendered
- [ ] Project list loading from API
- [ ] Filters working
- [ ] Sorting working
- [ ] Pagination working
- [ ] Responsive design verified

**Completion Criteria**:
- Mock projects visible in list
- Filters update list correctly
- Pagination works
- Mobile layout acceptable
- No console errors

**Success Metrics**:
- Page loads in < 2s
- Filters work smoothly
- Responsive on all screen sizes

---

#### Task 2.3: Build Launch Detail Page
**Objective**: Project detail page with score breakdown and risk analysis

**What to do**:
1. Create `pages/launches/[id].tsx` (Project detail)
2. Design page sections:
   - Project header (name, status badge, external links)
   - Key metrics cards (score, grade, last updated)
   - Score breakdown chart
     - Use Recharts radar chart to show all 7 dimensions
     - Show max points and earned points for each
   - Risk flags section
     - List all flags with severity colors (high=red, medium=yellow, low=blue)
     - Group by severity
   - Project details section
     - Team allocation % (pie chart)
     - Vesting timeline (if applicable)
     - Key documents (links to whitepaper, GitHub, audit)
   - Recommended config section
     - Show recommended cap, fee tier, access tier
     - Show reasoning
   - Back button or breadcrumb
3. Fetch data
   - Call `GET /api/projects/:id` on mount
   - Display full project + latest score + config
   - Handle loading state
   - Handle error state (404, etc.)
4. Add interactivity
   - External links open in new tab
   - Copy score/recommendation to clipboard (nice-to-have)
5. Make responsive
   - Charts stack on mobile
   - Text wraps properly

**Deliverables**:
- [ ] Detail page template created
- [ ] Score breakdown chart rendering
- [ ] Risk flags displayed
- [ ] Data loading from API
- [ ] Responsive layout

**Completion Criteria**:
- Project details visible
- Score chart renders without errors
- All risk flags showing
- Mobile layout acceptable
- No API errors

**Success Metrics**:
- Chart renders correctly
- All data sections visible
- Fast page load

---

#### Task 2.4: Build Builder Sandbox Page
**Objective**: Interactive project simulator for builders

**What to do**:
1. Create `pages/sandbox.tsx` (Builder simulator)
2. Design form inputs (left side of page):
   - Text inputs: project name, description
   - Number inputs: team allocation %, team vesting months
   - Checkbox: has founder locks
   - Select: documentation level (1–5 scale)
   - Number: social followers (Twitter + Discord sum)
   - Number: GitHub activity (commits/week)
   - Checkbox: audit present
   - Checkbox: bug bounty program active
3. Design real-time score display (right side or below):
   - Large score number (0–100) with grade badge
   - Subscore bars for each of 7 dimensions
   - Color-coded based on subscore (green/yellow/red)
4. Implement "What to Improve" checklist:
   - Dynamic list of actionable improvements
   - Sorted by impact (high to low)
   - E.g., "Reduce team allocation by 5% to gain +10 points"
   - E.g., "Add vesting schedule to gain +15 points"
5. Implement "Current vs. Target" comparison (nice-to-have):
   - Show current score vs. ideal score (80)
   - Show gap and how to close it
6. Add export functionality
   - Button: "Export recommendation"
   - Download as PDF or JSON
7. Implement real-time calculation
   - On each form change, call `POST /api/simulate`
   - Update score display immediately
   - Show loading state briefly
8. Make responsive
   - Desktop: form left, score right
   - Mobile: form top, score bottom

**Deliverables**:
- [ ] Sandbox form created
- [ ] All inputs functional
- [ ] Score calculation on change
- [ ] Checklist generation working
- [ ] Export button implemented

**Completion Criteria**:
- Form inputs update score in real-time
- Checklist shows actionable items
- Export creates valid file
- No lag on input change

**Success Metrics**:
- Score updates within 200ms of input
- Checklist items are accurate
- Export file is readable

---

### Midday Session: Analytics & Nostromo Integration (Hours 26–34)

#### Task 2.5: Build Analytics Page
**Objective**: Ecosystem statistics and trends visualization

**What to do**:
1. Create `pages/analytics.tsx` (Ecosystem analytics)
2. Design sections:
   - Overview cards
     - Total projects
     - Average score
     - % Green/Yellow/Red distribution
   - Score distribution chart
     - Histogram showing number of projects at each score
     - Bin size: 10 points (0–10, 10–20, etc.)
   - Grade breakdown pie chart
     - 3 slices: Green, Yellow, Red with counts
   - Trends (optional)
     - Score trend over time (if historical data exists)
     - Average score trend
   - Category breakdown (if applicable)
     - Bar chart of avg score by category (DeFi, Payments, Infra, etc.)
3. Fetch analytics data
   - Call `GET /api/analytics` on page load
   - Display aggregated statistics
4. Add filters (optional)
   - Filter by date range
   - Filter by category
5. Make responsive
   - Charts stack on mobile
   - Legend readable on small screens

**Deliverables**:
- [ ] Analytics page template
- [ ] All charts rendering
- [ ] Data loading from API
- [ ] Responsive layout

**Completion Criteria**:
- Dashboard stats visible
- Charts display correctly
- No render errors
- Mobile layout works

**Success Metrics**:
- Charts are visually clear
- Data loads without errors
- Performance acceptable

---

#### Task 2.6: Create Nostromo Integration Layer
**Objective**: Mock Nostromo launchpad UI showing Guardian scores

**What to do**:
1. Create component `components/Nostromo/NostromoLaunchpad.tsx`
   - Display a mock Nostromo-style launchpad UI
   - Show project pools available for IDO
2. Design pool cards:
   - Project name, logo (mock)
   - Guardian score (fetched from API)
   - Grade badge (Green/Yellow/Red)
   - 2–3 key risk tags
   - Recommended cap and fee
   - Progress bar (optional)
   - "View Details" link
3. Implement pool list
   - Fetch projects from API
   - Call `/api/projects/:id` for each to get score
   - Display in grid/list format
4. Add filters
   - Filter by grade (Green only, all, etc.)
   - Filter by status
5. Design visual feedback
   - Green pools highlighted as "safe"
   - Yellow pools have warning icon
   - Red pools have warning label
6. Create mock integration page
   - Option 1: New page `/nostromo` showing mock launchpad
   - Option 2: Component embedded in dashboard as preview
7. Add "Learn More" link
   - Links to Guardian detail page for each project

**Deliverables**:
- [ ] Nostromo component created
- [ ] Mock launchpad UI rendered
- [ ] Scores fetched and displayed
- [ ] Integration with dashboard
- [ ] Responsive design

**Completion Criteria**:
- Projects displayed with scores
- Scores match API data
- Grade badges show correctly
- Risk tags visible
- No console errors

**Success Metrics**:
- Scores update when backend changes
- UI clearly shows Guardian integration
- Mobile layout acceptable

---

#### Task 2.7: Frontend API Integration Testing
**Objective**: All frontend pages connected to backend API

**What to do**:
1. Verify all API calls working
   - Dashboard calls `GET /api/projects`
   - Detail page calls `GET /api/projects/:id`
   - Sandbox calls `POST /api/simulate`
   - Analytics calls `GET /api/analytics`
2. Test error handling
   - Simulate backend down
   - Verify error messages display
   - Test retry functionality
3. Test loading states
   - Verify skeleton loaders show while fetching
   - Verify content appears when data loaded
4. Test edge cases
   - Empty project list
   - Very large project names
   - Missing optional fields
5. Test performance
   - Measure page load time
   - Measure API response times
   - Identify slow spots
6. Browser compatibility testing
   - Test on Chrome, Firefox, Safari (if possible)
   - Test on mobile browser

**Deliverables**:
- [ ] All API calls working
- [ ] Error handling tested
- [ ] Loading states verified
- [ ] Edge cases handled
- [ ] Performance acceptable

**Completion Criteria**:
- All pages load data successfully
- No unhandled errors
- Pages responsive on all devices
- No missing data

**Success Metrics**:
- Dashboard loads in < 2s
- Detail page loads in < 1s
- 0 API errors
- 0 console errors

---

### Afternoon Session: Integration & Polish (Hours 34–40)

#### Task 2.8: Implement Error Handling & Loading States
**Objective**: Graceful error handling and visual feedback throughout

**What to do**:
1. Create error boundary component
   - Wraps page content
   - Catches rendering errors
   - Shows error message with reload button
2. Implement loading skeletons
   - Create skeleton components for each content type
   - Show skeleton while data loads
   - Fade to content when ready
3. Add error messages
   - API errors: "Failed to load projects. Please try again."
   - Network errors: "No internet connection"
   - 404 errors: "Project not found"
   - 500 errors: "Server error, please try again"
4. Add retry functionality
   - Button to retry failed API calls
   - Automatically retry after delay (exponential backoff)
5. Add empty states
   - "No projects found" when list is empty
   - Suggestion to create first project
6. Add timeout handling
   - Assume API call failed after 10s timeout
   - Show timeout message

**Deliverables**:
- [ ] Error boundary implemented
- [ ] Loading skeletons created
- [ ] Error messages defined
- [ ] Retry functionality working
- [ ] Empty states designed

**Completion Criteria**:
- All error scenarios handled gracefully
- User gets clear feedback
- No white-screen-of-death errors
- Retry works correctly

**Success Metrics**:
- All error messages user-friendly
- 0 unhandled errors
- Recovery is quick

---

#### Task 2.9: Responsive Design & Mobile Testing
**Objective**: Perfect mobile, tablet, and desktop experience

**What to do**:
1. Test on breakpoints
   - Mobile: 320px, 375px, 425px
   - Tablet: 768px, 1024px
   - Desktop: 1280px, 1920px
2. Verify layout responsive
   - No horizontal scrolling on mobile
   - Text readable on small screens
   - Touch targets ≥ 44px on mobile
3. Test navigation on mobile
   - Hamburger menu (if using)
   - Breadcrumbs work
   - Back button works
4. Test forms on mobile
   - Inputs have enough padding
   - Dropdown menus work
   - Submit button tappable
5. Test charts on mobile
   - Charts stack vertically
   - Legend readable
   - No data overlap
6. Optimize images (if any)
   - Compress images
   - Use responsive image sizes
7. Test touch interactions
   - All buttons/links tappable
   - No accidental double-taps
8. Performance on mobile
   - Use browser DevTools throttling
   - Ensure acceptable performance on 3G

**Deliverables**:
- [ ] Mobile layout tested
- [ ] Tablet layout tested
- [ ] Desktop layout verified
- [ ] All breakpoints working
- [ ] No responsive issues logged

**Completion Criteria**:
- Looks good on all screen sizes
- No horizontal scrolling
- Touch-friendly on mobile
- Fast load on slow networks

**Success Metrics**:
- Mobile Lighthouse score ≥ 80
- All content accessible
- No layout shifts

---

#### Task 2.10: Accessibility & UX Polish
**Objective**: Accessible, polished user experience

**What to do**:
1. Keyboard navigation
   - Tab through form fields
   - Enter submits forms
   - Escape closes modals
2. Color contrast
   - Verify text contrast ≥ 4.5:1 for normal text
   - Verify 3:1 for large text
   - Use axe DevTools extension to check
3. ARIA labels
   - Add aria-labels to icon buttons
   - Add aria-labels to form inputs
   - Add aria-live regions for dynamic content updates
4. Focus indicators
   - Ensure focused elements have clear visual indicator
   - Visible focus ring on all interactive elements
5. Semantic HTML
   - Use proper HTML tags (button, a, form, etc.)
   - Use heading hierarchy correctly
6. Visual polish
   - Consistent spacing between elements
   - Smooth transitions/animations
   - Hover states on interactive elements
   - Consistent typography
7. Copy/text
   - Correct spelling and grammar
   - Clear, concise labels
   - Helpful error messages

**Deliverables**:
- [ ] Keyboard navigation verified
- [ ] Color contrast compliant
- [ ] ARIA labels added
- [ ] Focus indicators visible
- [ ] Semantic HTML used

**Completion Criteria**:
- Tab navigation works
- All colors have sufficient contrast
- Screen readers can navigate
- No accessibility warnings

**Success Metrics**:
- Axe accessibility audit ≥ 95% pass
- Keyboard navigation smooth
- Focus indicators clear

---

### Late Afternoon: Qubic & Smart Contract Integration (Hours 40–46)

#### Task 2.11: Deploy Smart Contract to Testnet
**Objective**: Guardian Score contract deployed and callable

**What to do**:
1. Prepare contract for deployment
   - Final compile check
   - Verify no errors/warnings
   - Review contract code one more time
2. Get testnet credentials
   - Get Qubic testnet account (from hackathon)
   - Ensure account has testnet tokens
3. Deploy contract
   - Follow Qubic deployment guide
   - Run deployment script
   - Note contract address
4. Verify deployment
   - Query contract status on testnet
   - Call read functions to verify
   - Document contract address
5. Update backend config
   - Set `GUARDIAN_CONTRACT_ADDRESS` env var
   - Point to deployed contract address
6. Update frontend config
   - Set `REACT_APP_GUARDIAN_CONTRACT_ADDRESS` if needed
7. Create deployment documentation
   - Record contract address
   - Document deployment date/time
   - Note any issues encountered

**Deliverables**:
- [ ] Contract deployed to testnet
- [ ] Deployment verified
- [ ] Contract address documented
- [ ] Environment variables updated
- [ ] Deployment logs saved

**Completion Criteria**:
- Contract deployed without errors
- Read functions callable
- Contract state accessible

**Success Metrics**:
- Contract address active on testnet
- Deployment successful
- No rollback needed

---

#### Task 2.12: Integrate Smart Contract with Backend
**Objective**: Backend can read/write to Guardian contract

**What to do**:
1. Create QubicService in backend
   - File: `src/services/QubicService.ts`
   - Initialize with testnet RPC
2. Implement contract read functions
   - `getGuardianScore(projectId)` → call contract, return score
   - `canLaunchIDO(projectId)` → call contract, return boolean
   - `getRecommendedConfig(projectId)` → call contract, return config
3. Implement contract write functions (admin only)
   - `setGuardianScore(projectId, score, grade)` → write to contract
   - Handle transaction signing
   - Handle gas/fees
4. Create API endpoint for contract interaction
   - `GET /api/contract/score/:projectId` → get score from contract
   - `POST /api/contract/set-score` (admin) → write score to contract
5. Add error handling
   - Contract not found
   - RPC connection failure
   - Invalid transaction response
6. Add logging
   - Log all contract calls
   - Log transaction hashes
7. Test contract calls
   - Call contract read functions
   - Verify responses match backend data

**Deliverables**:
- [ ] QubicService implemented
- [ ] Read functions working
- [ ] API endpoints created
- [ ] Error handling in place
- [ ] Tested with live contract

**Completion Criteria**:
- Contract calls successful
- Data flows correctly
- No transaction failures

**Success Metrics**:
- Contract queries return valid data
- 0 RPC errors
- Latency < 2s per call

---

#### Task 2.13: Frontend Smart Contract Integration (Read-Only)
**Objective**: Frontend can display data from smart contract

**What to do**:
1. Create QubicService in frontend
   - File: `src/services/QubicService.ts`
   - Initialize with testnet RPC
2. Implement read functions
   - `getGuardianScore(projectId)` → fetch from backend `/api/contract/score/:projectId`
   - Alternatively, call contract directly via RPC (if simpler)
3. Create hook for contract data
   - `useGuardianScore(projectId)` → fetch and cache score
4. Display contract data on UI
   - On detail page: show score from contract (in addition to DB score)
   - Add label: "On-chain score verified ✓" if match
   - Handle mismatch gracefully (show both)
5. Error handling
   - Contract unreachable
   - Data mismatch between DB and contract
6. Add "View on Explorer" link
   - Link to Qubic block explorer for contract
   - Show transaction hash

**Deliverables**:
- [ ] QubicService created in frontend
- [ ] Contract data displayed
- [ ] Read hook implemented
- [ ] Error handling working
- [ ] Explorer links added

**Completion Criteria**:
- Contract data displays on UI
- No console errors
- Loading states work

**Success Metrics**:
- Contract data matches backend
- Display is clear and intuitive
- Links work correctly

---

#### Task 2.14: End-of-Day 2 Verification & Integration Test
**Objective**: All Day 2 components integrated and working together

**What to do**:
1. Run full end-to-end flow
   - Submit project via frontend
   - Backend receives and scores it
   - Score saved to DB
   - Score visible on detail page
   - Score readable from contract
2. Test across all pages
   - Dashboard: projects load, filters work
   - Detail page: full details visible, contract score shows
   - Sandbox: real-time simulation works
   - Analytics: stats display
   - Nostromo: integration looks good
3. Test on mobile
   - All pages responsive
   - No layout issues
   - Performance acceptable
4. Identify and log remaining bugs
   - Create GitHub issues
   - Prioritize for Day 3
5. Document state
   - Checklist of completed items
   - List of known issues
   - Day 3 priorities

**Deliverables**:
- [ ] Full integration tested
- [ ] All pages working
- [ ] Mobile verified
- [ ] Bugs documented
- [ ] Status report created

**Completion Criteria**:
- End-to-end flow works
- No critical bugs blocking
- Majority of features working
- Clear path to completion

**Success Metrics**:
- ≥ 90% features working
- 0 critical bugs
- Mobile experience acceptable

---

## 5. Day 3 (December 7) – Testing, Polish & Submission

### Morning Session: Quality Assurance & Bug Fixes (Hours 46–52)

#### Task 3.1: Comprehensive Testing & Bug Fixes
**Objective**: Production-quality code with minimal bugs

**What to do**:
1. Run automated tests (if created)
   - Jest tests for backend services
   - React Testing Library for components
   - Fix any failing tests
2. Manual testing checklist
   - Test every user flow
   - Test every form
   - Test every link
   - Test every API endpoint
3. Browser testing
   - Chrome, Firefox, Safari, Edge
   - Verify consistency
   - Fix browser-specific issues
4. Performance testing
   - Measure page load times
   - Measure API response times
   - Optimize slow endpoints (caching, etc.)
5. Security testing
   - Check for XSS vulnerabilities
   - Check for SQL injection (if applicable)
   - Verify API authentication
   - Check for exposed secrets
6. Bug prioritization
   - Critical: blocks core functionality
   - High: affects user experience
   - Medium: minor issues
   - Low: cosmetic
7. Fix bugs in priority order
   - Fix critical bugs first
   - Fix high-impact bugs
   - Note remaining bugs for documentation

**Deliverables**:
- [ ] Test cases executed
- [ ] All critical bugs fixed
- [ ] Browser compatibility verified
- [ ] Performance acceptable
- [ ] Security checks passed

**Completion Criteria**:
- Zero critical bugs
- Zero unhandled errors
- All pages load and function
- No console errors

**Success Metrics**:
- All flows complete successfully
- Page load < 2s
- 0 crashes

---

#### Task 3.2: Code Quality & Documentation
**Objective**: Clean, well-documented, production-ready code

**What to do**:
1. Code cleanup
   - Remove console.log statements (except error logs)
   - Remove commented-out code
   - Remove unused imports/variables
   - Fix linting errors
2. Add code comments
   - Complex algorithms: explain logic
   - Non-obvious solutions: explain why
   - API responses: explain structure
   - Smart contract: explain procedures
3. Create README.md (if not done)
   - Project description
   - Problem and solution
   - Feature list
   - Tech stack
   - Setup instructions (local dev)
   - Deployment instructions
   - API documentation (endpoints, example requests)
   - Environment variables
   - Known issues/limitations
4. Create ARCHITECTURE.md
   - System diagram (ASCII or image)
   - Component descriptions
   - Data flow diagram
   - Technology choices and rationale
5. Update .env.example
   - List all required environment variables
   - Add descriptions
6. Add GitHub repo description and topics
   - Clear project description
   - Tags: qubic, hackathon, launchpad, ai, scoring, etc.

**Deliverables**:
- [ ] Code cleaned up
- [ ] Comments added
- [ ] README complete
- [ ] ARCHITECTURE.md created
- [ ] .env.example updated

**Completion Criteria**:
- No lint errors
- Code is readable
- Documentation is clear
- All files well-commented

**Success Metrics**:
- Clean git history
- No TODO comments left
- Documentation complete

---

### Late Morning: Demo & Video Preparation (Hours 52–58)

#### Task 3.3: Prepare 5-Minute Demo Script & Recording
**Objective**: Compelling, clear 5-minute demo video

**What to do**:
1. Write demo script (3–4 min script = ~5 min video with pauses)
   - Opening (15 sec): Introduce yourself and project
   - Problem (30 sec): What problem are we solving?
   - Solution (1 min): What is Nostromo Guardian? How does it work?
   - Demo part 1 (1 min): Dashboard walkthrough
     - Show project list
     - Show filtering/sorting
     - Click on a project to show detail
   - Demo part 2 (1 min): Builder Sandbox
     - Show project form
     - Adjust parameters
     - Show score change in real-time
   - Demo part 3 (45 sec): Nostromo integration
     - Show mock launchpad
     - Show how Guardian scores appear
     - Explain impact
   - Demo part 4 (30 sec): Smart contract
     - Show contract code (quick)
     - Explain on-chain integration
   - Closing (30 sec): Explain business model and roadmap
2. Record demo
   - Screen recording tool: OBS, ScreenFlow, or Loom
   - Record at 1920x1080, 60fps (or similar)
   - Clear audio, speak clearly
   - Natural pace, not too fast
3. Record script sections separately
   - Record demo + narration sections separately
   - Easier to redo problematic sections
4. Edit video
   - Combine sections
   - Add intro/outro (optional)
   - Add captions (nice-to-have)
   - Adjust volume levels
   - Keep final video < 5:00
5. Upload to YouTube
   - Set to unlisted (only accessible via link)
   - Add title and description
   - Note any important details
6. Test video
   - Watch full video
   - Verify audio clarity
   - Verify content complete
   - Verify YouTube link works

**Deliverables**:
- [ ] Demo script written
- [ ] Demo video recorded
- [ ] Video edited
- [ ] Video uploaded to YouTube
- [ ] YouTube link tested

**Completion Criteria**:
- Video < 5:00 duration
- Audio clear and audible
- All demo sections present
- No technical glitches visible

**Success Metrics**:
- Professional quality
- Compelling narrative
- Technical accuracy
- Engaging presentation

---

#### Task 3.4: Prepare Slide Deck
**Objective**: 8–12 slide presentation for judges

**What to do**:
1. Create slide structure (suggested 10 slides):
   - Slide 1: Title (Project name, team name, date)
   - Slide 2: Problem (What problem are we solving?)
   - Slide 3: Solution (What is Nostromo Guardian?)
   - Slide 4: Core features (Scoring, Dashboard, Sandbox, Contract)
   - Slide 5: User personas (Investors, Builders, DAO)
   - Slide 6: Tech stack (Frontend, Backend, Blockchain)
   - Slide 7: Qubic integration (Why Qubic? How does it fit?)
   - Slide 8: Business model (Revenue, market size, go-to-market)
   - Slide 9: Roadmap (Phase 1, 2, 3 – 6mo, 1yr, 2yr)
   - Slide 10: Team (Names, roles, brief bios)
   - Slide 11 (optional): Demo video link
   - Slide 12 (optional): Q&A / Call to action
2. Design slides
   - Use consistent template (Figma, PowerPoint, Keynote, Canva)
   - Use Qubic brand colors or Guardian brand colors
   - Keep text minimal (speak to explain)
   - Use visuals/icons where possible
   - Make readable (large fonts, good contrast)
3. Craft narrative
   - Build compelling story
   - Lead with customer value
   - Technical details secondary
   - End with inspiring vision
4. Add data/charts
   - Market size estimate
   - Scoring methodology diagram
   - System architecture diagram (simplified)
   - Revenue model breakdown
5. Create PDF export
   - Export from design tool as PDF
   - Verify formatting intact
   - Upload to Google Drive or similar
6. Practice presentation
   - Read through slides
   - Time presentation (target: 4–5 min)
   - Prepare for Q&A

**Deliverables**:
- [ ] 10–12 slides created
- [ ] Story arc clear
- [ ] Visuals compelling
- [ ] PDF exported and shared
- [ ] Presentation timed

**Completion Criteria**:
- Slides tell clear story
- No spelling/grammar errors
- Visuals professional
- Timing under 5 min

**Success Metrics**:
- Judges understand problem and solution
- Slides are memorable
- Technical accuracy
- Engaging presentation

---

### Midday: Final Documentation & Submission Prep (Hours 58–62)

#### Task 3.5: Create Comprehensive Project Documentation
**Objective**: All documentation complete and polished

**What to do**:
1. Update README.md (if needed)
   - Add "Quick Start" section
   - Add "Feature Overview" with screenshots/GIFs
   - Add "Architecture" section (link to ARCHITECTURE.md)
   - Add "Contributing" section
   - Add "License" section
   - Add "Contact" section
2. Create ARCHITECTURE.md (if not done)
   - System diagram (text-based ASCII or image)
   - Component descriptions
   - Data flow explanation
   - Technology rationale
3. Create API.md (optional but helpful)
   - All endpoints listed
   - Request/response examples
   - Error codes explained
4. Create SECURITY.md
   - Security considerations
   - Input validation approach
   - API authentication
   - Smart contract security measures
   - Known limitations
5. Create DEPLOYMENT.md
   - Step-by-step deployment guide
   - Environment variables
   - Database setup
   - Contract deployment
   - Troubleshooting section
6. Create INSTALLATION.md
   - Prerequisites (Node, PostgreSQL, etc.)
   - Clone repo
   - Install dependencies
   - Set up environment
   - Run locally
   - Test
7. Add images/diagrams
   - Screenshot of dashboard
   - Screenshot of sandbox
   - Architecture diagram
   - Data flow diagram
8. Review all docs
   - Spelling/grammar check
   - Broken links check
   - Accurate information

**Deliverables**:
- [ ] README complete
- [ ] ARCHITECTURE.md created
- [ ] API.md created (optional)
- [ ] SECURITY.md created
- [ ] DEPLOYMENT.md created
- [ ] INSTALLATION.md created
- [ ] All docs linked

**Completion Criteria**:
- All docs comprehensive
- No broken links
- Clear and easy to follow
- Professional appearance

**Success Metrics**:
- Judges can set up locally from docs
- Clear explanation of architecture
- Security considerations documented

---

#### Task 3.6: Prepare Submission Package
**Objective**: All required files ready for Lablab.ai submission

**What to do**:
1. Verify GitHub repo
   - Public repo with all code
   - Clear folder structure
   - All docs present
   - No API keys/secrets in repo
   - .gitignore properly configured
2. Test deployed links
   - Frontend deployment link (Vercel)
   - Backend API deployment link (Render/Fly.io)
   - Both respond correctly
   - HTTPS working
3. Test demo video link
   - YouTube unlisted video
   - Video plays properly
   - Audio clear
   - No copyright issues
4. Test slide deck link
   - PDF accessible
   - Renders properly
   - Easy to download
5. Gather team information
   - Team name
   - Member names
   - Member emails
   - Member GitHub links (optional)
   - Team photo (nice-to-have)
6. Write submission description
   - 150–300 words
   - Clear problem statement
   - Solution overview
   - Why Qubic?
   - Why hackathon will love this?
7. Create submission checklist
   - GitHub repo link
   - Frontend deployment URL
   - Backend deployment URL
   - Demo video YouTube link
   - Slide deck PDF link
   - All links tested
   - All team info ready

**Deliverables**:
- [ ] GitHub repo final
- [ ] Deployments tested
- [ ] Demo video ready
- [ ] Slides finalized
- [ ] Submission description written
- [ ] Checklist complete

**Completion Criteria**:
- All links working
- No broken references
- All files accessible
- Submission package complete

**Success Metrics**:
- 0 dead links
- Quick access to all materials
- Professional presentation

---

### Afternoon: Final Testing & Submission (Hours 62–68)

#### Task 3.7: Full System Integration Test
**Objective**: Entire application tested end-to-end one final time

**What to do**:
1. Test complete user journey
   - Landing page loads
   - Dashboard shows projects
   - Filter/sort works
   - Click project → detail page loads
   - Detail page shows score + contract data
   - Navigate to sandbox
   - Fill form → score updates
   - Export recommendation works
   - Navigate to analytics → stats load
   - Navigate to Nostromo → scores show
2. Test API endpoints
   - All 5 endpoints tested
   - Requests and responses valid
   - Error handling works
   - Performance acceptable
3. Test smart contract
   - Read functions work
   - Write functions (admin) work
   - Contract state consistent
4. Test on multiple devices
   - Desktop (Chrome, Firefox)
   - Tablet (iPad or equivalent)
   - Mobile (iPhone or Android)
5. Test error scenarios
   - Backend down → error message shows
   - Network timeout → error message shows
   - Invalid input → validation error shows
   - 404 error → handled gracefully
6. Final code review
   - No console errors
   - No unhandled promise rejections
   - No memory leaks
   - Clean code standards met

**Deliverables**:
- [ ] All journeys tested
- [ ] All endpoints working
- [ ] All devices tested
- [ ] Error scenarios handled
- [ ] Zero critical issues

**Completion Criteria**:
- Complete user flow works
- No crashes
- No unhandled errors
- Acceptable performance

**Success Metrics**:
- End-to-end success
- All features functional
- Professional quality
- Ready for judges

---

#### Task 3.8: Pre-Submission Quality Gate
**Objective**: Final verification before submission

**What to do**:
1. Code quality check
   - No TODO comments
   - No console.log() (except debug in dev)
   - No commented-out code
   - No unused imports
   - Linting passes
2. Security check
   - No API keys in code
   - No secrets in .env (only examples in .env.example)
   - Input validation in place
   - No obvious vulnerabilities
3. Documentation check
   - README complete
   - Setup instructions clear
   - Architecture documented
   - All links working
   - No typos
4. Performance check
   - Page load < 2s
   - API response < 500ms
   - No N+1 queries
   - Images optimized
5. Compatibility check
   - Works on Chrome, Firefox
   - Responsive on mobile
   - No browser console errors
6. Deployment check
   - Frontend deploys cleanly
   - Backend deploys cleanly
   - All env vars set
   - Database migrations run
   - Contract deployed successfully
7. Submission materials check
   - Video: clear, complete, < 5:00
   - Slides: professional, compelling
   - Links: all working
   - Description: clear and complete

**Deliverables**:
- [ ] Quality gate checklist
- [ ] All items verified
- [ ] Issues resolved
- [ ] Ready to submit

**Completion Criteria**:
- Quality gate passed
- No blockers identified
- Submission-ready

**Success Metrics**:
- 100% quality gate pass
- All systems go
- Confidence high

---

#### Task 3.9: Submit to Lablab.ai
**Objective**: Project successfully submitted before deadline

**What to do**:
1. Go to Lablab.ai hackathon page
   - Find "Qubic | Hack the Future" event
   - Find "Submit a solution" button
2. Fill out submission form
   - Project title: "Nostromo Guardian: Dynamic Risk Scoring for Qubic Launches"
   - Track: "Nostromo Launchpad"
   - Description (150–300 words): Clear, compelling, why it's great
   - GitHub link: Public repo
   - Live frontend URL: Vercel deployment
   - Live backend URL: Render/Fly.io deployment
   - Demo video: YouTube link
   - Slide deck: PDF link (Google Drive or similar)
   - Team member names, emails
   - Any additional comments
3. Review form one more time
   - All fields complete
   - No typos
   - Links correct
   - Description compelling
4. Submit form
   - Click "Submit"
   - Verify submission received (email confirmation or receipt page)
5. Document submission
   - Screenshot confirmation page
   - Save submission link
   - Record submission time

**Deliverables**:
- [ ] Submission form filled
- [ ] All fields complete
- [ ] Links verified
- [ ] Form submitted
- [ ] Confirmation received

**Completion Criteria**:
- Submission accepted by Lablab.ai
- Confirmation email received
- Submission visible on platform

**Success Metrics**:
- On-time submission
- All materials accessible
- Judges can view everything
- No submission errors

---

#### Task 3.10: Post-Submission Activities
**Objective**: Prepare for judging and gather final materials

**What to do**:
1. Share project with team
   - Celebrate submission!
   - Create short summary of what you built
2. Prepare for live judging (if applicable)
   - Practice 5-min presentation
   - Prepare Q&A answers
   - Document edge cases/known issues
   - Create backup explanation for any failed demos
3. Share on social media (optional)
   - Tweet about project
   - Tag @qubic and @lablab.ai
   - Link to submission
4. Gather feedback
   - Get early feedback from friends/advisors
   - Note any UX issues
   - Plan improvements post-hackathon
5. Document lessons learned
   - What went well?
   - What could be improved?
   - What would you do differently?
   - Tech choices to revisit?
6. Plan next steps (if winning/interested in continuing)
   - Production readiness checklist
   - Scalability considerations
   - Team expansion plan
   - Fundraising plan

**Deliverables**:
- [ ] Submission confirmed
- [ ] Team celebration
- [ ] Presentation practiced
- [ ] Social media posted
- [ ] Lessons documented

**Completion Criteria**:
- Submission complete
- Team ready for judging
- Artifacts well-positioned

**Success Metrics**:
- Successful submission
- Team confidence high
- Social media buzz
- Ready for judging phase

---

## 6. Parallel Workstreams & Coordination

### Daily Standup Meeting
**When**: Every morning (10 min)
**Attendees**: Entire team
**Topics**:
- What was completed yesterday?
- What are today's priorities?
- Any blockers or issues?
- Need help with anything?

### Communication Channels
- **Discord/Slack**: Daily updates, quick questions
- **GitHub**: Code commits, issues, pull requests
- **Email**: For meeting summaries, documentation
- **Shared spreadsheet**: Track tasks and status

### Task Dependencies
```
Day 1:
├─ Database schema (blocks API development)
├─ Scoring service (blocks endpoint implementation)
├─ Smart contract stub (can proceed in parallel)
└─ Backend deployment (depends on API endpoints)

Day 2:
├─ Dashboard page (depends on API endpoints)
├─ Detail page (depends on API endpoints)
├─ Sandbox (depends on API endpoints)
├─ Contract integration (depends on deployed contract)
└─ Frontend deployment (depends on all pages)

Day 3:
├─ Testing & bug fixes (depends on all features)
├─ Documentation (can start anytime, depends on final features)
├─ Demo video (depends on working app)
├─ Slide deck (can start anytime)
└─ Submission (depends on all above)
```

### Parallel Work Opportunities
- **Frontend team** can work on components while backend team builds APIs
- **One person** can write documentation while others code
- **One person** can prepare demo script while others finish features
- **One person** can create slides while others test
- **Deploy to staging** while continuing development

---

## 7. Quality Assurance & Testing Strategy

### Testing Levels

#### Unit Tests (Backend)
- ScoringService methods
- ConfigService mapping logic
- Input validation functions
- Utility functions

**Approach**: Jest framework
**Critical functions**:
- Scoring calculation (test multiple scenarios)
- Risk flag generation (test each dimension)
- Grade assignment (test thresholds)

#### Integration Tests (Backend)
- API endpoints with database
- Contract interaction (read/write)
- Error handling

**Approach**: Supertest + Jest
**Critical flows**:
- Create project → score → store → retrieve
- Contract read/write operations

#### Component Tests (Frontend)
- Form inputs and submission
- Data loading and display
- Error handling

**Approach**: React Testing Library
**Critical components**:
- Dashboard filters/sorting
- Sandbox form and real-time updates
- Detail page data display

#### End-to-End Tests
- Complete user journey
- Mobile responsiveness
- Cross-browser compatibility

**Approach**: Manual testing + Playwright (if time)
**Critical paths**:
- Submit project → see on dashboard → view details
- Filter/sort projects
- Use builder sandbox
- View on Nostromo mock

### Test Coverage Goals
- Backend scoring: 100% coverage
- API endpoints: 90% coverage
- Frontend critical paths: 80% coverage
- Overall: ≥ 85% coverage

### Bug Severity Classification
- **Critical**: Breaks core functionality, crash, data loss
- **High**: Major feature broken, poor UX, security issue
- **Medium**: Minor feature issue, workaround exists
- **Low**: Cosmetic, typo, nice-to-have improvement

### Testing Checklist
- [ ] All API endpoints respond correctly
- [ ] Form validation works
- [ ] Error messages display
- [ ] Loading states show
- [ ] Data persists correctly
- [ ] Mobile layout works
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Security checks pass

---

## 8. Security Implementation Checklist

### Backend Security

#### Input Validation
- [ ] All form inputs validated
- [ ] API request bodies validated with Joi/Zod
- [ ] URL parameters validated
- [ ] No unexpected fields accepted
- [ ] File uploads validated (size, type)

#### API Security
- [ ] API key required for write endpoints
- [ ] Rate limiting implemented (optional)
- [ ] CORS configured properly
- [ ] Helmet.js headers set
- [ ] HTTPS enforced in production
- [ ] No sensitive data in logs

#### Database Security
- [ ] SQL injection prevention (parameterized queries)
- [ ] Sensitive fields encrypted (if applicable)
- [ ] Regular backups enabled
- [ ] Connection pooling configured
- [ ] Database access restricted
- [ ] Audit logging (optional)

#### Environment & Secrets
- [ ] .env not in version control
- [ ] .gitignore properly configured
- [ ] Secrets managed via environment variables
- [ ] API keys rotated before submission
- [ ] No hardcoded credentials
- [ ] .env.example has safe defaults

### Smart Contract Security

#### Access Control
- [ ] Only authorized accounts can write
- [ ] Authorization checks before state changes
- [ ] Multi-sig for critical operations (optional)
- [ ] Emergency pause functionality

#### Input Validation
- [ ] Score bounded (0–100)
- [ ] Grade bounded (0–2)
- [ ] ProjectId validated
- [ ] Array bounds checked

#### State Management
- [ ] No integer overflow/underflow
- [ ] State changes atomic
- [ ] No reentrancy vulnerabilities
- [ ] Immutable audit trail (append-only)

#### Testing
- [ ] Contract tested with valid inputs
- [ ] Contract tested with invalid inputs
- [ ] Contract tested with edge cases
- [ ] No unexpected state changes

### Frontend Security

#### Input Sanitization
- [ ] User input escaped before display (React default)
- [ ] No innerHTML usage with user data
- [ ] Links validated before opening
- [ ] Images validated

#### API Security
- [ ] API responses validated before use
- [ ] Errors don't leak sensitive info
- [ ] Secure headers set (no mixed content)
- [ ] Tokens not stored in localStorage
- [ ] Cookie flags set (httpOnly, secure, samesite)

#### Code Security
- [ ] No sensitive data in code or comments
- [ ] No API keys in frontend code
- [ ] Dependencies regularly updated
- [ ] No known vulnerabilities in dependencies

### Compliance & Privacy
- [ ] Terms of service (if applicable)
- [ ] Privacy policy (if applicable)
- [ ] GDPR compliance (if applicable)
- [ ] User data retention policy

---

## 9. Judging Criteria Alignment Matrix

### Criterion 1: Presentation
**What judges want**: Clear story, compelling demo, professional materials

**How to address**:
- Demo video: Problem → Solution → Features → Impact (tight narrative)
- Slides: Problem on slide 2, solution on slide 3, features on slide 4
- Demo: Real working app, clear user flows, no crashes
- Delivery: Speak clearly, maintain eye contact, engage judges
- Materials: Professional design, no typos, cohesive branding

**Success metrics**:
- Demo is compelling and clear
- Judges understand problem immediately
- Features demonstrated with confidence
- No obvious issues or crashes
- Materials look professional

---

### Criterion 2: Business Value
**What judges want**: Clear revenue model, market fit, scalability

**How to address**:
- Market size: Estimate TAM (Total Addressable Market)
  - "Launchpad platforms manage $X billion globally"
  - "Risk scoring market = $X million"
- Revenue model: Multiple streams
  - Fee sharing (% of launchpad fees from projects with Guardian scores)
  - API licensing (to other launchpads)
  - Premium analytics (advanced insights for projects/investors)
  - Consulting (custom scoring for VCs/funds)
- Customer segments: Investors, builders, DAO, Nostromo
- Competitive advantage: On-chain scoring unique to Qubic
- Roadmap: Phase 1 (MVP), Phase 2 (Platform), Phase 3 (Enterprise)
- Unit economics: Cost to acquire, LTV, ROI

**Success metrics**:
- Clear revenue model understood
- Judges see profit potential
- Scalability obvious
- Competitive advantage clear

---

### Criterion 3: Technology Application
**What judges want**: Creative use of tech, proper architecture, clean code

**How to address**:
- Tech choices justified: Why Next.js? Why PostgreSQL? Why Qubic?
- Qubic integration: Show how scoring stored on-chain, why it matters
- Scoring algorithm: 7-dimensional analysis, justified weights
- Architecture: Layered (presentation, app, persistence, blockchain)
- Code quality: Clean, documented, modular
- Best practices: Error handling, validation, security, performance
- Scalability: Can handle growing projects, optimized queries

**Success metrics**:
- Architecture diagram clear and justified
- Code is clean and maintainable
- Qubic features leverage properly
- Performance metrics acceptable
- Tech choices make sense

---

### Criterion 4: Originality
**What judges want**: Novel idea, unique approach, differentiation

**How to address**:
- Problem novelty: Launchpad risk assessment is new to Qubic ecosystem
- Solution novelty: On-chain scoring integration with Nostromo is unique
- Methodology: 7-dimensional scoring combining on/off-chain signals
- Differentiation: Guardian provides adaptive, transparent scoring
  - Not just static checklist
  - Not just manual DAO review
  - Combines AI/heuristics + data + transparency
- Use case novelty: Builders use sandbox to iterate (not just judge projects)
- Ecosystem fit: Fills specific gap in Qubic → Nostromo ecosystem

**Success metrics**:
- Judges haven't seen this exact solution
- Approach is thoughtful and justified
- Clear differentiation from alternatives
- Innovative use of scoring methodology
- Ecosystem-specific value clear

---

## 10. Risk Mitigation & Contingency Plans

### High-Risk Scenarios

#### Risk 1: API Performance Issues
**Probability**: Medium
**Impact**: High (demo will look slow)

**Mitigation**:
- Use database indexes from Day 1
- Implement query optimization early
- Add response caching where appropriate
- Monitor performance metrics daily

**Contingency**:
- If API slow on Day 3:
  - Mock API responses in frontend (hide backend delays)
  - Show cached data instead of live queries
  - Prepare explanation for judges (scalability plan)

---

#### Risk 2: Smart Contract Deployment Issues
**Probability**: Medium
**Impact**: Medium (integration incomplete)

**Mitigation**:
- Deploy contract early (Day 1)
- Test contract thoroughly (Day 1)
- Have fallback: if contract fails, use backend-only scoring

**Contingency**:
- If contract won't deploy on Day 3:
  - Run on testnet simulator instead of actual testnet
  - Show contract code and explain deployment process
  - Focus on backend + frontend integration
  - Document plan to deploy to mainnet

---

#### Risk 3: Frontend UI Bugs
**Probability**: High
**Impact**: Medium (looks unpolished)

**Mitigation**:
- Build pages incrementally (finish one before next)
- Test on mobile frequently
- Use component library to reduce bugs
- Have peer review before deployment

**Contingency**:
- If major UI bug discovered Day 3:
  - Identify root cause quickly (browser dev tools)
  - If fixable in < 1 hour: fix it
  - If not: prepare workaround/explanation for judges
  - Focus on fixing what matters most for demo

---

#### Risk 4: Time Management Issues
**Probability**: High
**Impact**: High (submission missed)

**Mitigation**:
- Plan daily milestones from start
- Daily standup to track progress
- Identify blockers early
- Parallel work where possible
- Have backup person for each role

**Contingency**:
- If falling behind on Day 2:
  - Drop nice-to-have features (analytics page, export, etc.)
  - Focus on: Dashboard, Detail, Sandbox, Nostromo mock, Contract
  - Skip heavy testing, do smoke tests only
- If falling behind on Day 3:
  - Submit what you have (partial submission often scores)
  - Complete docs in order of importance: README, API, ARCHITECTURE
  - Record short demo if full demo impossible
  - Submit on time > perfect submission

---

#### Risk 5: Integration Issues
**Probability**: Medium
**Impact**: High (components don't work together)

**Mitigation**:
- Define API contracts early
- Test integration incrementally (don't wait for Day 3)
- Use mock data if backend not ready
- Establish clear data formats

**Contingency**:
- If frontend/backend integration fails:
  - Mock API responses in frontend
  - Use localStorage to simulate backend
  - Demonstrate features separately if needed
  - Explain integration architecture to judges

---

#### Risk 6: Team Member Unavailable
**Probability**: Low
**Impact**: High (missing expertise)

**Mitigation**:
- Clear documentation of each person's work
- Pair programming on critical sections
- Cross-training on key components
- Backup person for each role

**Contingency**:
- If team member unavailable:
  - Redistribute tasks to other team members
  - Focus on most critical features
  - Accept lower quality if needed
  - Document what was completed

---

### Feature Prioritization (Must-Have vs. Nice-to-Have)

#### Must-Have (Demo-Critical)
- [ ] Dashboard with project list
- [ ] Launch detail page with score
- [ ] Builder sandbox with real-time scoring
- [ ] Scoring calculation logic
- [ ] API endpoints for all above
- [ ] Clean UI (responsive, no major bugs)
- [ ] Demo video
- [ ] README documentation
- [ ] Smart contract deployed

#### High-Priority (Enhances Demo)
- [ ] Nostromo mock integration
- [ ] Analytics page
- [ ] Risk flags detailed display
- [ ] Comprehensive error handling
- [ ] Nice-to-have: export recommendation
- [ ] Nice-to-have: dark mode

#### Nice-to-Have (Polish)
- [ ] Advanced filtering
- [ ] Search functionality
- [ ] User preferences
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] User accounts/authentication

### Decision Criteria for Feature Cuts
- **Time available**: < 5 hours left? Cut nice-to-have features
- **Demo impact**: Would judges notice absence? Keep it
- **Technical risk**: High-risk features first or cut? Evaluate carefully
- **User value**: Core feature or bonus? Keep core

### Cut Order (if running out of time)
1. Delete nice-to-have features first (dark mode, preferences, etc.)
2. Reduce scope of remaining features (fewer filters, simpler analytics)
3. Use mock data instead of real data if DB not ready
4. Focus on happy path (don't worry about every error case)
5. Skip non-critical documentation (focus on README)
6. Use pre-built UI components instead of custom

---

## Conclusion: Success Criteria Summary

### By End of Day 1
- ✅ Backend fully functional with all APIs
- ✅ Database with mock data
- ✅ Smart contract deployed to testnet
- ✅ Deployed backend (staging)
- ✅ 0 critical blockers

### By End of Day 2
- ✅ Frontend fully functional with all pages
- ✅ Frontend-backend integration working
- ✅ Smart contract integration working
- ✅ Deployed frontend (staging)
- ✅ End-to-end flow working

### By End of Day 3
- ✅ All bugs fixed
- ✅ Code cleaned up
- ✅ Documentation complete
- ✅ Demo video recorded
- ✅ Slides prepared
- ✅ Submitted to Lablab.ai

### Judging Criteria Met
- ✅ **Presentation**: Professional materials, clear demo, compelling story
- ✅ **Business Value**: Revenue model, market fit, scalability path
- ✅ **Technology**: Proper architecture, clean code, Qubic integration
- ✅ **Originality**: Novel scoring approach, ecosystem fit, unique features

### Key Success Metrics
- Working prototype that judges can interact with
- Clear narrative: problem → solution → implementation
- Professional code and documentation
- Enthusiasm and confidence in delivery
- On-time submission with all materials

---

*Sprint Plan Version: 1.0*  
*Created: December 4, 2025*  
*For: Qubic Hack the Future Hackathon (Dec 5–7, 2025)*  
*Timeframe: 48 hours*