// Test URL parsing
const connectionString = 'postgresql://postgres:%3Fmanagercourse123@db.qeuewexnlgnhhtwandxd.supabase.co:5432/postgres';

console.log('Original connection string:', connectionString);
console.log('\nParsing URL...');

try {
    const url = new URL(connectionString);
    console.log('Protocol:', url.protocol);
    console.log('Username:', url.username);
    console.log('Password:', url.password);
    console.log('Hostname:', url.hostname);
    console.log('Port:', url.port);
    console.log('Pathname:', url.pathname);
} catch (error) {
    console.error('Failed to parse URL:', error);
}

// Also test with the Prisma client
console.log('\n--- Testing with Prisma ---');
import('dotenv').then(dotenv => {
    dotenv.config();
    console.log('DATABASE_URL from env:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
});
