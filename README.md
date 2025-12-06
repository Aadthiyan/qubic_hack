# Nostromo Guardian

**Dynamic Risk Scoring for Qubic Launches**

A comprehensive risk assessment protocol for the Nostromo launchpad on Qubic blockchain.

## 🎯 Overview

Nostromo Guardian analyzes projects across 7 key dimensions to produce transparent risk scores (0-100) and actionable recommendations for investors, builders, and DAO governance.

## 🏗️ Project Structure

```
qubic-hack/
├── frontend/          # Next.js dashboard
├── backend/           # Express API + scoring engine
├── contracts/         # Qubic smart contracts (coming soon)
└── docker-compose.yml # PostgreSQL database
```

## 🚀 Quick Start

### 1. Start Database

```bash
docker-compose up -d
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

Backend runs at `http://localhost:4000`

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`

## 📊 Features

### For Investors
- **Transparent Scoring**: See risk breakdown before participating
- **Risk Flags**: Clear warnings about potential issues
- **Historical Data**: Track project improvements over time

### For Builders
- **Sandbox Simulator**: Test your project before submission
- **Actionable Feedback**: Know exactly what to improve
- **Score Optimization**: Iterate toward launch readiness

### For DAO
- **Data-Driven Decisions**: Objective metrics for project approval
- **Dynamic Parameters**: Auto-set caps/fees based on risk
- **Governance Integration**: Scores feed into voting

## 🧮 Scoring Dimensions

1. **Tokenomics** (20 pts) - Fair distribution, low team allocation
2. **Vesting** (20 pts) - Long lock-ups, transparent schedules
3. **Documentation** (15 pts) - Complete whitepaper, clear roadmap
4. **Team History** (15 pts) - Proven track record, no rug pulls
5. **Community** (15 pts) - Active social presence, engagement
6. **Audit** (10 pts) - Security audits, bug bounties
7. **Launch Readiness** (5 pts) - Legal/KYC compliance

**Total: 100 points**

## 🎨 Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Blockchain**: Qubic (C++ smart contracts)
- **Infrastructure**: Docker, Docker Compose

## 📚 Documentation

### Project Documentation
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Sprint Plan](./Nostromo-Guardian-Sprint-Plan.md)
- [Complete Build Plan](./Nostromo-Guardian-Complete-Build-Plan.md)

### Technical Documentation
- [Database Schema](./SCHEMA.md) - Complete ERD and table specifications
- [Qubic RPC Integration](./QUBIC_RPC_INTEGRATION.md)
- [Smart Contract](./contracts/README.md) - Guardian Score contract documentation
- [Testing Guide](./backend/TESTING_GUIDE.md) - Backend testing and validation
- [Deployment Guide](./backend/DEPLOYMENT.md) - Production deployment instructions

### Progress Reports
- **[Day 1 Completion Report](./DAY_1_COMPLETION_REPORT.md)** - ⭐ **95% Complete**
- **[Action Checklist](./ACTION_CHECKLIST.md)** - ⚠️ **What YOU need to do**

### Task Status Reports
- [Task 1.1 Status](./TASK_1.1_STATUS.md) - Repository Setup
- [Task 1.2 Status](./TASK_1.2_STATUS.md) - Qubic RPC Configuration
- [Task 1.3 Status](./TASK_1.3_STATUS.md) - Database Schema & Migrations
- [Task 1.4 Status](./TASK_1.4_STATUS.md) - Backend Project Structure
- [Task 1.5 Status](./TASK_1.5_STATUS.md) - Scoring Service Implementation
- [Task 1.6 Status](./TASK_1.6_STATUS.md) - REST API Routes
- [Task 1.7 Status](./TASK_1.7_STATUS.md) - Qubic Smart Contract
- [Task 1.8 Status](./TASK_1.8_STATUS.md) - Backend Testing & Validation
- [Task 1.9 Status](./TASK_1.9_STATUS.md) - Backend Deployment Setup

## 🏆 Hackathon Details

**Event**: Qubic Hackathon (Lablab.ai)  
**Duration**: December 5-7, 2025  
**Team**: [Your Team Name]

## 🔗 Links

- [Live Demo](#) (Coming soon)
- [Video Demo](#) (Coming soon)
- [Slide Deck](#) (Coming soon)

## 📄 License

MIT

## 🤝 Contributing

This is a hackathon project. Contributions welcome after the event!

---

Built with ❤️ for the Qubic ecosystem
