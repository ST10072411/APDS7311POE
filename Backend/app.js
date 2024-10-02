const express = require('express');
const app = express();
const urlprefix= '/api'
const Fruit = require('./models/fruits')

//Setting Up the Mongo DB conection and the SSL connection
const mongoose = require('mongoose');
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');


const options = {
    server:{ sslCA: cert} 
};
const connstring = 
'mongodb+srv://briceagnew1:XmlDtsFnkYjLKxCo@clusterthebigone.lqgt0vn.mongodb.net/farmDatabase?retryWrites=true&w=majority&appName=ClusterTheBigOne';

const fruitRoutes = require("./routes/fruit")

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

app.get('/', (req,res) => {
    res.send('Hello World Express')
})

//Stating the Usage of the route files
app.use(urlprefix+'/fruits',fruitRoutes)

module.exports =app;
