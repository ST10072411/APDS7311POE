//const http = require('http');
const https = require('https');
const app = require('./app');
const fs = require('fs');
const cors = require('cors');

const port = 3000

const corsOptions = {
    origin: 'https://localhost:5173/', // Update this to your frontend URL
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

