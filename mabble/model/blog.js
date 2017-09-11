var mongoose = require('mongoose');

var replySchema = new mongoose.Schema({
    name: String,
    content: String,
    time: String,
    reply: [this],
    pv: {
        type: Number,
        default: 0
    }
});

var commentSchema = new mongoose.Schema({
    name: String,
    head: String,
    content: String,
    time: String,
    reply: [replySchema],
    pv: {
        type: Number,
        default: 0
    }
});

var blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    background: String,
    comments: [commentSchema],
    created: Date
});


module.exports = mongoose.model('blog', blogSchema);