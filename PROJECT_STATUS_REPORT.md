# Nostromo Guardian - Hackathon Status Report

## 🚀 Project Overview
Nostromo Guardian is a risk scoring protocol for the Qubic ecosystem. It analyzes projects across 7 dimensions (Team, Tokenomics, Vesting, etc.) and gives them a "Guardian Score" (0-100) and a Grade (Green, Yellow, Red). This score allows the Nostromo Launchpad to auto-configure IDO parameters like caps and fees.

---

## ✅ Deliverables Checklist

### 1. Backend API (Node.js/Express)
- [x] **Project Structure**: Clean Service/Controller architecture.
- [x] **Database**: PostgreSQL schema with validations and relations.
- [x] **Scoring Engine**: Complex weighted algorithm implementing all 7 dimensions.
- [x] **API Endpoints**: 
    - `GET /api/projects` (List with stats)
    - `GET /api/projects/:id` (Deep dive)
    - `POST /api/simulate` (Sandbox mode)
- [x] **Deployment**: Dockerized and ready for Render.com.

### 2. Frontend Dashboard (Next.js)
- [x] **Dashboard**: Real-time project tracking with filters.
- [x] **Builder Sandbox**: Interactive simulator for optimizing scores.
- [x] **Detailed Reports**: Radar charts and risk flag analysis.
- [x] **Nostromo Integration**: Mock IDO platform demonstrating value add.
- [x] **Responsive**: Optimized for Mobile and Desktop.

### 3. Smart Contract (Qubic C++)
- [x] **Contract Logic**: `GuardianScore.cpp` written and documented.
- [x] **Compilation**: Verified via `g++` syntax check.
- [x] **Procedures**: SetScore, GetScore, CanLaunchIDO implemented.

---

## 🛠️ Technical Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js, TypeScript, PostgreSQL.
- **Blockchain**: Qubic (C++).
- **DevOps**: Docker, Github Actions.

---

## ⏭️ Next Steps (Post-Hackathon)
1. **Qubic Testnet Deployment**: Deploy the compiled `GuardianScore` contract using the official Qubic CLI (requires Testnet seed).
2. **Oracle Integration**: Connect the Backend API to the Smart Contract via an Oracle service to push scores on-chain automatically.
3. **Mainnet Launch**: Audit the scoring algorithm and deploy to Qubic Mainnet.

---

## 📝 Demo Instructions
1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Visit**: `http://localhost:3000`
4. **Try**: Click "Sandbox" to simulate a new project score!

**Status: READY FOR SUBMISSION** 🏆
