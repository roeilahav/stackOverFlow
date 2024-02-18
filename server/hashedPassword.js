const crypto = require('crypto');

function generateSHA512Hash(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}

const hashedPassword = generateSHA512Hash('1211');
console.log(hashedPassword);