const express = require('express');
const router = express.Router();
const Payment = require('../models/payments'); // Use consistent variable names
const User = require('../models/users'); // Import User model
const checkAuth = require('../check-auth');

// Retrieve all payments
router.get('', checkAuth, async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json({
            message: 'Payments found',
            payments: payments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
});

// Create a new payment
router.post('', checkAuth, async (req, res) => {
    try {
        const payment = new Payment({
            payerId: req.userData.userId,
            recieverName: req.body.recieverName,
            bank: req.body.bank,
            accNumber: req.body.accNumber,
            payAmount: Number(req.body.payAmount),
            swiftCode: req.body.swiftCode
        });
        await payment.save();
        res.status(201).json({
            message: 'Payment created',
            payment: payment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
});

// Approve or deny a payment
router.patch('/:id', checkAuth, async (req, res) => {
    const { status } = req.body; // "approved" or "denied"

    if (!['approved', 'denied'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (status === 'approved') {
            // Deduct amount from user's account balance
            const user = await User.findById(payment.payerId);
            if (!user) {
                return res.status(404).json({ message: 'Payer not found' });
            }

            if (user.accountBalance < payment.payAmount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            user.accountBalance -= payment.payAmount;
            await user.save();
        }

        payment.status = status;
        payment.processedBy = req.userData.userId;
        payment.processedAt = new Date();
        await payment.save();

        res.json({ message: `Payment ${status}`, payment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
});

// Delete a payment
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        await Payment.deleteOne({ _id: req.params.id });
        res.status(204).json({ message: "Payment Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error: error.message });
    }
});

module.exports = router;
