const express = require('express');
const app = express();
const urlprefix= '/api'
const Fruit = require('./models/fruits')

const mongoose = require('mongoose');
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
//

const options = {
    server:{ sslCA: cert} 
};
const connstring = 
'mongodb+srv://briceagnew1:XmlDtsFnkYjLKxCo@clusterthebigone.lqgt0vn.mongodb.net/farmDatabase?retryWrites=true&w=majority&appName=ClusterTheBigOne';

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


app.get(urlprefix+'/fruits', (req,res) => {
   
    /* Earlier Hardcoded local array[]
   const orders= [
        { 
            id: "1",
            name: "Orange"
        },
        { 
            id: "2",
            name: "Banana"
        },
        { 
            id: "3",
            name: "Pear"
        },
    ]
    res.json(
        {
            message: "Fruits",
            orders: orders
        }
    )*/

    //Retrieve/fetch the fruits database entries from the cluster
    Fruit.find().then((fruits)=>(
        res.json(
            {
                message: 'Fruits found',
                fruits:fruits
            }
        )
    ))
})


//Upload/post function
app.post(urlprefix+'/fruits',(req,res)=>{
    const fruit = new Fruit(
        {
            id: req.body.id,
            name: req.body.name
        }
    )
    fruit.save();
    res.status(201).json({
        message: 'Fruit created',
        fruit:fruit
    })
})

//Delete function
app.delete(urlprefix+"/fuits/:id", (req,res)=>{
    Fruit.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Fruit Deleted"});
    });
})

/*
app.post(urlprefix + '/fruits', (req, res) => {
    const fruit = new Fruit({
        id: req.body.id,
        name: req.body.name
    });

    fruit.save()
        .then(savedFruit => {
            res.status(201).json({
                message: 'Fruit created',
                fruit: savedFruit
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error creating fruit',
                error: error.message
            });
        });
});
*/

module.exports =app;
