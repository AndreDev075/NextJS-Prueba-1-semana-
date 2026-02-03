// Verify the exact hostname format
const refId = 'qeuewexnlgnhhtwandxd';

console.log('🔍 Verifying Supabase hostname formats:\n');

const formats = [
    `db.${refId}.supabase.co`,
    `aws-0-us-east-1.pooler.supabase.com`,
    `aws-0-us-west-1.pooler.supabase.com`,
    `aws-0-eu-central-1.pooler.supabase.com`,
];

console.log('Reference ID:', refId);
console.log('\nPossible hostnames to check in your Supabase dashboard:\n');

formats.forEach((host, i) => {
    console.log(`${i + 1}. ${host}`);
});

console.log('\n📝 Instructions:');
console.log('1. Go to https://app.supabase.com');
console.log('2. Select your project');
console.log('3. Go to Settings → Database');
console.log('4. Look for "Connection string" section');
console.log('5. Copy the EXACT hostname from there');
console.log('\nThe connection string should look like:');
console.log('postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[HOSTNAME]:5432/postgres');
console.log('\nOR');
console.log('postgresql://postgres:[PASSWORD]@[HOSTNAME]:5432/postgres');
