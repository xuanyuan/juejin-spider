const request = require('request');
const utils = require('../utils');
const logUtil = require('../log');
const config = require('./config');

// 模拟登陆
let login = () => {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://juejin.im/auth/type/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: config.email,
        password: config.password
      })
    }, (err, res, body) => {
      if (err) {
        throw err;
        reject(err);
      } else if (res.statusCode !== 200) {
        reject('please ensure your account and password is correct.')
      } else {
        const cookie = res.headers['set-cookie'];
        const encodeToken = cookie[0]
          .split(';')[0]
          .split('=')[1];
        const decodeToken = JSON.parse(Buffer.from(encodeToken, 'base64').toString());
        resolve(decodeToken);
      }
    })
  })
}

// 获取用户信息，存储到json文件中
let getUserInfo = () => {
  login().then(
    (loginInfo) => {
      utils.write(loginInfo);
    },
    (err) => {
      console.log('登录失败:', err);
    });
};

// getUserInfo();
module.exports = {
  getUserInfo: getUserInfo
}