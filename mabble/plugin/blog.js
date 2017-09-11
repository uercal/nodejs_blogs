// 加载模型
var blogModel = require('../model/blog');
//加载插件
//保存上传文件
var fs = require('fs');


//获取当前作者的blog
module.exports.getData = function(req, res, next) {
    var author = req.session.user;
    var query = blogModel.find({});
    query.where('author', author);
    query.sort('-created');
    query.exec(function(err, data) {
        if (err) {
            console.log(err)
            return;
        }
        res.render('main/info', {
            data: data
        });
    })
}

//发表新blog
module.exports.postBlog = function(req, res, next) {
    var user = req.session.user;
    var uploadedPath = req.body.background;
    var dstPath = './public/blog_pic/' + user + '_' + Date.now().toString() + '.jpg';
    // console.log(dstPath);
    //重命名为真实文件名
    fs.rename(uploadedPath, dstPath, function(err) {
        if (err) {
            console.log('rename error: ' + err);
        } else {
            console.log('rename ok');
        }
    });

    var postData = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.user,
        background: dstPath.substring(8),
        comments: [],
        created: Date.now()
    };

    var resJson = {
        msg: '',
        state: false
    };

    blogModel.create(postData, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        resJson.msg = 'add successed';
        resJson.state = true;
        res.send(resJson);
    });
}


module.exports.getDetail = function(req, res, next) {
    var id = req.params.id;
    blogModel.findOne({
        _id: id
    }, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('main/detail', {
            blog: data
        });
    })
}






//上传背景图片等接口
module.exports.upload_pic = function(req, res, next) {

    var path = req.files.file.path;
    var resJson = {
        "code": 0,
        "msg": "",
        "path": path,
        "src": "//localhost:3000/" + path.substring(7)
    };
    // console.log(path);
    res.send(resJson);
}