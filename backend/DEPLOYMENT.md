# Backend Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Nostromo Guardian backend to various hosting platforms.

---

## Platform Comparison

| Platform | Free Tier | PostgreSQL | Auto-Deploy | Docker | Recommended |
|----------|-----------|------------|-------------|--------|-------------|
| **Render** | ✅ 750hrs/mo | ✅ Free | ✅ Yes | ✅ Yes | ⭐ **Best** |
| **Railway** | ✅ $5 credit | ✅ Free | ✅ Yes | ✅ Yes | ⭐ Good |
| **Fly.io** | ✅ Limited | ✅ Paid | ✅ Yes | ✅ Yes | Good |
| **Heroku** | ❌ Paid only | ❌ Paid | ✅ Yes | ✅ Yes | Not recommended |

**Recommendation**: Use **Render.com** for the hackathon (best free tier with PostgreSQL).

---

## Option 1: Deploy to Render.com (Recommended)

### Prerequisites
- GitHub account
- Render.com account (free)
- Code pushed to GitHub repository

### Step 1: Create Render Account
1. Visit https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create PostgreSQL Database
1. Click **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `nostromo-db`
   - **Database**: `nostromo_guardian`
   - **User**: `admin`
   - **Region**: Oregon (US West) or closest
   - **Plan**: Free
3. Click **Create Database**
4. Wait for database to provision (~2 minutes)
5. **Copy Internal Database URL** (starts with `postgresql://`)

### Step 3: Run Database Migrations
```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="your-internal-database-url"

# Run migrations
cd backend
npm run migrate
npm run seed
```

### Step 4: Create Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `nostromo-guardian-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: Docker
   - **Dockerfile Path**: `Dockerfile`
   - **Plan**: Free

### Step 5: Configure Environment Variables
Add these environment variables:

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=[Use Internal Database URL]
CORS_ORIGIN=https://your-frontend-domain.vercel.app
API_KEY=[Generate secure random string]
QUBIC_RPC_URL=https://rpc.qubic.org
```

**Generate API Key**:
```bash
# PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

### Step 6: Deploy
1. Click **Create Web Service**
2. Wait for build and deployment (~5-10 minutes)
3. Monitor logs for any errors

### Step 7: Verify Deployment
```bash
# Test health endpoint
curl https://your-app-name.onrender.com/api/health

# Expected response:
{
  "success": true,
  "data": {
    "status": "ok",
    "message": "Nostromo Guardian API is running",
    "database": "connected"
  }
}
```

### Step 8: Test All Endpoints
```bash
# List projects
curl https://your-app-name.onrender.com/api/projects

# Simulate score
curl -X POST https://your-app-name.onrender.com/api/simulate \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","teamAllocationPercent":15,...}'

# Get analytics
curl https://your-app-name.onrender.com/api/analytics
```

### Step 9: Enable Auto-Deploy
1. Go to service settings
2. Enable **Auto-Deploy**
3. Now pushes to `main` branch will auto-deploy

---

## Option 2: Deploy to Railway

### Step 1: Create Railway Account
1. Visit https://railway.app
2. Sign up with GitHub
3. Get $5 free credit

### Step 2: Install Railway CLI
```powershell
npm install -g @railway/cli
```

### Step 3: Login
```powershell
railway login
```

### Step 4: Initialize Project
```powershell
cd backend
railway init
```

### Step 5: Add PostgreSQL
```powershell
railway add --database postgresql
```

### Step 6: Set Environment Variables
```powershell
railway variables set NODE_ENV=production
railway variables set PORT=4000
railway variables set CORS_ORIGIN=https://your-frontend.vercel.app
railway variables set API_KEY=your-secure-key
railway variables set QUBIC_RPC_URL=https://rpc.qubic.org
```

### Step 7: Deploy
```powershell
railway up
```

### Step 8: Get Deployment URL
```powershell
railway domain
```

---

## Option 3: Deploy to Fly.io

### Step 1: Install Fly CLI
```powershell
# PowerShell (Run as Administrator)
iwr https://fly.io/install.ps1 -useb | iex
```

### Step 2: Login
```powershell
fly auth login
```

### Step 3: Launch App
```powershell
cd backend
fly launch --name nostromo-guardian-backend
```

### Step 4: Add PostgreSQL
```powershell
fly postgres create --name nostromo-db
fly postgres attach nostromo-db
```

### Step 5: Set Secrets
```powershell
fly secrets set NODE_ENV=production
fly secrets set API_KEY=your-secure-key
fly secrets set CORS_ORIGIN=https://your-frontend.vercel.app
```

### Step 6: Deploy
```powershell
fly deploy
```

---

## CI/CD Setup (GitHub Actions)

### Step 1: Add Secrets to GitHub
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `RENDER_DEPLOY_HOOK_URL`: Get from Render service settings
   - `RAILWAY_TOKEN`: Get from Railway account settings (if using Railway)

### Step 2: Push to Main Branch
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 3: Monitor Deployment
1. Go to **Actions** tab in GitHub
2. Watch the workflow run
3. Check for any errors

