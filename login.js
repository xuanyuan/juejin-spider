const request = require('request');
const json = require('./json');
// 模拟登陆
let login = () => {
    return new Promise((resolve, reject) =>{
        request({
            url: 'https://juejin.im/auth/type/email',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'yourusername',
                password: 'yourpasswd'
            })
        }, (err, res, body) => {
            if (err) {
                // console.log('request error:', err);
                reject(err);
            } else {
                // console.log(res.headers['set-cookie'][0]);
                const cookie = res.headers['set-cookie'];

                const encodeToken = cookie[0]
                    .split(';')[0]
                    .split('=')[1];
                const decodeToken = JSON.parse(Buffer.from(encodeToken, 'base64').toString());
                // console.log(decodeToken);
                resolve(decodeToken);

            }
        })
        }
    )
}

// 获取用户信息
let getUserInfo = () => {
    // let userInfo;
    login().then((loginInfo) => {
        // console.log(loginInfo);
        json.write(loginInfo);
    });
    // return userInfo;
}

// getUserInfo();
module.exports = {
    getUserInfo: getUserInfo
}


