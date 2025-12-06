# Database Schema Documentation

## Overview

The Nostromo Guardian database schema is designed to store project information, risk scores, and launch configurations for the Qubic launchpad ecosystem.

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA                              │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐
│       PROJECTS           │
│──────────────────────────│
│ PK  id (UUID)            │
│     name                 │
│     description          │
│     website_url          │
│     whitepaper_url       │
│     github_url           │
│     twitter_handle       │
│     discord_invite       │
│     status               │◄────────┐
│     created_at           │         │
│     updated_at           │         │
└──────────────────────────┘         │
         │                           │
         │ 1                         │
         │                           │
         │ 1:1                       │ 1:1
         ├───────────────────┐       │
         │                   │       │
         │                   │       │
         ▼ *                 ▼ 1     ▼ 1
┌──────────────────────────┐ ┌──────────────────────────┐ ┌──────────────────────────┐
│  PROJECT_METADATA        │ │        SCORES            │ │    LAUNCH_CONFIGS        │
│──────────────────────────│ │──────────────────────────│ │──────────────────────────│
│ PK  id (UUID)            │ │ PK  id (UUID)            │ │ PK  id (UUID)            │
│ FK  project_id (UUID)    │ │ FK  project_id (UUID)    │ │ FK  project_id (UUID)    │
│ UQ  UNIQUE(project_id)   │ │     score (0-100)        │ │ FK  score_id (UUID)      │
│     team_allocation_%    │ │     grade                │ │ UQ  UNIQUE(project_id)   │
│     team_vesting_months  │ │     tokenomics_score     │ │     cap_min              │
│     founder_wallet_addr  │ │     vesting_score        │ │     cap_max              │
│     has_founder_locks    │ │     documentation_score  │ │     fee_tier_percent     │
│     supply_distribution  │ │     team_history_score   │ │     access_tier          │
│     total_supply         │ │     community_score      │ │     recommendation       │
│     initial_circ_supply  │ │     audit_score          │ │     created_at           │
│     created_at           │ │     launch_readiness_sc  │ └──────────────────────────┘
│     updated_at           │ │     calculated_at        │
└──────────────────────────┘ └──────────────────────────┘
                                      │
                                      │ 1
                                      │
                                      │ 1:N
                                      │
                                      ▼ *
                             ┌──────────────────────────┐
                             │      RISK_FLAGS          │
                             │──────────────────────────│
                             │ PK  id (UUID)            │
                             │ FK  score_id (UUID)      │
                             │     flag_text            │
                             │     severity             │
                             │     created_at           │
                             └──────────────────────────┘

LEGEND:
  PK = Primary Key
  FK = Foreign Key
  UQ = Unique Constraint
  1  = One
  *  = Many
```

## Table Descriptions

### 1. PROJECTS

**Purpose**: Core table storing basic project information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique project identifier |
| `name` | VARCHAR(255) | NOT NULL | Project name |
| `description` | TEXT | | Detailed project description |
| `website_url` | VARCHAR(500) | | Project website |
| `whitepaper_url` | VARCHAR(500) | | Link to whitepaper/litepaper |
| `github_url` | VARCHAR(500) | | GitHub repository |
| `twitter_handle` | VARCHAR(100) | | Twitter/X handle |
| `discord_invite` | VARCHAR(500) | | Discord invite link |
| `status` | VARCHAR(50) | CHECK IN ('draft', 'submitted', 'approved', 'launched', 'failed'), DEFAULT 'draft' | Project lifecycle status |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_projects_status` on `status`
- `idx_projects_created_at` on `created_at DESC`

**Relationships**:
- One-to-One with `project_metadata`
- One-to-Many with `scores`
- One-to-One with `launch_configs`

---

### 2. PROJECT_METADATA

