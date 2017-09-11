var express = require('express');
var router = express.Router();
var pluginBlog = require('../plugin/blog');
var pluginUser = require('../plugin/user');
//upload
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.get('/', pluginUser.LoginYes);
router.get('/', pluginBlog.getData);

router.get('/add', function(req, res, next) {
    res.render('main/add');
});

router.get('/showMessage', function(req, res, next) {
    res.render('main/showMessage');
});

router.get('/detail/:id', pluginBlog.getDetail);

router.post('/upload_pic', multipartMiddleware, pluginBlog.upload_pic);

router.post('/addBlog', pluginBlog.postBlog);

module.exports = router;