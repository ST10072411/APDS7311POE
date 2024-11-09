const express = require('express');
const router = express.Router();
const UserHere = require('../models/users');
const EmployeeHere = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = require('../check-auth');

// Input validation using regex
const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9 _-]/g, ''); // Allows alphanumeric, spaces, underscores, and hyphens
}

// Define regex patterns for validation
const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/; // 3-20 characters, letters, numbers, underscores, hyphens
const namePattern = /^[a-zA-Z\s-]{1,50}$/; // 1-50 characters, letters, spaces, hyphens
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email validation
const accountNumberPattern = /^\d{10}$/; // 10-digit account number
const idNumberPattern = /^\d{6,10}$/; // 6 to 10 digit ID number

// Signup function
router.post('/signup', async (req, res) => {
    // Input validation
    const { username, password, confirmPassword, firstName, lastName, email, accountNumber, idNumber } = req.body;
/*
    // Validate inputs
    if (!usernamePattern.test(username)) {
        return res.status(400).json({ message: 'Invalid username format' });
    }
    if (!namePattern.test(firstName)) {
        return res.status(400).json({ message: 'Invalid first name format' });
    }
    if (!namePattern.test(lastName)) {
        return res.status(400).json({ message: 'Invalid last name format' });
    }
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!accountNumberPattern.test(accountNumber)) {
        return res.status(400).json({ message: 'Invalid account number format' });
    }
    if (!idNumberPattern.test(idNumber)) {
        return res.status(400).json({ message: 'Invalid ID number format' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
*/
 
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedAccountNumber = sanitizeInput(accountNumber);
    const sanitizedIdNumber = sanitizeInput(idNumber);

    
    bcrypt.hash(password, 10)
        .then(hash => {
            const user = new UserHere({
                username: sanitizedUsername,
                password: hash,
                firstName: sanitizedFirstName,
                lastName: sanitizedLastName,
                email: sanitizedEmail,
                accountNumber: sanitizedAccountNumber,
                idNumber: sanitizedIdNumber,
                accountBalance: 0 
            });
            console.log("User object created:", user);
            user.save()
                .then(savedUser => {
                    console.log("User saved successfully:", savedUser);
                    res.status(201).json({
                        message: 'User created',
                        result: savedUser
                    });
                })
                .catch(err => {
                    console.error("Error saving user:", err);
                    res.status(500).json({
                        error: err.message,
                        stack: err.stack
                    });
                });
        })
        .catch(err => {
            console.error("Error hashing password:", err);
            res.status(500).json({
                error: err.message,
                stack: err.stack
            });
        });
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!usernamePattern.test(username)) {
        return res.status(400).json({ message: 'Invalid username format' });
    }

    try {
        // First, check in the users table
        let user = await UserHere.findOne({ username: username });
        
        if (!user) {
            // If not found, check in the employees table
            user = await EmployeeHere.findOne({ EmpUsername: username });
            if (!user) {
                console.log("User not found in both tables");
                return res.status(401).json({
                    message: "Authentication Failed!"
                });
            }
        }

        console.log("User found:", user);
        const isMatch = await bcrypt.compare(password, user.password || user.EmpPassword); // Compare with the appropriate password field

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(401).json({
                message: "Authentication Failed!"
            });
        }

        const userType = user.EmpUsername ? 'employee' : 'customer'; // Determine userType based on the user found
        const token = jwt.sign(
            { 
                username: user.username || user.EmpUsername, 
                userId: user._id, 
                userType: userType // Send the correct userType
            },
            'secret_this_should_be_longer_than_it_is',
            { expiresIn: '1h' }
        );
        console.log("Authentication successful, token generated");
        console.log("Generated token:", token);
        res.status(200).json({ token: token, userType: userType }); // Include userType in the response
        
    } catch (err) {
        console.log("Error during authentication", err);
        return res.status(500).json({
            message: "Error during authentication"
        });
    }
});


router.get('/me', checkAuth, async (req, res) => {
    try {
        const user = await UserHere.findById(req.userData.userId);
        if (!user) {
            console.log('User not found for ID:', req.userData.userId);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User data being sent:', user);
        res.status(200).json({
            firstName: user.firstName,
            accountNumber: user.accountNumber,
            accountBalance: user.accountBalance.toFixed(2),
            username: user.username
        });
    } catch (error) {
        console.error('Error in /me route:', error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});

module.exports = router;
