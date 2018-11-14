const fs = require('fs');

const JSON_PATH = './utils/userInfo.json';
/**
 * @description 覆盖写入JSON文件用户内容
 * @author zhangdj
 * @date 2018-08-01
 * @param {Object} params
 */
function write(params) {
    fs.writeFile(JSON_PATH, JSON.stringify(params), function (err) {
        if (err) throw err;
        console.log('用户权限信息写入成功');
    })
}


/**
 * @description 读取JSON文件内容
 * @author zhangdj
 * @date 2018-08-01
 * @returns 
 */
function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(JSON_PATH, function (err, data) {
            if (err) {
                console.log('读取用户登录文件失败', err);
                reject(err);
                return;
            }
            resolve(JSON.parse(data.toString()));
        })
    })
}

// write({
//     token: 'xxx',
//     uid: '456'
// });
// read();
module.exports = {
    write: write,
    read: read
}