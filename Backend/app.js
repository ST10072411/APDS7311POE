//This appliocation has incorporated several code snippets that were generated by microsoft coopilot and altered to fit the needs of the applications
//Several modules in this application were in some way inspired by or improved by ai usage and respponses

const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // Import rate limit
require('dotenv').config();
const urlprefix= '/api'
const morgan = require('morgan');
//Setting Up the Mongo DB conection and the SSL connection
const mongoose = require('mongoose');
const fs = require('fs');
const pathToCert = __dirname + '/../backend/keys/cert.pem';
console.log('Loading SSL Certificate from:', pathToCert); // Log the path

const cert = fs.readFileSync(pathToCert, 'utf8'); // Load the certificate


const options = {
    server:{ sslCA: cert} 
};
//Make an environment variable 
const connstring = process.env.DB_CONNSTRING
//'mongodb+srv://briceagnew1:XmlDtsFnkYjLKxCo@clusterthebigone.lqgt0vn.mongodb.net/farmDatabase?retryWrites=true&w=majority&appName=ClusterTheBigOne';

/*
const connstring = 
'mongodb+srv://briceagnew1:XmlDtsFnkYjLKxCo@clusterthebigone.lqgt0vn.mongodb.net/paymentPortalDatabase?retryWrites=true&w=majority&appName=ClusterTheBigOne';
*/

//Stating the route Directories
const userRoutes = require("./routes/user")
const paymentsRoutes = require('./routes/payment');
const employeeRoutes = require('./routes/employee');


mongoose.connect(connstring)
.then(()=>
{
    console.log('connected :D')
})
.catch((error)=>
{
    console.log('NOT connected!!!')
},options);


app.use(express.json())

// Use 'combined' for detailed logging, or 'dev' for concise
app.use(morgan('dev'));

//Prevents Backend/Frontend communication issues
app.use((reg,res,next)=> 
{ 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter); // limit on all requests

app.get('/', (req, res) => {
    res.send('Hello World Express');
});


//Stating the Usage of the route files
app.use(urlprefix+'/users',userRoutes)
app.use(urlprefix+'/payments', paymentsRoutes);
app.use(urlprefix + '/employee', employeeRoutes);
app.use(cors());


module.exports =app;