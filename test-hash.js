const bcrypt = require('bcryptjs');

async function testHash() {
    const password = 'password123';
    const hashFromDB = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.Ejwu.K';

    console.log('Testing password:', password);
    console.log('Against hash:', hashFromDB);

    const match = await bcrypt.compare(password, hashFromDB);
    console.log('Match result:', match);

    // Generate new hash with bcryptjs
    console.log('\n--- Generating new hash with bcryptjs ---');
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(password, salt);
    console.log('New hash:', newHash);

    const newMatch = await bcrypt.compare(password, newHash);
    console.log('New hash match:', newMatch);
}

testHash();