---

## Database Migration on Deployment

### Automatic Migration (Recommended)
Add to `package.json`:
```json
{
  "scripts": {
    "start": "npm run migrate && node dist/index.js"
  }
}
```

### Manual Migration
```bash
# Connect to production database
export DATABASE_URL="your-production-db-url"

# Run migrations
npm run migrate

# Seed data (optional)
npm run seed
```

---

## Environment Variables Checklist

### Required
- [ ] `NODE_ENV=production`
- [ ] `PORT=4000`
- [ ] `DATABASE_URL=postgresql://...`
- [ ] `CORS_ORIGIN=https://your-frontend.com`

### Optional
- [ ] `API_KEY=...` (for protected endpoints)
- [ ] `QUBIC_RPC_URL=https://rpc.qubic.org`
- [ ] `GUARDIAN_CONTRACT_ADDRESS=...` (after contract deployment)
- [ ] `LOG_LEVEL=info`

---

## Monitoring & Logs

### Render
```bash
# View logs
render logs --service nostromo-guardian-backend --tail
```

### Railway
```bash
# View logs
railway logs
```

### Fly.io
```bash
# View logs
fly logs
```

---

## Troubleshooting

### Issue: Build fails
**Solution**:
1. Check Dockerfile syntax
2. Ensure all dependencies in package.json
3. Check build logs for specific errors
4. Verify Node version matches (20.x)

### Issue: Database connection fails
**Solution**:
1. Verify DATABASE_URL is correct
2. Check database is running
3. Ensure database is in same region
4. Check firewall rules

### Issue: Migrations fail
**Solution**:
1. Check database permissions
2. Verify migration script syntax
3. Run migrations manually first
4. Check for existing tables

### Issue: 502 Bad Gateway
**Solution**:
1. Check application is listening on correct PORT
2. Verify health check endpoint works
3. Check application logs for crashes
4. Increase startup timeout

### Issue: CORS errors
**Solution**:
1. Verify CORS_ORIGIN is set correctly
2. Check frontend URL matches exactly
3. Ensure HTTPS is used
4. Add multiple origins if needed

---

## Rollback Procedure

### Render
1. Go to service **Deploys** tab
2. Find previous successful deploy
3. Click **Rollback to this deploy**

### Railway
```bash
# Rollback to previous deployment
railway rollback
```

### Fly.io
```bash
# List releases
fly releases

# Rollback to specific version
fly releases rollback v2
```

---

## Performance Optimization

### Enable Caching
Add to Dockerfile:
```dockerfile
# Cache dependencies
RUN npm ci --only=production && npm cache clean --force
```

### Use Connection Pooling
Already configured in `db/connection.ts`:
```typescript
max: 20,  // Maximum connections
idleTimeoutMillis: 30000
```

### Enable Compression
Add to `app.ts`:
```typescript
import compression from 'compression';
app.use(compression());
```

---

## Security Checklist

- [ ] HTTPS enabled (automatic on Render/Railway/Fly)
- [ ] Environment variables secured (not in code)
- [ ] API key generated and strong
- [ ] Database password strong
- [ ] CORS configured correctly
- [ ] Helmet middleware enabled
- [ ] Rate limiting configured (optional)
- [ ] No sensitive data in logs

---

## Post-Deployment Verification

### 1. Health Check
```bash
curl https://your-app.onrender.com/api/health
```

### 2. Test Endpoints
```bash
# List projects
curl https://your-app.onrender.com/api/projects

# Simulate
curl -X POST https://your-app.onrender.com/api/simulate \
  -H "Content-Type: application/json" \
  -d @test-project.json

# Analytics
curl https://your-app.onrender.com/api/analytics
```

### 3. Check Performance
```bash
# Measure response time
time curl https://your-app.onrender.com/api/health
```

### 4. Monitor Logs
- Check for errors
- Verify database connections
- Monitor memory usage

---

## Deployment URLs

After deployment, update these:

- **Backend API**: `https://nostromo-guardian-backend.onrender.com`
- **Frontend**: Update API_URL in frontend `.env`
- **Documentation**: Update README with live URLs

---

## Cost Estimates

### Render (Free Tier)
- Web Service: 750 hours/month (free)
- PostgreSQL: 1GB storage (free)
- **Total**: $0/month

### Railway ($5 credit)
- Usage-based pricing
- ~$5-10/month after credit
- **Total**: Free for ~1 month

### Fly.io
- 3 shared-cpu VMs (free)
- 3GB storage (free)
- **Total**: $0/month (limited)

---

## Next Steps

After deployment:
1. ✅ Update frontend API_URL
2. ✅ Test all endpoints from frontend
3. ✅ Deploy smart contract to Qubic
4. ✅ Update GUARDIAN_CONTRACT_ADDRESS
5. ✅ Monitor logs for errors
6. ✅ Set up custom domain (optional)

---

**Deployment Guide Version**: 1.0.0  
**Last Updated**: December 5, 2025  
**Status**: Ready for Deployment
