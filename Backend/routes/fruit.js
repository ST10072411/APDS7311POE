const express = require('express')
const router= express.Router();
const ObjectHere = require('../models/fruits')
const checkauth= require('../check-auth')

//Retrieve/fetch the fruits database entries from the cluster
router.get('', (req,res) => {
       ObjectHere.find().then((fruits)=>(
        res.json(
            {
                message: 'Fruits found',
                fruits:fruits
            }
        )
    ))
})


//Upload/post function
//router.post('',checkauth, (req,res)=>{
router.post('',checkauth, (req,res)=>{
    const fruit = new ObjectHere(
        {
            id: req.body.id,
            name: req.body.name
        }
    )
    fruit.save().then(()=>{
    res.status(201).json({
        message: 'Fruit created',
        fruit:fruit
      })
    })
})




//Delete Function
router.delete('/:id', (req, res) => {
    ObjectHere.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(204).json({ message: "Fruit Deleted" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting fruit", error: error });
      });
})


module.exports = router