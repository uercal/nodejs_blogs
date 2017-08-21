var express = require('express');
var router = express.Router();
var pluginBlog = require('../plugin/blog');


router.get('/', pluginBlog.getData);


module.exports = router;