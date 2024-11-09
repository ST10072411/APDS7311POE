const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
    {
        EmpUsername: { type: String, required: true, unique: true },
        EmpPassword: { type: String, required: true },
        EmpEmail: { type: String, required: true, unique: true },
        // ... any other fields ...
    }
);

module.exports = mongoose.model('Employee', employeeSchema); 