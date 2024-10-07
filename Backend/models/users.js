const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        accountNumber: { type: String, required: true },
        idNumber: { type: String, required: true },
    }
)

module.exports =mongoose.model('User', userSchema)