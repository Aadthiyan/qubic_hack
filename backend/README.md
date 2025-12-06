# Nostromo Guardian - Backend API

Risk Scoring Engine and REST API for Qubic Launches

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker (optional, for database)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL (using Docker)
docker-compose up -d

# Run database migrations
npm run migrate

# Seed database with mock data
npm run seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:4000`

## 📁 Project Structure

```
src/
├── middleware/       # Auth, error handling, validation
├── routes/          # API route definitions
├── services/        # Business logic
│   ├── ScoringService.ts    # Core scoring algorithm
│   ├── ProjectService.ts    # Project CRUD
│   └── ConfigService.ts     # Risk-to-action mapping
├── controllers/     # Request handlers
├── models/          # TypeScript interfaces
├── db/              # Database connection & migrations
└── utils/           # Helper functions
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Submit new project
- `GET /api/projects/:id` - Get project details

### Scoring
- `POST /api/simulate` - Calculate score (no DB save)
- `POST /api/scores/:projectId` - Recalculate project score
- `GET /api/scores/:projectId/history` - Score history

### Analytics
- `GET /api/analytics` - Ecosystem statistics

### Health
- `GET /api/health` - API health check

## 🧮 Scoring Algorithm

Projects are scored across 7 dimensions (0-100 total):

1. **Tokenomics** (20 pts) - Team allocation, supply distribution
2. **Vesting** (20 pts) - Lock-up periods, release schedules
3. **Documentation** (15 pts) - Whitepaper, roadmap clarity
4. **Team History** (15 pts) - Prior projects, track record
5. **Community** (15 pts) - Social following, engagement
6. **Audit** (10 pts) - Security audits, bug bounties
7. **Launch Readiness** (5 pts) - Legal/KYC preparation

**Grades:**
- 🟢 Green (80-100): Safe for launch
- 🟡 Yellow (60-79): Needs caution
- 🔴 Red (0-59): High risk

## 🗄️ Database Schema

- `projects` - Project metadata
- `scores` - Historical scores
- `risk_flags` - Risk warnings
- `launch_configs` - Recommended launch parameters
- `project_metadata` - Tokenomics data

## 🛠️ Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Docker

## 📝 Environment Variables

See `.env.example` for required configuration.

## 🧪 Development

```bash
# Run dev server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Run database migrations
npm run migrate

# Seed database
npm run seed
```

## 🔒 Security

- Input validation on all endpoints
- SQL injection protection
- Rate limiting
- CORS configuration
- Helmet security headers

## 📄 License

MIT
