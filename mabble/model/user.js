var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    salt: String,
    hashword: String,
    head: String,
    background: String,
    created: Date
});


module.exports = mongoose.model('user', userSchema);