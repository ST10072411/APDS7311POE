//const http = require('http');
const https = require('https');
const app = require('./app');
const fs = require('fs');
const cors = require('cors');

const port = 3000

const corsOptions = {
    origin: 'http://localhost:5173/', // Update this to your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };

  app.use(cors(corsOptions));

/*
  app.use((req, res, next) => {
    if (req.secure) {
      next(); // Request was via https, so do no special handling
    } else {
      res.redirect('https://' + req.headers.host + req.url); // Redirect to https
    }
  });*/

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