const https = require('https');
const app = require('./app');
const fs = require('fs');
const cors = require('cors');

const port = 3000;

// CORS options
const corsOptions = {
    origin: 'https://localhost:5173/', // Update this to your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

// Define the correct paths for the SSL key and certificate
const keyPath = __dirname + '/../backend/keys/key.pem'; // Adjusted path to key.pem
const certPath = __dirname + '/../backend/keys/cert.pem'; // Adjusted path to cert.pem

// Log the paths for debugging
console.log('Loading SSL Key from:', keyPath);
console.log('Loading SSL Certificate from:', certPath);

// Create the HTTPS server
const server = https.createServer(
    {
        key: fs.readFileSync(keyPath),  // Load the key
        cert: fs.readFileSync(certPath)  // Load the certificate
    },
    app
);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
