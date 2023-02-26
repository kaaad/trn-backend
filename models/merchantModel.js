const mongoose = require('mongoose');


const merchantSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    rf_token: {
        type: String,
        select: false
    },
    otp: { 
        type: Number,
    }
})

module.exports = mongoose.model('merchant', merchantSchema)