const mongoose = require('mongoose')

const paymentSchema =mongoose.Schema(
    {
        //PayerName: {type:String, required: true},
        recieverName: {type:String, required: true},
        bank: {type:String, required: true},
        accNumber: {type:Number, required: true},
        payAmount: {type:Number, required: true},
        swiftCode: {type:String, required: true},
        status: { type: String, default: "pending" }, // "pending", "approved", "denied"
        processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Employee ID
        processedAt: { type: Date, default: null } // Timestamp of action

    }
)

module.exports =mongoose.model('Payment',paymentSchema)