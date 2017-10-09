//加载模型
var modelUser = require('../model/user');
//裁剪模块
var gm = require('gm').subClass({ imageMagick: true });
//保存上传文件
var fs = require('fs');
//
module.exports.changeHead = function(req, res, next) {
    var user = req.session.user;
    var size = req.body.avatar_data.split(',');
    var infos = {
        x: size[0].split(':')[1],
        y: size[1].split(':')[1],
        height: size[2].split(':')[1],
        width: size[3].split(':')[1]
    };
    // console.log(infos);
    var uploadedPath = req.files.avatar_file.path;

    //pic_path
    var dstPath = './public/user_head/' + user + '.jpg';
    //裁剪模块
    // gm(uploadedPath).crop(width, height, x, y)
    gm(uploadedPath).crop(infos.width, infos.height, infos.x, infos.y).write(dstPath, function(err) {
        if (!err) { console.log('crop ok') };
    });
    modelUser.update({ username: user }, { $set: { "head": dstPath.substring(8) } }, function(err) {
        if (err) console.log(err);
    })
    res.send('ok');
}