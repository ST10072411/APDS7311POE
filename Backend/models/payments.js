const mongoose = require('mongoose')

const paymentSchema =mongoose.Schema(
    {
        
        recieverName: {type:String, required: true},
        bank: {type:String, required: true},
        accNumber: {type:Number, required: true},
        payAmount: {type:Number, required: true},
        swiftCode: {type:String, required: true}
    }
)

module.exports =mongoose.model('Payment',paymentSchema)