**Purpose**: Stores detailed tokenomics and team information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique metadata identifier |
| `project_id` | UUID | FOREIGN KEY → projects(id) ON DELETE CASCADE, UNIQUE | Reference to parent project |
| `team_allocation_percent` | DECIMAL(5,2) | CHECK (0-100) | Team token allocation percentage |
| `team_vesting_months` | INT | CHECK (>= 0) | Team vesting duration in months |
| `founder_wallet_address` | VARCHAR(500) | | Founder's wallet address |
| `has_founder_locks` | BOOLEAN | DEFAULT FALSE | Whether founder tokens are locked |
| `supply_distribution_fair` | BOOLEAN | DEFAULT FALSE | Fair supply distribution indicator |
| `total_supply` | BIGINT | | Total token supply |
| `initial_circulating_supply` | BIGINT | | Initial circulating supply |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_metadata_project_id` on `project_id`

**Relationships**:
- Many-to-One with `projects` (UNIQUE constraint enforces 1:1)

**Business Rules**:
- Each project can have only ONE metadata record (UNIQUE constraint)
- Metadata is deleted when parent project is deleted (CASCADE)

---

### 3. SCORES

**Purpose**: Stores calculated risk scores and grade assignments

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique score identifier |
| `project_id` | UUID | FOREIGN KEY → projects(id) ON DELETE CASCADE | Reference to project |
| `score` | INT | NOT NULL, CHECK (0-100) | Total composite score |
| `grade` | VARCHAR(10) | NOT NULL, CHECK IN ('Green', 'Yellow', 'Red') | Risk grade |
| `tokenomics_score` | INT | CHECK (0-20) | Tokenomics dimension score |
| `vesting_score` | INT | CHECK (0-20) | Vesting dimension score |
| `documentation_score` | INT | CHECK (0-15) | Documentation dimension score |
| `team_history_score` | INT | CHECK (0-15) | Team history dimension score |
| `community_score` | INT | CHECK (0-15) | Community dimension score |
| `audit_score` | INT | CHECK (0-10) | Audit dimension score |
| `launch_readiness_score` | INT | CHECK (0-5) | Launch readiness dimension score |
| `calculated_at` | TIMESTAMP | DEFAULT NOW() | Score calculation timestamp |

**Indexes**:
- `idx_scores_project_id` on `project_id`
- `idx_scores_calculated_at` on `calculated_at DESC`
- `idx_scores_project_calculated` on `(project_id, calculated_at DESC)` (composite)

**Relationships**:
- Many-to-One with `projects`
- One-to-Many with `risk_flags`
- One-to-One with `launch_configs` (via score_id)

**Business Rules**:
- Total score must be 0-100
- Subscores must sum to total score
- Grade assignment:
  - Green: score >= 80
  - Yellow: score 60-79
  - Red: score < 60
- Multiple scores per project allowed (historical tracking)

---

### 4. RISK_FLAGS

**Purpose**: Stores specific risk warnings associated with scores

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique flag identifier |
| `score_id` | UUID | FOREIGN KEY → scores(id) ON DELETE CASCADE | Reference to score |
| `flag_text` | TEXT | NOT NULL | Risk warning message |
| `severity` | VARCHAR(10) | NOT NULL, CHECK IN ('low', 'medium', 'high') | Risk severity level |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Flag creation timestamp |

**Indexes**:
- `idx_flags_score_id` on `score_id`

**Relationships**:
- Many-to-One with `scores`

**Business Rules**:
- Flags are deleted when parent score is deleted (CASCADE)
- Severity levels:
  - `high`: Critical issues (e.g., no vesting, high team allocation)
  - `medium`: Moderate concerns (e.g., no whitepaper, no locks)
  - `low`: Minor issues (e.g., no GitHub, limited social presence)

---

### 5. LAUNCH_CONFIGS

**Purpose**: Stores recommended launch parameters based on risk score

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique config identifier |
| `project_id` | UUID | FOREIGN KEY → projects(id) ON DELETE CASCADE, UNIQUE | Reference to project |
| `score_id` | UUID | FOREIGN KEY → scores(id) | Reference to score used for config |
| `cap_min` | INT | | Minimum hard cap (QUBIC) |
| `cap_max` | INT | | Maximum hard cap (QUBIC) |
| `fee_tier_percent` | DECIMAL(5,2) | | Platform fee percentage |
| `access_tier` | VARCHAR(50) | CHECK IN ('public', 'mid-tier', 'accredited') | Investor access tier |
| `recommendation` | TEXT | | Human-readable recommendation |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Config creation timestamp |

**Indexes**:
- `idx_configs_project_id` on `project_id`

**Relationships**:
- Many-to-One with `projects` (UNIQUE constraint enforces 1:1)
- Many-to-One with `scores`

**Business Rules**:
- Each project can have only ONE active config (UNIQUE constraint)
- Config parameters based on grade:
  - **Green (80-100)**:
    - Cap: 100K-500K QUBIC
    - Fee: 2-3%
    - Access: Public
  - **Yellow (60-79)**:
    - Cap: 50K-200K QUBIC
    - Fee: 4-5%
    - Access: Mid-tier+
  - **Red (0-59)**:
    - Cap: 10K-50K QUBIC
    - Fee: 6-8%
    - Access: Accredited only

---

## Relationships Summary

### One-to-One Relationships
1. `projects` ↔ `project_metadata` (enforced by UNIQUE constraint)
2. `projects` ↔ `launch_configs` (enforced by UNIQUE constraint)

### One-to-Many Relationships
1. `projects` → `scores` (one project can have multiple historical scores)
2. `scores` → `risk_flags` (one score can have multiple risk flags)

### Cascade Deletion Rules
- Deleting a `project` cascades to:
  - `project_metadata`
  - `scores`
  - `launch_configs`
- Deleting a `score` cascades to:
  - `risk_flags`

---

## Data Integrity Constraints

### Check Constraints

1. **projects.status**:
   ```sql
   CHECK (status IN ('draft', 'submitted', 'approved', 'launched', 'failed'))
   ```

2. **project_metadata.team_allocation_percent**:
   ```sql
   CHECK (team_allocation_percent >= 0 AND team_allocation_percent <= 100)
   ```

3. **project_metadata.team_vesting_months**:
   ```sql
   CHECK (team_vesting_months >= 0)
   ```

4. **scores.score**:
   ```sql
   CHECK (score >= 0 AND score <= 100)
   ```

5. **scores.grade**:
   ```sql
   CHECK (grade IN ('Green', 'Yellow', 'Red'))
   ```

6. **scores.tokenomics_score**:
   ```sql
   CHECK (tokenomics_score >= 0 AND tokenomics_score <= 20)
   ```

7. **scores.vesting_score**:
   ```sql
   CHECK (vesting_score >= 0 AND vesting_score <= 20)
   ```

8. **scores.documentation_score**:
   ```sql
   CHECK (documentation_score >= 0 AND documentation_score <= 15)
   ```

9. **scores.team_history_score**:
   ```sql
   CHECK (team_history_score >= 0 AND team_history_score <= 15)
   ```

10. **scores.community_score**:
    ```sql
    CHECK (community_score >= 0 AND community_score <= 15)
    ```

11. **scores.audit_score**:
    ```sql
    CHECK (audit_score >= 0 AND audit_score <= 10)
    ```

12. **scores.launch_readiness_score**:
    ```sql
    CHECK (launch_readiness_score >= 0 AND launch_readiness_score <= 5)
    ```

13. **risk_flags.severity**:
    ```sql
    CHECK (severity IN ('low', 'medium', 'high'))
    ```

14. **launch_configs.access_tier**:
    ```sql
    CHECK (access_tier IN ('public', 'mid-tier', 'accredited'))
    ```

---

## Indexes for Performance

### Primary Indexes (Automatic)
- All `id` columns (PRIMARY KEY)

### Custom Indexes

1. **projects**:
   - `idx_projects_status` - Fast filtering by status
   - `idx_projects_created_at` - Chronological ordering

2. **scores**:
   - `idx_scores_project_id` - Fast project score lookups
   - `idx_scores_calculated_at` - Chronological score history
   - `idx_scores_project_calculated` - Composite for latest score queries

3. **project_metadata**:
   - `idx_metadata_project_id` - Fast metadata joins

4. **risk_flags**:
   - `idx_flags_score_id` - Fast flag lookups by score

5. **launch_configs**:
   - `idx_configs_project_id` - Fast config lookups

---

## Common Queries

### Get Project with Latest Score

```sql
SELECT 
  p.*,
  s.score,
  s.grade,
  s.calculated_at
