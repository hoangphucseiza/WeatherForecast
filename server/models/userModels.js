const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    email: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    emailToken: String,
});

module.exports = mongoose.model('User', UserSchema);