const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        accountNumber: { type: String, required: true, unique: true },
        accountBalance: { type: Number, default: 0 },
        // ... any other fields ...
    }
)

module.exports =mongoose.model('User', userSchema)