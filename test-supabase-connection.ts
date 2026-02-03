import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

async function testConnection() {
    console.log('🔍 Testing Supabase connection with Prisma...');

    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });

    try {
        // Test the connection
        console.log('Attempting to connect...');
        await prisma.$connect();
        console.log('✅ Successfully connected to Supabase!');

        // Try a simple query
        const result = await prisma.$queryRaw`SELECT version()`;
        console.log('📊 Database version:', result);

        // Check if tables exist
        const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
        console.log('📋 Existing tables:', tables);

    } catch (error) {
        console.error('❌ Connection failed:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        }
    } finally {
        await prisma.$disconnect();
        console.log('🔌 Disconnected from database');
    }
}

testConnection();
