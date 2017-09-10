//加载模型
var modelUser = require('../model/user');
var blogModel = require('../model/blog');
//
var pluginBlog = require('./blog');
//加载加密模块
var utility = require('utility');
//加载生成随机模块
var uuid = require('node-uuid');

//游客模式 下是否已获取客户端ip [游客评论时候必用！！！]
module.exports.isIpSaved = function(req, res, next) {
    if (req.cookies.ip) {
        next();
    } else {
        res.redirect('/');
    }
};


//主页
module.exports.Index = function(req, res, next) {
    res.render('index/index', {
        title: 'Index',
        menu: 0,
        type: 'u',
        code: req.session.user
    })

}


//blog展示页面
module.exports.Blog = function(req, res, next) {
    var blog = blogModel.find({});
    blog.limit(8);
    blog.sort('-created');
    blog.select('_id title author background created');
    blog.exec(function(err, data) {
        var blogs = data;
        res.render('index/blog', {
            title: 'Blog',
            menu: 1,
            type: 'u',
            code: req.session.user,
            recent: blogs
        });
    });


};


//PoPortfolio
module.exports.Portfolio = function(req, res, next) {
    res.render('index/portfolio', {
        title: 'Portfolio',
        menu: 2,
        type: 'u',
        coade: req.session.user
    });
}


//About
module.exports.About = function(req, res, next) {
    res.render('index/about', {
        title: 'About',
        menu: 3,
        type: 'u',
        coade: req.session.user
    });
}




//POST:注册/登录
module.exports.Regist = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = uuid.v4();
    // console.log(salt);
    var postData = {
        username: username,
        salt: salt,
        hashword: utility.sha1(password + salt),
        created: Date.now()
    };
    //
    var resJson = {
        msg: '',
        state: false
    };
    //
    modelUser.findOne({
        username: username
    }, function(err, data) {
        if (err) {
            console.log(err);
            resJson.msg = 'error';
            res.send(resJson);
        }
        if (data) {
            //
            resJson.msg = '用户名已存在';
            res.send(resJson);
        } else {
            //
            modelUser.create(postData, function(err) {
                if (err) {
                    console.log(err);
                    resJson.msg = 'regist-Error!';
                    res.send(resJson);
                } else {
                    resJson.msg = '注册成功';
                    resJson.state = true;
                    //
                    req.session.user = username;
                    res.send(resJson);
                }
            });
        }
    })
}


module.exports.Login = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    //
    var resJson = {
        msg: '',
        state: false
    };
    //
    modelUser.findOne({
        username: username
    }, function(err, data) {
        if (err) {
            console.log(err);
            resJson.msg = 'error!';
            res.send(resJson);
        }
        if (data) {
            var salt = data.salt;
            var hashword = data.hashword;
            var _hashword = utility.sha1(password + salt);
            if (hashword == _hashword) {
                //密码匹配
                req.session.user = username;
                resJson.msg = '登录成功';
                resJson.state = true;
                res.send(resJson);
            } else {
                //密码错误
                resJson.msg = '密码错误';
                res.send(resJson);
            }
        } else {
            resJson.msg = '用户不存在';
            res.send(resJson);
        }
    })

}











//游客中间件
module.exports.isUser = {
    index: function(req, res, next) {
        if (req.session.user) {
            //用户        
            next();
        } else {
            //游客                          
            res.render('index/index', {
                title: 'Index',
                menu: 0,
                type: 'c',
                code: req.cookies.ip
            })
        }
    },
    blog: function(req, res, next) {
        if (req.session.user) {
            //用户        
            next();
        } else {
            //游客
            var blog = blogModel.find({});
            blog.limit(8);
            blog.sort('-created');
            blog.select('_id title author background created');
            blog.exec(function(err, data) {
                res.render('index/blog', {
                    title: 'Blog',
                    menu: 1,
                    type: 'c',
                    code: req.cookies.ip,
                    recent: data
                });
            });
        }

    },
    portfolio: function(req, res, next) {
        if (req.session.user) {
            //用户        
            next();
        } else {
            //游客
            res.render('index/portfolio', {
                title: 'Portfolio',
                menu: 2,
                type: 'c',
                code: req.cookies.ip
            })
        }
    },
    about: function(req, res, next) {
        if (req.session.user) {
            //用户        
            next();
        } else {
            //游客
            res.render('index/about', {
                title: 'About',
                menu: 3,
                type: 'c',
                code: req.cookies.ip
            })
        }
    }
}


//预防中间件
//用户已登录
module.exports.LoginYes = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {

    }
};


//未登录
module.exports.loginNo = function(req, res, next) {
    if (!req.session.user) {
        next();
    } else {

    }
};