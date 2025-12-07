# Known Issues & Future Improvements

### 1. Contract Write Logic (Oracle)
- **Current State**: The backend API endpoint (`POST /set-score`) logs the transaction intention but does not cryptographically sign and broadcast to the Qubic network due to the absence of a Node.js-compatible signing library in this environment.
- **Future Fix**: Integrate the official `qubic-cli` or `qubic-js` library to handle transaction signing with the Oracle's private seed.

### 2. Frontend Build Strictness
- **Current State**: The production build (`npm run build`) is configured to ignore TypeScript and ESLint errors to ensure deployment success during the hackathon (`ignoreBuildErrors: true` in `next.config.js`).
- **Future Fix**: Address all strict type checks and unused variable warnings to enable strict mode.

### 3. Mobile Navigation
- **Current State**: Functional sidebar drawer.
- **Improvement**: Add gesture support (swipe to close) for better native-like feel.

### 4. Data Persistence
- **Current State**: Projects saved via Sandbox are stored in PostgreSQL.
- **Improvement**: Implement user accounts (Auth0/Supabase Auth) so users only see *their* projects. Currently, it's a public dashboard.
