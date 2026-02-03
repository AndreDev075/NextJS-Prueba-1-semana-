const { Client } = require('pg');

const connectionString = 'postgresql://postgres:%3Fmanagercourse123@db.qeuewexnlgnhhtwandxd.supabase.co:5432/postgres';

async function testConnection() {
    console.log('🔍 Testing Supabase connection with pg...');
    console.log('Connection string:', connectionString.replace(/:[^:@]+@/, ':****@'));

    const client = new Client({
        connectionString: connectionString,
    });

    try {
        console.log('Attempting to connect...');
        await client.connect();
        console.log('✅ Successfully connected to Supabase!');

        const result = await client.query('SELECT version()');
        console.log('📊 Database version:', result.rows[0]);

        const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('📋 Existing tables:', tables.rows);

    } catch (error) {
        console.error('❌ Connection failed:', error);
        if (error.code) {
            console.error('Error code:', error.code);
        }
    } finally {
        await client.end();
        console.log('🔌 Disconnected from database');
    }
}

testConnection();
