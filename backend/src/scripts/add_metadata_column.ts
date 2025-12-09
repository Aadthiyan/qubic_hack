
import { query, closePool } from '../db/connection';

async function run() {
    try {
        console.log('Running schema update...');

        // Add extra_metadata JSONB column if not exists
        await query(`
            ALTER TABLE project_metadata 
            ADD COLUMN IF NOT EXISTS extra_metadata JSONB DEFAULT '{}'
        `);

        console.log('✅ Schema updated successfully: Added extra_metadata column');
    } catch (error) {
        console.error('❌ Schema update failed:', error);
    } finally {
        await closePool();
    }
}

run();
