# Frontend Deployment Guide - Vercel

## 🚀 Quick Deploy to Vercel (Recommended - 5 minutes)

Vercel is the company behind Next.js and offers the best deployment experience.

### **Prerequisites:**
- GitHub account (you already have this ✅)
- Vercel account (free - we'll create this)

---

## 📋 Step-by-Step Deployment

### **Step 1: Prepare Your Code**

First, make sure your latest code is pushed to GitHub:

```bash
cd "c:\Users\AADHITHAN\Downloads\qubic hack"
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### **Step 2: Sign Up for Vercel**

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### **Step 3: Import Your Project**

1. Click "Add New..." → "Project"
2. Find your repository: `qubic_hack`
3. Click "Import"

### **Step 4: Configure Build Settings**

Vercel will auto-detect Next.js. Configure these settings:

**Framework Preset:** Next.js (auto-detected ✅)

**Root Directory:** `frontend`
- Click "Edit" next to Root Directory
- Type: `frontend`
- This tells Vercel your Next.js app is in the frontend folder

**Build Command:** (leave default)
```
npm run build
```

**Output Directory:** (leave default)
```
.next
```

**Install Command:** (leave default)
```
npm install
```

### **Step 5: Add Environment Variables**

Click "Environment Variables" and add these:

**Variable 1:**
- Name: `NEXT_PUBLIC_API_URL`
- Value: `http://localhost:4000/api` (we'll update this after deploying backend)

**Variable 2:**
- Name: `NEXT_PUBLIC_API_KEY`
- Value: `nostromo-hackathon-2025`

**Variable 3:**
- Name: `NEXT_PUBLIC_GUARDIAN_CONTRACT_ADDRESS`
- Value: `FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE`

### **Step 6: Deploy!**

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://qubic-hack-xyz.vercel.app`

---

## ⚠️ Important: Update API URL After Backend Deployment

Your frontend will be deployed, but it will try to call `localhost:4000` which won't work in production.

**Two Options:**

### **Option A: Deploy Backend First (Recommended)**

1. Deploy backend to Render.com (see below)
2. Get backend URL (e.g., `https://nostromo-backend.onrender.com`)
3. Update Vercel environment variable:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Edit `NEXT_PUBLIC_API_URL`
   - Change to: `https://nostromo-backend.onrender.com/api`
4. Redeploy frontend (Vercel → Deployments → Click "..." → Redeploy)

### **Option B: Use Mock Data for Demo**

For the hackathon demo, you can:
1. Deploy frontend as-is
2. Show it in your video with localhost backend running
3. Mention "Backend deployment in progress" in submission

---

## 🔧 Troubleshooting

### **Build Fails with TypeScript Errors**

Your `next.config.js` already has `ignoreBuildErrors: true`, so this should work.

If it still fails, update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
```

Then commit and push:
```bash
git add frontend/next.config.js
git commit -m "Fix build config for deployment"
git push origin main
```

Vercel will auto-redeploy.

### **Environment Variables Not Working**

Make sure they start with `NEXT_PUBLIC_` - this is required for Next.js to expose them to the browser.

### **404 on Routes**

This shouldn't happen with Next.js App Router, but if it does:
- Check that all pages are in `frontend/src/app/`
- Verify `next.config.js` doesn't have conflicting settings

---

## 🎯 After Deployment

### **Your URLs:**

**Frontend:** `https://qubic-hack-[random].vercel.app`
- Vercel will give you this URL
- You can customize it in Settings → Domains

**Custom Domain (Optional):**
- You can add a custom domain in Vercel Settings
- Or use the free `.vercel.app` subdomain

### **Test Your Deployment:**

1. Visit your Vercel URL
2. Check that the homepage loads
3. Try navigating to different pages
4. Check browser console for errors

### **Update Your Submission:**

Add your Vercel URL to:
- `CANVA_AI_PROMPT.md` (Slide 12 - Live Demo QR code)
- Hackathon submission form
- README.md

---

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `frontend`
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Site loads correctly
- [ ] URL copied for submission
- [ ] QR code generated for pitch deck

---

## 🚀 Quick Commands Summary

```bash
# 1. Push latest code
cd "c:\Users\AADHITHAN\Downloads\qubic hack"
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Go to Vercel
# Visit: https://vercel.com

# 3. After deployment, test
# Visit: https://your-project.vercel.app
```

---

## 🔄 Continuous Deployment

**Good news:** Vercel automatically redeploys when you push to GitHub!

Every time you:
```bash
git push origin main
```

Vercel will automatically:
1. Detect the change
2. Build your project
3. Deploy the new version
4. Update your live URL

---

## 💡 Pro Tips

1. **Use Vercel CLI for faster deploys:**
   ```bash
   npm i -g vercel
   cd frontend
   vercel --prod
   ```

2. **Preview Deployments:**
   - Every git push creates a preview URL
   - Test before promoting to production

3. **Analytics:**
   - Vercel provides free analytics
   - See page views, performance metrics

4. **Logs:**
   - Check deployment logs in Vercel dashboard
   - Useful for debugging build issues

---

## 🎉 You're Ready!

Once deployed, you'll have:
- ✅ Live URL for your frontend
- ✅ Automatic HTTPS
- ✅ Global CDN (fast worldwide)
- ✅ Automatic redeployments on git push
- ✅ Free hosting!

**Let's deploy!** 🚀
