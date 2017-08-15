var url = require('url');



//游客模式 下是否已获取客户端ip [游客评论时候必用！！！]
module.exports.isIpSaved = function(req, res, next) {
    if (req.cookies.ip) {
        next();
    } else {
        res.redirect('/');
    }
};


//主页
module.exports.Index = function(u, req, res, next) {
    res.render('index/index', {
        title: 'Index',
        menu: 0,
        type: 'u',
        code: req.session.user.username
    })

}


//blog展示页面
module.exports.Blog = function(req, res, next) {

    res.render('index/blog', {
        title: 'Blog',
        menu: 1,
        type: 'u',
        coade: req.session.user.username
    });

};


//PoPortfolio
module.exports.Portfolio = function(req, res, next) {
    res.render('index/portfolio', {
        title: 'Portfolio',
        menu: 2,
        type: 'u',
        coade: req.session.user.username
    });
}


//About
module.exports.About = function(req, res, next) {
    res.render('index/about', {
        title: 'About',
        menu: 3,
        code: req.cookies.ip
    });
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
            res.render('index/blog', {
                title: 'Blog',
                menu: 1,
                type: 'c',
                code: req.cookies.ip
            })
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