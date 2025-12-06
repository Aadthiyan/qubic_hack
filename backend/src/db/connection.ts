import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Connection Pool
 * Manages PostgreSQL connections for the application
 */

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Fallback to individual connection params if DATABASE_URL not set
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'nostromo_guardian',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Test connection on initialization
pool.on('connect', () => {
    console.log('✅ Database connection established');
});

pool.on('error', (err: Error) => {
    console.error('❌ Unexpected database error:', err);
    process.exit(-1);
});

/**
 * Execute a query
 */
export async function query(text: string, params?: any[]) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`📊 Query executed in ${duration}ms`);
        return res;
    } catch (error) {
        console.error('❌ Query error:', error);
        throw error;
    }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient() {
    const client = await pool.connect();
    return client;
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
    try {
        const result = await query('SELECT NOW() as now');
        console.log('✅ Database connection test successful');
        console.log(`   Server time: ${result.rows[0].now}`);
        return true;
    } catch (error) {
        console.error('❌ Database connection test failed:', error);
        return false;
    }
}

/**
 * Close all connections
 */
export async function closePool() {
    await pool.end();
    console.log('🔌 Database pool closed');
}

export default pool;
