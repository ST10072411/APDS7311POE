const express = require('express');
const router = express.Router();
const EmployeeHere = require('../models/Employee'); // Employee model
const PaymentHere = require('../models/payments'); // Payment model
const checkAuth = require('../check-auth'); // Middleware for authentication

// Add routes here
module.exports = router;

// Request to get pending submissions
router.get('/pending-submissions', checkAuth, async (req, res) => {
    console.log('Route accessed');
    try {
        console.log('Fetching pending payments...');
        const payments = await PaymentHere.find({ status: 'pending' });
        console.log('Retrieved payments:', payments);

        if (payments.length === 0) {
            console.log('No pending payments found');
        }

        res.status(200).json({ message: 'Pending payments retrieved', payments });
    } catch (error) {
        console.error('Error fetching pending payments:', error);
        res.status(500).json({ message: 'Error fetching pending payments', error: error.message });
    }
});




router.patch('/update-status/:id', checkAuth, async (req, res) => {
    const { status } = req.body; // "approved" or "denied"
    
    if (!['approved', 'denied'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const updatedPayment = await PaymentHere.findByIdAndUpdate(
            req.params.id,
            { status: status, processedBy: req.userData.userId, processedAt: new Date() },
            { new: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: `Payment ${status} successfully`, updatedPayment });
    } catch (error) {
        console.error(`Error updating payment status to ${status}:`, error);
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
});


