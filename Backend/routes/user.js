const express = require('express')
const router= express.Router();
const UserHere = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();


//Does this work?
const sanitizeInput= (input) => {
    return input.replace(/[^a-zA-Z0-9 ]/g, '');
}

//Signup function
router.post('/signup', async (req, res) => {
    
    //input validationnpm
    const { username, password, confirmPassword, firstName, lastName, email, accountNumber, idNumber } = req.body;

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedAccountNumber = sanitizeInput(accountNumber);
    const sanitizedIdNumber = sanitizeInput(idNumber);

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    //encryption
    bcrypt.hash(req.body.password, 10)
      .then(hash => {

          const user = new UserHere({
            username: sanitizedUsername,
            password: hash,
            firstName: sanitizedFirstName,
            lastName: sanitizedLastName,
            email: sanitizedEmail,
            accountNumber: sanitizedAccountNumber,
            idNumber: sanitizedIdNumber
          });
          console.log("Thing stored?")
          user.save()
              .then(result => {
                  res.status(201).json({
                      message: 'User created',
                      result: result
                  });
                  
              })
              .catch(err => {
                  res.status(500).json({
                      error: err
                  });
              });
      });
});

 //Login Function
router.post('/login', (req, res) => {
  UserHere.findOne({ username: req.body.username })
      .then(user => {
          if (!user) {
              console.log("User not found");
              return res.status(401).json({
                  message: "Authentication Failed!"
              });
          }

          console.log("User found:", user);
          console.log("Input password:", req.body.password);
          console.log("Stored hashed password:", user.password);


          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
              if (err) {
                  console.error('Error comparing passwords:', err);
                  return res.status(500).json({
                      message: "Error during authentication"
                  });
              }

              console.log("Password comparison result:", isMatch);

              if (!isMatch) {
                  console.log("Password does not match");
                  return res.status(401).json({
                      message: "Authentication Failed!"
                  });
              }

              const token = jwt.sign(
                  { username: user.username, userId: user._id },
                  process.env.SECRET_TOKEN,
                  { expiresIn: '1h' }
              );
              console.log("Authentication successful, token generated");
              res.status(200).json({ token: token });
          });
      })
      .catch(err => {
          console.log("Error during authentication", err);
          return res.status(500).json({
              message: "Error during authentication"
          });
      });
}); 

//#region 
/*
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