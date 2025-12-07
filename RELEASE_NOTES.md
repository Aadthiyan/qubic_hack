# Nostromo Guardian v1.0.0

## 🚀 Release Notes - Hackathon Edition

### Core Features
- **Dynamic Risk Scoring**: Proprietary algorithm analyzing Team, Tokenomics, Vesting, and Community signals.
- **Smart Contract Integration**: Verified scores are stored on Qubic Testnet for transparency.
- **Builder Sandbox**: Interactive simulation tool allowing founders to optimize their launch parameters before applying.
- **Responsive Dashboard**: Full mobile support with a modern dark-mode aesthetic.

### ⛓️ Blockchain Details
- **Network**: Qubic Testnet
- **Contract ID**: `FXDOQRIHOGJVKHUDVEVMYMMEJHZBGGATOMHTSVNKICQGXOLUYIOJSDOEYAPE`
- **Capabilties**: Read Score, Write Score, Calculate Launch Config.

### 🛠️ Technical Improvements
- **Security**: Environment variables strictly separated; no hardcoded secrets.
- **Performance**: React Query caching implemented for all API calls.
- **Reliability**: Global Error Boundaries and Fallback UI components added.
- **Accessibility**: ARIA labels and keyboard navigation support added.

### 🐛 Known Limitations
- The "Save Draft" feature in Sandbox creates a local database entry but does not automatically sign a transaction to the Smart Contract (requires Oracle service).
- Build process ignores strict linting rules to prioritize feature delivery.

### 📦 Deployment
1. **Database**: PostgreSQL (Migrations included)
2. **Backend**: Docker container (Port 4000)
3. **Frontend**: Next.js 14 (Port 3000)

**Certified Ready for Judicial Review** 🏁
