// 加载模型
var blogModel = require('../model/blog');


module.exports.showMessage = function(req, res, next) {
    var id = req.params.id;
    if (req.session.user) {
        var name = req.session.user;
    } else {
        var name = req.cookies.ip;
    }
    var query = blogModel.find({});
    query.where('_id', id);
    query.select('comments');
    query.exec(function(err, data) {
        var blog = data[0]['comments'];
        blog.reverse();
        // console.log(blog);
        res.render('main/showMessage', {
            name: name,
            id: id,
            data: blog
        })
    })
}


module.exports.addMessage = function(req, res, next) {
    var id = req.params.id;
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    if (m < 10) m = '0' + m;
    var s = myDate.getSeconds();
    if (s < 10) s = '0' + s;
    var now = year + '-' + month + "-" + date + " " + h + ':' + m + ":" + s;
    now = now.toString();
    var comment = {
        name: req.body.name,
        head: req.body.head,
        content: req.body.content,
        time: now,
        pv: 0
    };
    blogModel.findByIdAndUpdate(id, { $push: { comments: comment } }, function(err) {
        if (err) {
            console.log(err);
        }
        res.send('ok');
    })
}

module.exports.replyMessage = function(req, res, next) {

}