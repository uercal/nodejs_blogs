var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('main/info', { title: 'Info' });
});


module.exports = router;