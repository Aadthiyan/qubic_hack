import { query, testConnection, closePool } from './connection';

/**
 * Database Migration Script
 * Creates all tables with proper constraints, indexes, and relationships
 * 
 * Run with: npm run migrate
 */

async function runMigrations() {
  console.log('🚀 Starting database migrations...\n');
  console.log('='.repeat(60));

  try {
    // Test connection first
    const connected = await testConnection();
    if (!connected) {
      throw new Error('Database connection failed');
    }

    console.log('\n📋 Creating tables...\n');

    // ========================================
    // 1. PROJECTS TABLE
    // ========================================
    console.log('1️⃣  Creating projects table...');
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        website_url VARCHAR(500),
        whitepaper_url VARCHAR(500),
        github_url VARCHAR(500),
        twitter_handle VARCHAR(100),
        discord_invite VARCHAR(500),
        status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'launched', 'failed')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('   ✅ Projects table created');

    // ========================================
    // 2. PROJECT METADATA TABLE
    // ========================================
    console.log('2️⃣  Creating project_metadata table...');
    await query(`
      CREATE TABLE IF NOT EXISTS project_metadata (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        team_allocation_percent DECIMAL(5,2) CHECK (team_allocation_percent >= 0 AND team_allocation_percent <= 100),
        team_vesting_months INT CHECK (team_vesting_months >= 0),
        founder_wallet_address VARCHAR(500),
        has_founder_locks BOOLEAN DEFAULT FALSE,
        supply_distribution_fair BOOLEAN DEFAULT FALSE,
        total_supply BIGINT,
        initial_circulating_supply BIGINT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(project_id)
      );
    `);
    console.log('   ✅ Project metadata table created');

    // ========================================
    // 3. SCORES TABLE
    // ========================================
    console.log('3️⃣  Creating scores table...');
    await query(`
      CREATE TABLE IF NOT EXISTS scores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        score INT NOT NULL CHECK (score >= 0 AND score <= 100),
        grade VARCHAR(10) NOT NULL CHECK (grade IN ('Green', 'Yellow', 'Red')),
        tokenomics_score INT CHECK (tokenomics_score >= 0 AND tokenomics_score <= 20),
        vesting_score INT CHECK (vesting_score >= 0 AND vesting_score <= 20),
        documentation_score INT CHECK (documentation_score >= 0 AND documentation_score <= 15),
        team_history_score INT CHECK (team_history_score >= 0 AND team_history_score <= 15),
        community_score INT CHECK (community_score >= 0 AND community_score <= 15),
        audit_score INT CHECK (audit_score >= 0 AND audit_score <= 10),
        launch_readiness_score INT CHECK (launch_readiness_score >= 0 AND launch_readiness_score <= 5),
        calculated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('   ✅ Scores table created');

    // ========================================
    // 4. RISK FLAGS TABLE
    // ========================================
    console.log('4️⃣  Creating risk_flags table...');
    await query(`
      CREATE TABLE IF NOT EXISTS risk_flags (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        score_id UUID NOT NULL REFERENCES scores(id) ON DELETE CASCADE,
        flag_text TEXT NOT NULL,
        severity VARCHAR(10) NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('   ✅ Risk flags table created');

    // ========================================
    // 5. LAUNCH CONFIGS TABLE
    // ========================================
    console.log('5️⃣  Creating launch_configs table...');
    await query(`
      CREATE TABLE IF NOT EXISTS launch_configs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        score_id UUID REFERENCES scores(id),
        cap_min INT,
        cap_max INT,
        fee_tier_percent DECIMAL(5,2),
        access_tier VARCHAR(50) CHECK (access_tier IN ('public', 'mid-tier', 'accredited')),
        recommendation TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(project_id)
      );
    `);
    console.log('   ✅ Launch configs table created');

    // ========================================
    // CREATE INDEXES
    // ========================================
    console.log('\n📇 Creating indexes...\n');

    console.log('   Creating index on projects.status...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    `);

    console.log('   Creating index on projects.created_at...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
    `);

    console.log('   Creating index on scores.project_id...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_scores_project_id ON scores(project_id);
    `);

    console.log('   Creating index on scores.calculated_at...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_scores_calculated_at ON scores(calculated_at DESC);
    `);

    console.log('   Creating composite index on scores...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_scores_project_calculated ON scores(project_id, calculated_at DESC);
    `);

    console.log('   Creating index on project_metadata.project_id...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_metadata_project_id ON project_metadata(project_id);
    `);

    console.log('   Creating index on risk_flags.score_id...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_flags_score_id ON risk_flags(score_id);
    `);

    console.log('   Creating index on launch_configs.project_id...');
    await query(`
      CREATE INDEX IF NOT EXISTS idx_configs_project_id ON launch_configs(project_id);
    `);

    console.log('   ✅ All indexes created');

    // ========================================
    // VERIFY TABLES
    // ========================================
    console.log('\n🔍 Verifying tables...\n');

    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('   Tables created:');
    tables.rows.forEach((row: any) => {
      console.log(`   ✅ ${row.table_name}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log('✅ Migration completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await closePool();
  }
}

// Run migrations
runMigrations().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
