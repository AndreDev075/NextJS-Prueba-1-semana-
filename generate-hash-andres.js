const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'andresmon33';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nSQL Query to update andres3@lms.com:');
    console.log(`UPDATE "User" SET password = '${hash}', "updatedAt" = NOW() WHERE email = 'andres3@lms.com';`);
}

generateHash();
