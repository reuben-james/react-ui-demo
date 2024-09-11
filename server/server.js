const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Secret key for encryption and decryption (store securely in production)
const SECRET_KEY = 'PpmU5Vkgbfs7Y5ppFIJ644INlknqseDU'; // Key must be 16, 24, or 32 bytes for AES
const ALGORITHM = 'aes-256-cbc';

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Function to encrypt a string
function encrypt(text) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

// Function to decrypt a cipher text
function decrypt(text) {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// API endpoint to encrypt a string
app.post('/encrypt', (req, res) => {
    const { inputString } = req.body;
    if (!inputString) {
        return res.status(400).json({ error: 'Input string is required' });
    }
    const encryptedText = encrypt(inputString);
    res.json({ encryptedText });
});

// API endpoint to decrypt a string
app.post('/decrypt', (req, res) => {
    const { encryptedString } = req.body;
    if (!encryptedString) {
        return res.status(400).json({ error: 'Encrypted string is required' });
    }
    try {
        const decryptedText = decrypt(encryptedString);
        res.json({ decryptedText });
    } catch (error) {
        res.status(400).json({ error: 'Invalid encrypted string or decryption failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
