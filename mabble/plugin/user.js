//游客模式 下是否已获取客户端ip
module.exports.isIpSaved = function(req, res, next) {
    if (req.cookies.ip) {
        next();
    } else {
        res.redirect('/');
    }
};


//主页
module.exports.Index = function(req, res, next) {
    //是否用户登录
    if (req.session.user) {
        //用户
        res.render('index/index', {
            title: 'Index',
            menu: 0,
            type: 'u',
            code: req.session.user.username

        });
    } else {
        //游客
        res.render('index/index', {
            title: 'Index',
            menu: 0,
            type: 'c',
            code: req.cookies.ip
        });

    }
};


//blog展示页面
module.exports.Blog = function(req, res, next) {
    //是否用户登录
    if (req.session.user) {
        //用户
        res.render('index/blog', {
            title: 'Blog',
            menu: 1,
            data: ['u', req.session.user.username]
        });
    } else {
        //游客
        res.render('index/blog', {
            title: 'Blog',
            menu: 1,
            data: ['c', req.cookies.ip]
        });

    }
};








//游客or用户
module.exports.isUser = function(req, res, next) {
    if (req.session.user) {
        //用户
        next();
    } else {
        //游客
        if (req.cookies.ip) {
            next();
        } else {
            res.redirect('/');
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