var express = require('express');
var router = express.Router();
var pluginBlog = require('../plugin/blog');
//upload
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/', pluginBlog.getData);

router.get('/add', function(req, res, next) {
    res.render('main/add');
});


router.post('/upload_pic', multipartMiddleware, pluginBlog.upload_pic);

router.post('/addBlog', pluginBlog.postBlog);

module.exports = router;