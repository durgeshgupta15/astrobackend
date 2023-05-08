const crypto = require('crypto');
const dotEnv = require('dotenv');
dotEnv.config();

function encryptData(text) {
    const cipher = crypto.createCipheriv(process.env.CRYPTO_ALGO, process.env.SECURITY_KEY, process.env.INIT_VECTOR);
    let encryptedText = cipher.update(text, "utf-8", "hex");
    encryptedText = encryptedText + cipher.final("hex");
    return encryptedText
}

function decryptData(text) {
    const decipher = crypto.createDecipheriv(process.env.CRYPTO_ALGO, process.env.SECURITY_KEY, process.env.INIT_VECTOR);
    let decryptedText = decipher.update(text, "hex", "utf-8");
    decryptedText = decryptedText + decipher.final("utf-8");
    return decryptedText
}

module.exports = {
    encryptData,
    decryptData
}