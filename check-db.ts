import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

async function quickTest() {
    console.log('🔍 Quick Supabase Connection Test\n');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    console.log('');

    const prisma = new PrismaClient();

    try {
        console.log('⏳ Connecting...');
        await prisma.$connect();
        console.log('✅ Connection successful!\n');

        // Get database version
        const version = await prisma.$queryRaw`SELECT version()`;
        console.log('📊 PostgreSQL version:', version);

        // Count tables
        const tables = await prisma.$queryRaw`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
        console.log('📋 Tables in public schema:', tables);

        console.log('\n✨ Everything looks good!');

    } catch (error) {
        console.error('\n❌ Connection failed!');
        if (error instanceof Error) {
            console.error('Error:', error.message);

            if (error.message.includes("Can't reach database server")) {
                console.error('\n💡 Possible causes:');
                console.error('   1. Your Supabase project is PAUSED (most common)');
                console.error('   2. Network/firewall blocking the connection');
                console.error('   3. Incorrect hostname or credentials');
                console.error('\n📝 To fix:');
                console.error('   - Go to https://app.supabase.com');
                console.error('   - Find your project and click "Restore" if paused');
                console.error('   - Wait a few minutes for it to become active');
            }
        }
    } finally {
        await prisma.$disconnect();
    }
}

quickTest();
