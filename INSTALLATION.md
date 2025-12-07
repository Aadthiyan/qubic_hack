# Installation & Setup Guide

## Prerequisites
- **Node.js**: v18 or higher
- **PostgreSQL**: v14+ (Local or Cloud)
- **Docker**: Optional, for containerized setup
- **Git**

## 🚀 Quick Start (Local Development)

### 1. Clone Repository
```bash
git clone https://github.com/Aadthiyan/qubic_hack.git
cd qubic_hack
```

### 2. Frontend Setup
```bash
cd frontend
cp .env.example .env.local
# Update .env.local if needed (API URL defaults to http://localhost:4000/api)
npm install
npm run dev
```
> Frontend runs at http://localhost:3000

### 3. Backend Setup
```bash
cd ../backend
cp .env.example .env
# Update .env with your DATABASE_URL
npm install
npm run migrate # Create tables
npm run seed    # Seed mock data
npm run dev
```
> Backend runs at http://localhost:4000

## 🐳 Docker Setup (Easiest)
Run the entire stack (Frontend + Backend + Database) with one command:
```bash
docker-compose up --build
```

## 🧪 Testing Checklist
1. Visit `http://localhost:3000`.
2. Check `http://localhost:4000/api/health` -> should return `{"status":"ok"}`.
3. Run backend tests: `cd backend && npm run test:api`.

## ⛓️ Smart Contract Setup
Refer to [contracts/README.md](./contracts/README.md) for compiling and deploying the C++ Smart Contract to Qubic Testnet.
