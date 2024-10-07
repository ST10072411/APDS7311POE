const express = require('express')
const router= express.Router();
const ObjectHere = require('../models/Payments')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkauth= require('../check-auth')

//Retrieve/fetch the Payment database entries from the cluster
router.get('',checkauth, (req,res) => {
       ObjectHere.find().then((payments)=>{
        res.json(
            {
                message: 'payment found',
                payments:payments
            })
        }).catch((error) => {
            res.status(500).json({ message: 'Error fetching payments', error: error });
        });
})


//Upload/post function
//router.post('',checkauth, (req,res)=>{
router.post('',checkauth, (req,res)=>{
    const payment = new ObjectHere(
        {
            recieverName: req.body.recieverName,
            bank: req.body.bank,
            accNumber: req.body.accNumber,
            payAmount: req.body.payAmount,
            swiftCode: req.body.swiftCode
        }
    )
    payment.save().then(()=>{
    res.status(201).json({
        message: 'Payment created',
        payment:payment
      })
    }).catch((error) => {
        res.status(500).json({ message: 'Error creating payment', error: error });
    });
})




//Delete Function
router.delete('/:id', (req, res) => {
    ObjectHere.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(204).json({ message: "Payment Deleted" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting Payment", error: error });
      });
})


// Update payment status to approved or denied
router.patch('/:id', checkauth, (req, res) => {
    const status = req.body.status; // Expecting 'approved' or 'denied'
    Payment.updateOne({ _id: req.params.id }, { status: status }).then((result) => {
        res.status(200).json({ message: `Payment ${status}` });
    }).catch((error) => {
        res.status(500).json({ message: `Error updating payment status to ${status}`, error: error });
    });
});

module.exports = router