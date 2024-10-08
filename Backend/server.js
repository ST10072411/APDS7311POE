const https = require('https');
const app = require('./app');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000; // Use PORT from env

// CORS options
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    methods: process.env.CORS_ALLOWED_METHODS || 'GET,POST,PUT,DELETE',
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

// Define the correct paths for the SSL key and certificate
const keyPath = __dirname + process.env.SSL_KEY_PATH; // Adjusted path to key.pem
const certPath = __dirname + process.env.SSL_CERT_PATH; // Adjusted path to cert.pem

// Log paths for debugging
console.log('Loading SSL Key from:', keyPath);
console.log('Loading SSL Certificate from:', certPath);

// Create the HTTPS server
const server = https.createServer(
    {
        key: fs.readFileSync(keyPath),  
        cert: fs.readFileSync(certPath)  
    },
    app
);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
