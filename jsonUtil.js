const fs = require('fs');


/**
 * @description 覆盖写入JSON文件用户内容
 * @author zhangdj
 * @date 2018-08-01
 * @param {Object} params
 */
function write(params) {
    fs.writeFile('./userInfo.json', JSON.stringify(params), function (err) {
        if (err) throw err;
        console.log('write success');
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
        fs.readFile('./userInfo.json', function (err, data) {
            if (err) {
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