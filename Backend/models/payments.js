const mongoose = require('mongoose')

const paymentSchema =mongoose.Schema(
    {
        //PayerName: {type:String, required: true},
        recieverName: {type:String, required: true},
        bank: {type:String, required: true},
        accNumber: {type:Number, required: true},
        payAmount: {type:Number, required: true},
        swiftCode: {type:String, required: true}
    }
)

module.exports =mongoose.model('Payment',paymentSchema)