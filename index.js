const request = require('request');
const redis = require('redis');
const store = require('./database');
const utils = require('./utils');
const logUtil = require('./log');
const login = require('./login');
const client = redis.createClient();

client.on('error', function (err) {
  console.log('Redis Error ' + err);
});

let userInfo;
const url = 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank';
const category = '5562b415e4b00c57d9b94ac8';
const src = 'web';

let sendRequest = (url, params) => {
  request.get({
    url: url,
    qs: params
    // json: true
  }, function (err, res, body) {
    if (err) {
      throw err;
    }
    if (JSON.parse(body).s !== 1) {
      console.log('请求回数据有误:', JSON.parse(body).m);
      return;
    }
    logUtil(res);
    let entrylist = JSON.parse(body).d.entrylist;
    if (entrylist == undefined) {
      // 防止undefined.map错误
      console.warn('抓取到的数据记录：', entrylist);
      return;
    }
    entrylist = entrylist.map(item => ({
      objectId: item.objectId,
      title: item.title,
      createdAt: item.createdAt,
      lastCommentTime: item.lastCommentTime,
      originalUrl: item.originalUrl,
      user: JSON.stringify(item.user),
      content: item.content,
      summaryInfo: item.summaryInfo,
      category: item.category,
      collectionCount: item.collectionCount, // heart count
      commentsCount: item.commentsCount // comment count
    }));
    entrylist.forEach(v => {
      client.get(v.objectId, function (err, reply) {
        if (err) throw err;
        if (reply == null) {
          console.log(new Date().toLocaleString(), v.objectId);
          client.set(v.objectId, 1);
          store.insert(v);
        }
      })
    })
  });
};

let run = () => {
  if (userInfo == undefined) {
    utils.read().then((user) => {
      console.log("得到用戶信息:", user);
      userInfo = user;
    });
  } else {
    let {
      userId,
      clientId,
      token
    } = userInfo;
    if (userId == undefined || clientId == undefined || token == undefined) {
      console.log('登录信息无效,重新登录:', userInfo);
      login.getUserInfo();
      userInfo = undefined;
      return;
    }
    let params = {
      src: src,
      uid: userId,
      device_id: clientId,
      token: token,
      limit: 20,
      category: category
    };
    sendRequest(url, params);
  }
};
setInterval(run, 1000 * 60 * 5);