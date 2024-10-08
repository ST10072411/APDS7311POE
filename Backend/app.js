//This appliocation has incorporated several code snippets that were generated by microsoft coopilot and altered to fit the needs of the applications
//Several modules in this application were in some way inspired by or improved by ai usage and respponses

const express = require('express');
const app = express();
const urlprefix= '/api'
const Fruit = require('./models/fruits')

//Setting Up the Mongo DB conection and the SSL connection
const mongoose = require('mongoose');
const fs = require('fs');
const cert = fs.readFileSync('keys/cert.pem');


const options = {
    server:{ sslCA: cert} 
};
//Make an environment variable 
const connstring = 
'mongodb+srv://briceagnew1:XmlDtsFnkYjLKxCo@clusterthebigone.lqgt0vn.mongodb.net/farmDatabase?retryWrites=true&w=majority&appName=ClusterTheBigOne';

/*
const connstring = 
'mongodb+srv://briceagnew1:XmlDtsFnkYjLKxCo@clusterthebigone.lqgt0vn.mongodb.net/paymentPortalDatabase?retryWrites=true&w=majority&appName=ClusterTheBigOne';
*/

//Stating the route Directories
const fruitRoutes = require("./routes/fruit")
const userRoutes = require("./routes/user")
const paymentsRoutes = require('./routes/payment');

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

//Prevents Backend/Frontend communication issues
app.use((reg,res,next)=> 
{ 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});


app.get('/', (req,res) => {
    res.send('Hello World Express')
})

//Stating the Usage of the route files
app.use(urlprefix+'/fruits',fruitRoutes)
app.use(urlprefix+'/users',userRoutes)
app.use(urlprefix+'/payments', paymentsRoutes);


module.exports =app;
