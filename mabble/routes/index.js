var express = require('express');
var router = express.Router();



/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index/index', { title: 'Express' , menu:0});
});

router.get('/blog',function(req , res, next){
  res.render('index/blog',{ title: 'blog' , menu:1});
})

router.get('/portfolio', function(req , res, next){
  res.render('index/portfolio',{ title: 'Portfolio', menu:2});
});

router.get('/about', function(req, res, next){
  res.render('index/about', {title: 'About' ,menu:3});
});


module.exports = router;
