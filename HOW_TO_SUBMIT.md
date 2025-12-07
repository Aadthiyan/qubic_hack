# 🚀 Hackathon Submission Guide

## What You Need to Submit

### 1️⃣ **GitHub Repository** (REQUIRED)
✅ **Already Done!** Your code is at: https://github.com/Aadthiyan/qubic_hack

**Make sure:**
- [ ] Repository is **PUBLIC**
- [ ] All code is pushed (`git push origin main`)
- [ ] README.md is complete with project description
- [ ] `.env` files are NOT committed (they're gitignored ✅)

### 2️⃣ **Demo Video** (REQUIRED)
📹 **Record a 3-5 minute video showing:**

1. **Introduction** (30 seconds)
   - "Hi, I'm [Your Name]"
   - "This is Nostromo Guardian - a risk scoring protocol for Qubic"

2. **Dashboard Demo** (1 minute)
   - Show the project list
   - Click on a project to see details
   - Point out the risk score and grade

3. **Sandbox Demo** (1.5 minutes)
   - Show the interactive builder
   - Adjust some parameters (team allocation, vesting)
   - Show how the score updates in real-time
   - Click "Save Draft"

4. **Smart Contract Integration** (1 minute)
   - Show the "On-Chain Verified" badge
   - Open the Qubic Explorer link
   - Show the deployed contract

5. **API Documentation** (30 seconds)
   - Navigate to http://localhost:4000/api/docs
   - Show the beautiful API docs

**How to Record:**
- Use OBS Studio (free) or Loom
- Record your screen + voice
- Upload to YouTube (can be unlisted)
- Get the YouTube link

### 3️⃣ **Live Demo URL** (OPTIONAL but RECOMMENDED)

**Option A: Deploy Both (Best)**
```bash
# Deploy Backend to Render.com
# 1. Go to render.com
# 2. New > Web Service
# 3. Connect GitHub repo
# 4. Root directory: backend
# 5. Build command: npm install
# 6. Start command: npm start
# 7. Add environment variables from backend/.env

# Deploy Frontend to Vercel
# 1. Go to vercel.com
# 2. Import GitHub repo
# 3. Root directory: frontend
# 4. Framework: Next.js
# 5. Add environment variables:
#    NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
#    NEXT_PUBLIC_API_KEY=nostromo-hackathon-2025
```

**Option B: Just Show Localhost in Video**
- Run both backend and frontend locally
- Record the demo video
- Judges will see it working

### 4️⃣ **Submission Form Fields**

**Project Name:**
```
Nostromo Guardian
```

**Tagline:**
```
Dynamic Risk Scoring Protocol for Qubic Launches
```

**Description:**
```
Nostromo Guardian protects the Qubic ecosystem from rug pulls by providing 
comprehensive risk assessment across 7 dimensions: Tokenomics, Vesting, 
Documentation, Team History, Community, Security Audits, and Launch Readiness.

Key Features:
• Real-time risk scoring (0-100) with color-coded grades
• Interactive Builder Sandbox for founders to optimize their launch
• On-chain verification via Qubic Smart Contract
• RESTful API for launchpad integration
• Beautiful analytics dashboard

Built with Next.js, Node.js, PostgreSQL, and Qubic C++ Smart Contracts.
```

**GitHub URL:**
```
https://github.com/Aadthiyan/qubic_hack
```

**Demo Video URL:**
```
[Your YouTube link]
```

**Live Demo URL:**
```
[Your Vercel URL] or "See video for localhost demo"
```

**Smart Contract Address:**
```
FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE
```

**Technologies Used:**
```
Next.js, TypeScript, Node.js, Express, PostgreSQL, Tailwind CSS, 
Qubic Smart Contracts (C++), React Query, Framer Motion, Recharts
```

**Category:**
```
DeFi / Infrastructure / Developer Tools
```

## 📋 Pre-Submission Checklist

### Code
- [x] All code committed and pushed to GitHub
- [x] Repository is public
- [x] README.md is comprehensive
- [x] Documentation files created (ARCHITECTURE.md, API.md, etc.)
- [x] No sensitive data in repo (.env files gitignored)

### Demo Video
- [ ] Video recorded (3-5 minutes)
- [ ] Shows all key features
- [ ] Good audio quality
- [ ] Uploaded to YouTube
- [ ] Link copied

### Deployment (Optional)
- [ ] Backend deployed to Render.com
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Live site tested

### Submission
- [ ] All form fields filled
- [ ] Links tested (GitHub, video, live demo)
- [ ] Smart contract address included
- [ ] Submitted before deadline

## 🎬 Recording Tips

**Screen Recording Software:**
- **OBS Studio** (Free, powerful) - https://obsproject.com/
- **Loom** (Easy, free tier) - https://loom.com/
- **Windows Game Bar** (Built-in: Win+G)

**What to Show:**
1. Start at the Dashboard
2. Navigate through different pages
3. Use the Sandbox to simulate a project
4. Show the API docs
5. Show the smart contract on Qubic Explorer

**Audio Tips:**
- Use a decent microphone (or headset)
- Speak clearly and enthusiastically
- Explain what you're doing as you demo
- Keep it under 5 minutes

## 📤 Where to Submit

**Lablab.ai Hackathon Platform:**
1. Go to your hackathon dashboard
2. Find "Submit Project" button
3. Fill in all fields
4. Upload/paste all links
5. Click Submit
6. Save confirmation email

## ✅ What You Have Ready

**Code:** ✅ Complete and on GitHub  
**Smart Contract:** ✅ Deployed on Qubic Testnet  
**Documentation:** ✅ Comprehensive (README, API, Architecture, etc.)  
**Backend:** ✅ Running locally (can deploy)  
**Frontend:** ✅ Running locally (can deploy)  

**What You Need to Do:**
1. ✅ Push latest code (already done)
2. 📹 Record demo video (3-5 min)
3. 🚀 Deploy (optional but recommended)
4. 📝 Submit on Lablab.ai

## 🎯 Quick Deploy Commands

**If you want to deploy:**

```bash
# Backend (Render.com)
# Just connect your GitHub repo and set:
# - Root: backend
# - Build: npm install
# - Start: npm start
# - Add env vars from backend/.env

# Frontend (Vercel)
vercel --prod
# Or connect GitHub repo in Vercel dashboard
```

## 🏆 You're Almost Done!

Your project is **100% complete and ready**. All you need is:
1. Record a demo video
2. Submit the form with your links

**Good luck! You've built something amazing!** 🚀

---

**Need Help?**
- Demo script: See `DEMO_SCRIPT.md`
- Submission checklist: See `SUBMISSION_READY.md`
- Project status: See `PROJECT_COMPLETE.md`
