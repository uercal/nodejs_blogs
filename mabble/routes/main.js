var express = require('express');
var router = express.Router();
var pluginBlog = require('../plugin/blog');
var pluginUser = require('../plugin/user');
var pluginComment = require('../plugin/comment');
//upload
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.get('/', pluginUser.LoginYes);
router.get('/', pluginBlog.getData);

router.get('/add', function(req, res, next) {
    res.render('main/add');
});

router.get('/changeInfoPic', function(req, res, next) {
    res.render('main/change');
})

router.get('/showMessage/:id', pluginComment.showMessage);
router.post('/addMessage/:id', pluginComment.addMessage);
router.post('/addReply/:id', pluginComment.replyMessage);

router.get('/detail/:id', pluginUser.loginNo);
router.get('/detail/:id', pluginBlog.getDetail);

router.post('/upload_pic', multipartMiddleware, pluginBlog.upload_pic);

router.post('/addBlog', pluginBlog.postBlog);

router.post('/changeBack', pluginUser.changeBack);

module.exports = router;