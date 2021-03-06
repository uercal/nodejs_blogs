var express = require('express');
var router = express.Router();
var pluginUser = require('../plugin/user');
var pluginBlog = require('../plugin/blog');
var pluginOther = require('../plugin/other');
//muti模块
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* GET home page. */

router.get('/', pluginUser.isUser.index);
router.get('/', pluginUser.Index);


//头像
router.get('/changeHead', function(req, res, next) {
    res.render('index/head');
});
router.post('/changeHead', multipartMiddleware, pluginOther.changeHead);



// router.get('/blog', pluginBlog.getRencet);
router.get('/blog', pluginUser.isUser.blog);
router.get('/blog', pluginUser.Blog);


router.get('/portfolio', pluginUser.isUser.portfolio);
router.get('/portfolio', pluginUser.Portfolio);


router.get('/about', pluginUser.isUser.about);
router.get('/about', pluginUser.About);


// 登录&注册

router.post('/login', pluginUser.Login);

router.post('/regist', pluginUser.Regist);



//退出用户模式

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

//保存ip (游客模式)
router.post('/saveIp', function(req, res, next) {
    var ip = req.body.ip;
    res.cookie('ip', ip, { maxAge: 60 * 1000 * 60 }); //1 hour
    res.send('ok');
});

router.get('/getIp', pluginUser.getIp);


module.exports = router;