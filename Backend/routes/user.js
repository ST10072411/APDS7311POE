const express = require('express')
const router= express.Router();
const UserHere = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Signup function
  router.post('/signup', (req,res)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new UserHere(
        {
            username: req.body.username,
            password: hash
        })
        user.save()
        .then(result =>{
          res.status(201).json({
            message: 'User created',
            result:result
          })
        })
        .catch(err => {
          res.status(500).json({
            error:err
          })
        })
    })
})

//Login Function
router.post('/login', (req,res)=>{
  let fetchedUser;
  UserHere.findOne({username:req.body.username})
  .then(user=>{
    ///
  }).then(result=>{
    if(!reult)
    {
      return res.status(401),json(
        {
          message: "Authentication Failed!"
        })      
    }

    const token =jwt.sign({username:fetchedUser.username,userid:fetchedUser._id},
                'secret_this_should_be_longer_than_it_is',
                {expiresIn: '1h'});

    res.status(200).json({token:token})
  })
  .catch(err =>{
    return res.status(401).json({
      message: "Authentication Failed!"
    })
  })
})


//#region 
/*
//Retrieve/fetch the User database entries from the cluster
router.get('', (req,res) => {
       ObjectHere.find().then((user)=>(
        res.json(
            {
                message: 'User found',
                user:user
            }
        )
    ))
})




//Delete Function
router.delete('/:id', (req, res) => {
    ObjectHere.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(204).json({ message: "User Deleted" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting User", error: error });
      });
})
*/
//#endregion

module.exports = router