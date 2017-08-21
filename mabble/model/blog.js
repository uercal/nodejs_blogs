var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    created: Date
});


module.exports = mongoose.model('blog', userSchema);