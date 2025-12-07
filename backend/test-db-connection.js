const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'nostromo_guardian',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    ssl: false,
});

console.log('Connection config:');
console.log({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'nostromo_guardian',
    user: process.env.DB_USER || 'admin',
    password: '****',
});

pool.connect()
    .then(client => {
        console.log('✅ Connected successfully!');
        return client.query('SELECT NOW()');
    })
    .then(result => {
        console.log('✅ Query successful:', result.rows[0]);
        pool.end();
    })
    .catch(err => {
        console.error('❌ Connection failed:', err.message);
        console.error('Full error:', err);
        process.exit(1);
    });
