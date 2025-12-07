# Nostromo Guardian 🛡️
### Dynamic Risk Scoring for the Qubic Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Qubic](https://img.shields.io/badge/Blockchain-Qubic-blue)](https://qubic.org/)
[![Status](https://img.shields.io/badge/Status-Hackathon_Submission-green)]()

> **The Trust Layer for Decentralized Launches.**  
> Nostromo Guardian analyzes projects across 7 key dimensions to produce transparent, on-chain verified risk scores.

---

## 🔗 Submission Links

- **📺 Video Demo:** [Watch on Google Drive](https://drive.google.com/file/d/1ZTKw_z1HTPGWMlA6zKdI4dYRaVR32ZrC/view?usp=sharing)
- **� Live Demo:** [https://qubic-hack.vercel.app/](https://qubic-hack.vercel.app/)
- **📄 Pitch Deck:** [View Slides](./PITCH_DECK_COMPLETE.md)
- **⚙️ GitHub Repo:** [Aadthiyan/qubic_hack](https://github.com/Aadthiyan/qubic_hack)

---

## 🚨 The Problem
Every year, billions of dollars are lost to rug pulls, failed launches, and poorly structured tokenomics.
*   **Investors** lack the tools to verify project claims.
*   **Launchpads** struggle to manually vet every applicant.
*   **Builders** don't know what specific metrics make their project "investable."

## 💡 The Solution: Nostromo Guardian
Nostromo Guardian is an automated **Risk Scoring Protocol** integrated directly with the Qubic blockchain. It provides a standardized "Credit Score" for crypto projects.

### Key Features
1.  **📊 7-Dimension Scoring Engine**: Analyzes Tokenomics, Vesting, Team, Docs, Community, Audit, and Readiness.
2.  **🧪 Builder Sandbox**: A "Wargames" style simulator where founders can test how changing their vesting schedule or team allocation impacts their score in real-time.
3.  **⛓️ On-Chain Verification**: Key risk metrics and final scores are committed to a Qubic Smart Contract for immutability.
4.  **🚩 Smart Risk Flags**: Automatically detects red flags like "Founder wallet not locked" or "Team allocation > 20%".

---

## 🏗️ Architecture

Nostromo combines a modern web stack with the power of Qubic's high-performance infrastructure.

### Tech Stack
*   **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
*   **Backend**: Node.js, Express, PostgreSQL (Supabase/Render)
*   **Blockchain**: Qubic C++ Smart Contract
*   **Analysis**: Custom Algo-scoring engine

### Qubic Integration
We deployed a custom C++ smart contract to the Qubic testnet to serve as the "Source of Truth" for project scores.
*   **Contract Address**: `FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE`
*   **Integration**: The backend communicates with the Qubic RPC to verify project states.

---

## � Getting Started

To run Nostromo Guardian locally, follow these steps:

### Prerequisites
*   Node.js v18+
*   PostgreSQL
*   Docker (Optional)

### 1. Clone & Install
```bash
git clone https://github.com/Aadthiyan/qubic_hack.git
cd qubic_hack
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env with DB credentials
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to access the dashboard.

---

## 🧮 Scoring Methodology

| Dimension | Points | What we check |
|-----------|--------|---------------|
| **Tokenomics** | 20 | Fair supply distribution, low inflation |
| **Vesting** | 20 | Founder lockups, long linear vesting |
| **Documentation** | 15 | Whitepaper quality, roadmap clarity |
| **Team History** | 15 | Verified track record, prior experience |
| **Community** | 15 | Organic growth, social engagement |
| **Audit** | 10 | 3rd party audits, bug bounties |
| **Readiness** | 5 | Legal compliance, KYC |

**Total Score: 0 - 100**
*   🟢 **80-100**: Low Risk (Safe for Launch)
*   🟡 **50-79**: Medium Risk (Proceed with Caution)
*   🔴 **0-49**: High Risk (Uninvestable)

---

## 👥 Hackathon Team

Built for the **Qubic Hackathon 2025**.

*   **Logic & Backend**: [Your Name/Team]
*   **UI/UX**: [Your Name/Team]
*   **Smart Contract**: [Your Name/Team]

---

### 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