FROM projects p
LEFT JOIN LATERAL (
  SELECT * FROM scores
  WHERE project_id = p.id
  ORDER BY calculated_at DESC
  LIMIT 1
) s ON true
WHERE p.id = $1;
```

### Get All Projects with Score Distribution

```sql
SELECT 
  p.name,
  p.status,
  s.score,
  s.grade,
  COUNT(rf.id) as risk_flag_count
FROM projects p
LEFT JOIN scores s ON s.project_id = p.id
LEFT JOIN risk_flags rf ON rf.score_id = s.id
GROUP BY p.id, p.name, p.status, s.score, s.grade
ORDER BY s.score DESC;
```

### Get Projects by Grade

```sql
SELECT p.*, s.score, s.grade
FROM projects p
JOIN scores s ON s.project_id = p.id
WHERE s.grade = 'Green'
ORDER BY s.score DESC;
```

---

## Migration and Seeding

### Run Migrations

```bash
cd backend
npm run migrate
```

### Seed Database

```bash
cd backend
npm run seed
```

### Verify Schema

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check constraints
SELECT constraint_name, table_name 
FROM information_schema.table_constraints 
WHERE table_schema = 'public';

-- Check indexes
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public';
```

---

## Maintenance

### Backup

```bash
pg_dump -U admin -d nostromo_guardian > backup.sql
```

### Restore

```bash
psql -U admin -d nostromo_guardian < backup.sql
```

### Reset Database

```bash
# Drop all tables
psql -U admin -d nostromo_guardian -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Re-run migrations
npm run migrate

# Re-seed data
npm run seed
```

---

## Performance Considerations

1. **Indexing**: All foreign keys and frequently queried columns are indexed
2. **Cascade Deletes**: Automatic cleanup prevents orphaned records
3. **Check Constraints**: Data validation at database level
4. **Connection Pooling**: Max 20 concurrent connections
5. **Query Optimization**: Use LATERAL joins for latest score queries

---

## Security

1. **No Sensitive Data**: No passwords or private keys stored
2. **Parameterized Queries**: All queries use prepared statements
3. **Input Validation**: CHECK constraints prevent invalid data
4. **Cascade Protection**: Foreign keys prevent orphaned records

---

**Last Updated**: December 5, 2025  
**Schema Version**: 1.0.0  
**Database**: PostgreSQL 15+
