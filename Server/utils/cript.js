const crypto = require('crypto');

const key = Buffer.from('0123456789abcdef0123456789abcdef', 'utf-8');
const iv = Buffer.from('abcdef0123456789', 'utf-8');

function encrypt(value) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedValue) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports={encrypt,decrypt}