// Test different Supabase connection variations
const variations = [
    'postgresql://postgres:%3Fmanagercourse123@db.qeuewexnlgnhhtwandxd.supabase.co:5432/postgres',
    'postgresql://postgres:%3Fmanagercourse123@db.qeuewexnlgnhhtwandxd.supabase.co:6543/postgres',
    'postgresql://postgres.qeuewexnlgnhhtwandxd:%3Fmanagercourse123@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
];

console.log('Testing different connection string variations:\n');

variations.forEach((connStr, index) => {
    console.log(`${index + 1}. ${connStr.replace(/:[^:@]+@/, ':****@')}`);
    try {
        const url = new URL(connStr);
        console.log(`   Host: ${url.hostname}:${url.port}`);
    } catch (error) {
        console.log(`   ❌ Invalid URL format`);
    }
    console.log('');
});

console.log('\n📝 Common Supabase connection formats:');
console.log('Direct connection (port 5432): db.[ref].supabase.co:5432');
console.log('Connection pooling (port 6543): db.[ref].supabase.co:6543');
console.log('Transaction pooling: [ref].pooler.supabase.com:6543');
