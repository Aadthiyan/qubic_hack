# Security Policy

## 🛡 Overview
Nostromo Guardian is designed with security as a priority, ensuring the integrity of risk scores and the safety of the launchpad ecosystem.

## 🔑 Key Security Measures

### Authentication & Authorization
- **API Keys**: Write access is restricted via `x-api-key` headers. The keys are managed via environment variables (`API_KEY`).
- **Admin Roles**: Only authorized addresses (Oracles) can update the Smart Contract state via the `isAuthorizedScorer` modifier.

### Input Validation
- **Strict Typing**: All API inputs are validated using Zod schemas to prevent injection and malformed data.
- **Sanitization**: Inputs are sanitized before storage in PostgreSQL preventing SQL Injection (handled by `pg` parameterized queries).

### Smart Contract Security
- **Access Control**: Critical functions (`setGuardianScore`) are protected.
- **Bounds Checking**: Contract enforces valid score ranges (0-100) and grade logic (0-2).
- **Pause Mechanism**: Emergency pause switch (`setPauseState`) included in the contract to stop operations in case of detected anomalies.

### Infrastructure
- **Environment Variables**: Sensitive credentials (DB passwords, API keys) are loaded from `.env` files and never committed to version control.
- **CORS**: Configured to allow requests only from trusted frontend domains (in production).

## 🐛 Reporting Vulnerabilities
If you discover a security issue, please contact the team via GitHub Issues marked as Confidential or email security@nostromo.finance.
