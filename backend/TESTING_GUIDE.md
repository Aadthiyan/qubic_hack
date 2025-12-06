# Backend Testing & Validation Guide

## Overview

This guide provides step-by-step instructions for testing and validating the Nostromo Guardian backend API.

---

## Prerequisites

### 1. Database Setup

**Option A: Docker (Recommended)**
```powershell
# Start PostgreSQL with Docker
docker run --name nostromo-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=nostromo_guardian \
  -p 5432:5432 \
  -d postgres:15
```

**Option B: Local PostgreSQL**
- Install PostgreSQL 15+
- Create database: `nostromo_guardian`
- Create user: `admin` / `password`

### 2. Environment Variables

Create `backend/.env`:
```env
# Database
DATABASE_URL=postgresql://admin:password@localhost:5432/nostromo_guardian
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nostromo_guardian
DB_USER=admin
DB_PASSWORD=password

# Server
PORT=4000
NODE_ENV=development

# CORS
CORS_ORIGIN=*

# API
API_KEY=test-api-key
```

---

## Step 1: Database Migration

### Run Migration Script
```powershell
cd backend
npm run migrate
```

### Expected Output
```
[INFO] Starting database migration...
[INFO] Creating tables...
[INFO] ✅ Table 'projects' created
[INFO] ✅ Table 'project_metadata' created
[INFO] ✅ Table 'scores' created
[INFO] ✅ Table 'risk_flags' created
[INFO] ✅ Table 'launch_configs' created
[INFO] Creating indexes...
[INFO] ✅ All indexes created
[INFO] 🎉 Migration completed successfully
```

### Verify Tables
```sql
-- Connect to database
psql -U admin -d nostromo_guardian

-- List tables
\dt

-- Expected output:
-- projects
-- project_metadata
-- scores
-- risk_flags
-- launch_configs
```

---

## Step 2: Seed Mock Data

### Run Seed Script
```powershell
npm run seed
```

### Expected Output
```
[INFO] Starting database seeding...
[INFO] Seeding 10 mock projects...
[INFO] ✅ Project 1/10: QubicSwap DEX (Green)
[INFO] ✅ Project 2/10: QubicPay Gateway (Yellow)
...
[INFO] ✅ Project 10/10: SafeQubic (Green)
[INFO] 🎉 Seeding completed successfully
[INFO] Total projects: 10
[INFO] Green: 3, Yellow: 4, Red: 3
```

### Verify Data
```sql
-- Count projects
SELECT COUNT(*) FROM projects;
-- Expected: 10

-- View projects with scores
SELECT 
  p.name, 
  s.score, 
  s.grade 
FROM projects p
LEFT JOIN scores s ON p.id = s.project_id
ORDER BY s.score DESC;
```

---

## Step 3: Start Backend Server

### Start Development Server
```powershell
npm run dev
```

### Expected Output
```
[INFO] Testing database connection...
[INFO] ✅ Database connection test successful
[INFO] 🚀 Server is running on http://localhost:4000
[INFO] 📊 Health check: http://localhost:4000/api/health
[INFO] 📚 API docs: http://localhost:4000/
[INFO] 🗄️  Database: Connected ✅
```

---

## Step 4: Manual API Testing

### Test 1: Health Check
```powershell
# PowerShell
Invoke-WebRequest -Uri "http://localhost:4000/api/health" | Select-Object -Expand Content

# Expected Response:
{
  "success": true,
  "data": {
    "status": "ok",
    "message": "Nostromo Guardian API is running",
    "timestamp": "2025-12-05T...",
    "version": "1.0.0",
    "database": "connected"
  }
}
```

### Test 2: List Projects
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/projects?page=1&limit=5" | Select-Object -Expand Content

