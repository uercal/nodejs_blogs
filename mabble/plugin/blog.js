// 加载模型
var blogModel = require('../model/blog');

//加载插件



module.exports.getData = function(req, res, next) {
    var author = req.session.user;
    var query = blogModel.find({});
    query.where('author', author);

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