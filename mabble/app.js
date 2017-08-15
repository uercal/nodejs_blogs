var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//需要加载的文件
var setting = require('./setting');

//需要加载的模块
//session
var session = require('express-session');

//DB:mongdb -> mongoose
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
//文件上传模块
var multipart = require('connect-multiparty');



var index = require('./routes/index');
var main = require('./routes/main');

var app = express();

// mongoose.connect('mongodb://localhost/mabble');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//上传模块的设置


//配置Session中间件
app.use(session({
    //必要
    resave: false,
    saveUninitialized: true,
    //
    secret: setting.cookieSecret,
    key: setting.key,
    cookie: { maxAge: 1000 * 60 * 60 }, //1 day
    store: new MongoStore({
        db: setting.db,
        host: setting.host,
        port: setting.port
    })
}));




app.use('/', index);
app.use('/main', main);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // next(err);
    res.send('该页面不存在');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;