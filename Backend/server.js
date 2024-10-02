//const http = require('http');
const https = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000

const server = https.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    },app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});


/*Part 3
const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello World Express!')
})

app.listen(port)
*/

/* Part 2
const http = require('http');

const PORT = 3000

const server= http.createServer((req,res)=>{
    res.end('Hello World132!');
});

server.listen(PORT)
*/

/* Part 1
console.log('Hello World');*/