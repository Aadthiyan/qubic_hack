# Nostromo Guardian - Frontend

Dynamic Risk Scoring Dashboard for Qubic Launches

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── Layout/      # Header, Footer, Sidebar
│   ├── Dashboard/   # Project list, cards, filters
│   ├── Detail/      # Score breakdown, risk flags
│   └── Sandbox/     # Builder simulator
├── hooks/           # Custom React hooks
├── types/           # TypeScript interfaces
└── utils/           # Helper functions
```

## 🎨 Features

- **Dashboard**: View all projects with scores and grades
- **Detail Pages**: Deep dive into project risk analysis
- **Builder Sandbox**: Real-time score simulator
- **Analytics**: Ecosystem trends and statistics

## 🛠️ Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Query
- Recharts

## 📝 Environment Variables

See `.env.example` for required environment variables.

## 🧪 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

MIT
