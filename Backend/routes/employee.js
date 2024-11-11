const express = require('express');
const router = express.Router();
const EmployeeHere = require('../models/Employee'); // Employee model
const PaymentHere = require('../models/payments'); // Payment model
const checkAuth = require('../check-auth'); // Middleware for authentication

// Add routes here
module.exports = router;

// Request to get pending submissions
router.get('/pending-submissions', checkAuth, async (req, res) => {
    // Ensure only employees can access this route
    if (req.userData.userType !== 'employee') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const payments = await PaymentHere.find({ status: 'pending' });
        res.status(200).json({ message: 'Pending payments retrieved', payments });
    } catch (error) {
        console.error('Error fetching pending payments:', error);
        res.status(500).json({ message: 'Error fetching pending payments', error: error.message });
    }
});


router.patch('/update-status/:id', checkAuth, async (req, res) => {
    // Ensure only employees can access this route
    if (req.userData.userType !== 'employee') {
        return res.status(403).json({ message: 'Access denied' });
    }

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