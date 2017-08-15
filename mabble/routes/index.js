var express = require('express');
var router = express.Router();
var pluginUser = require('../plugin/user');


/* GET home page. */

router.get('/', pluginUser.Index);


router.get('/blog', pluginUser.isUser);
router.get('/blog', pluginUser.Blog);

router.get('/portfolio', function(req, res, next) {
    res.render('index/portfolio', { title: 'Portfolio', menu: 2 });
});

router.get('/about', function(req, res, next) {
    res.render('index/about', { title: 'About', menu: 3 });
});



//保存ip (游客模式)
router.post('/saveIp', function(req, res, next) {
    var ip = req.body.ip;
    res.cookie('ip', ip, { maxAge: 60 * 1000 });
    res.send('ok');
});


module.exports = router;