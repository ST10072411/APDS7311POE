const express = require('express')
const router= express.Router();
const UserHere = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
         /* const user = new UserHere({
              username: req.body.username,
              password: hash
          });*/

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
// Login Route (Assuming you have a User model with these fields)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed: User not found' });
      }
  
      // Check the password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Authentication failed: Incorrect password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the token and user info in the response
      res.status(200).json({
        message: 'Login successful',
        token: token,
        user: {
          username: user.username,
          accountNumber: user.accountNumber,
          accountBalance: user.accountBalance
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Login error', error });
    }
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