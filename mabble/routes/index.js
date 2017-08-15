var express = require('express');
var router = express.Router();
var pluginUser = require('../plugin/user');


/* GET home page. */

router.get('/', pluginUser.isUser.index);
router.get('/', pluginUser.Index);


router.get('/blog', pluginUser.isUser.blog);
router.get('/blog', pluginUser.Blog);


router.get('/portfolio', pluginUser.isUser.portfolio);
router.get('/portfolio', pluginUser.Portfolio);


router.get('/about', pluginUser.isUser.about);
router.get('/about', pluginUser.About);



//保存ip (游客模式)
router.post('/saveIp', function(req, res, next) {
    var ip = req.body.ip;
    res.cookie('ip', ip, { maxAge: 60 * 1000 * 60 }); //1 hour
    res.send('ok');
});




module.exports = router;