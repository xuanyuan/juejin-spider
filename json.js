/**
 * Created with Software Dept.
 *
 * User: zhangdj
 * Date: 2018/7/21
 * Time: 10:40
 * Description:
 */

var fs = require('fs');

// 覆盖写
function write(params) {
    fs.writeFile('./data.json', JSON.stringify(params) , function (err) {
        if (err) throw err;
        console.log('write success');
    })
}
function read() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data.json', function (err, data) {
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