# Expected: List of 5 projects with pagination info
```

### Test 3: Simulate Score
```powershell
$body = @{
  name = "Test Project"
  teamAllocationPercent = 15
  teamVestingMonths = 24
  hasFounderLocks = $true
  supplyDistributionFair = $true
  hasWhitepaper = $true
  hasRoadmap = $true
  documentationClarity = 8
  priorProjects = 2
  trackRecord = "good"
  twitterFollowers = 5000
  discordMembers = 2000
  githubActivity = 7
  hasAudit = $true
  hasBugBounty = $false
  hasKYC = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/simulate" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | Select-Object -Expand Content

# Expected: Score result with grade, subscores, flags
```

### Test 4: Get Analytics
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/analytics" | Select-Object -Expand Content

# Expected: Distribution, averages, counts
```

---

## Step 5: Automated API Testing

### Run Test Suite
```powershell
npm run test:api
```

### Expected Output
```
🧪 Starting API Tests

================================================================================
📊 Test Group 1: Health & Info
✅ GET / - API Info (Status: 200, Duration: 45ms)
✅ GET /api/health - Health Check (Status: 200, Duration: 52ms)

📊 Test Group 2: Analytics (Empty State)
✅ GET /api/analytics - Empty Analytics (Status: 200, Duration: 78ms)

📊 Test Group 3: Simulate Endpoint
✅ POST /api/simulate - Green Project (Status: 200, Duration: 125ms)
✅ Simulate: Green grade correct (Score: 92)
✅ POST /api/simulate - Yellow Project (Status: 200, Duration: 98ms)
✅ Simulate: Yellow grade correct (Score: 68)
✅ POST /api/simulate - Red Project (Status: 200, Duration: 87ms)
✅ Simulate: Red grade correct (Score: 36)

📊 Test Group 4: Error Handling
✅ POST /api/simulate - Invalid Score Range (Status: 400, Duration: 23ms)
✅ POST /api/simulate - Missing Required Field (Status: 400, Duration: 19ms)
✅ GET /api/projects/:id - Invalid UUID (Status: 404, Duration: 31ms)

📊 Test Group 5: Projects Endpoint
✅ GET /api/projects - List Projects (Status: 200, Duration: 156ms)
✅ Projects: Response structure correct (Found 10 projects)

================================================================================
📈 Test Summary

Total Tests:  14
✅ Passed:    14
❌ Failed:    0
Success Rate: 100.0%

🎉 All tests passed!
```

---

## Step 6: Postman Testing

### Import Collection
1. Open Postman
2. Click **Import**
3. Select `backend/Nostromo_Guardian_API.postman_collection.json`
4. Collection will appear in sidebar

### Set Environment Variables
1. Create new environment: "Local Development"
2. Add variable:
   - `baseUrl`: `http://localhost:4000`
   - `projectId`: (copy from a project response)

### Run Collection
1. Right-click collection
2. Select **Run collection**
3. Click **Run Nostromo Guardian API**
4. View results

---

## Step 7: Performance Testing

### Test Response Times

**Expected Performance**:
- Health check: < 50ms
- List projects: < 200ms
- Simulate score: < 150ms
- Get analytics: < 300ms
- Create project: < 500ms

### Measure Performance
```powershell
# Measure health check
Measure-Command { 
  Invoke-WebRequest -Uri "http://localhost:4000/api/health" 
} | Select-Object TotalMilliseconds

# Measure simulate
Measure-Command { 
  Invoke-WebRequest -Uri "http://localhost:4000/api/simulate" `
    -Method POST `
    -ContentType "application/json" `
    -Body $testBody
} | Select-Object TotalMilliseconds
```

---

## Step 8: Data Integrity Testing

### Test Constraints

**Test 1: Score Range**
```powershell
# Should fail - score > 100
$invalidScore = @{
  name = "Invalid"
  teamAllocationPercent = 150  # Invalid
  teamVestingMonths = 12
  hasFounderLocks = $true
  supplyDistributionFair = $true
} | ConvertTo-Json

# Should return 400 error
Invoke-WebRequest -Uri "http://localhost:4000/api/simulate" `
  -Method POST `
  -ContentType "application/json" `
  -Body $invalidScore
```

**Test 2: Required Fields**
```sql
-- Should fail - missing required field
INSERT INTO projects (name) VALUES ('Test');
-- ERROR: null value in column "status" violates not-null constraint
```

**Test 3: Foreign Key**
```sql
-- Should fail - invalid project_id
INSERT INTO scores (project_id, score, grade) 
VALUES ('00000000-0000-0000-0000-000000000000', 85, 'Green');
-- ERROR: insert or update on table "scores" violates foreign key constraint
```

---

## Validation Checklist

### ✅ Database
- [ ] Migration completed successfully
- [ ] All 5 tables created
- [ ] Indexes created
- [ ] Constraints enforced
- [ ] 10 mock projects seeded

### ✅ API Endpoints
- [ ] GET / returns API info
- [ ] GET /api/health returns 200
- [ ] GET /api/projects returns projects
- [ ] POST /api/projects creates project
- [ ] GET /api/projects/:id returns details
- [ ] POST /api/simulate returns score
- [ ] GET /api/analytics returns stats

### ✅ Scoring Logic
- [ ] Green projects score 80-100
- [ ] Yellow projects score 60-79
- [ ] Red projects score < 60
- [ ] Risk flags generated correctly
- [ ] Launch configs calculated

### ✅ Error Handling
- [ ] Invalid input returns 400
- [ ] Missing fields return 400
- [ ] Not found returns 404
- [ ] Database errors handled
- [ ] Error messages clear

### ✅ Performance
- [ ] Health check < 50ms
- [ ] List projects < 200ms
- [ ] Simulate < 150ms
- [ ] Analytics < 300ms
- [ ] No memory leaks

---

## Common Issues & Solutions

### Issue: Database connection failed
**Solution**:
1. Check PostgreSQL is running
2. Verify credentials in `.env`
3. Check port 5432 is not blocked
4. Test connection: `psql -U admin -d nostromo_guardian`

### Issue: Migration fails
**Solution**:
1. Drop existing tables: `DROP TABLE IF EXISTS projects CASCADE;`
2. Re-run migration: `npm run migrate`
3. Check PostgreSQL logs

### Issue: Seed fails
**Solution**:
1. Ensure migration completed
2. Clear existing data: `TRUNCATE projects CASCADE;`
3. Re-run seed: `npm run seed`

### Issue: API returns 500
**Solution**:
1. Check server logs
2. Verify database connection
3. Check all dependencies installed
4. Restart server

---

## Success Metrics

### Performance Targets
- ✅ Average response time: < 200ms
- ✅ 95th percentile: < 500ms
- ✅ Database query time: < 100ms
- ✅ Concurrent requests: 100+

### Quality Targets
- ✅ Test coverage: 100% of endpoints
- ✅ Error rate: 0%
- ✅ Uptime: 99.9%
- ✅ Data integrity: 100%

---

## Next Steps

After validation:
1. ✅ Backend is production-ready
2. ⏭️ Start frontend development
3. ⏭️ Integrate frontend with API
4. ⏭️ Deploy to staging environment

---

**Testing Guide Version**: 1.0.0  
**Last Updated**: December 5, 2025  
**Status**: Ready for Testing
