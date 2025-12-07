# Running the Full Stack Locally

## The Issue
The frontend is configured to call the backend at:
`https://nostromo-guardian-backend.onrender.com/api`

But this backend isn't deployed yet, causing the "Application Error".

## Solution: Run Both Frontend and Backend Locally

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```
Backend will run at: `http://localhost:4000`

### Terminal 2: Frontend  
Update `.env.local` to point to local backend:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_API_KEY=nostromo-hackathon-2025
NEXT_PUBLIC_GUARDIAN_CONTRACT_ADDRESS=FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE
```

Then run:
```bash
cd frontend
npm run build
npm start
```

Frontend will run at: `http://localhost:3000`

## Quick Fix for Testing

**Option 1**: Update `.env.local` to use local backend (recommended)

**Option 2**: Deploy backend to Render.com first, then test frontend

**Option 3**: Use development mode which handles errors better:
```bash
npm run dev
```

## For Demo Video

You have two options:

1. **Run both locally** (fastest for demo)
   - Backend on port 4000
   - Frontend on port 3000
   - Record demo with both running

2. **Deploy both** (best for submission)
   - Deploy backend to Render.com
   - Deploy frontend to Vercel
   - Update environment variables
   - Record demo from live URLs

## Current Status

✅ Frontend builds successfully  
❌ Backend not running (causing the error)  
✅ All code is ready

**Next Step**: Start the backend server!
