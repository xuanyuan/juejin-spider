const fs = require('fs');

/**
 * @Desc: 记录日志文件
 * @date 2018/8/14 13:20
 * @author zhangdj
 */
module.exports = (data) => {
    fs.writeFile('./logs.log', data, {'flag': 'a'}, (err) =>{
        if (err) {
            throw err;
        }
    });
};