const request = require('request');
const store = require('./dbUtil');
const jsonUtil = require('./jsonUtil');
const redis = require('redis');

const client = redis.createClient();


client.on('error', function (err) {
    console.log('Error ' + err);
});

let run = () => {
    const url = 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank';
    const category = '5562b415e4b00c57d9b94ac8';
    const src = 'web';
    jsonUtil.read().then((userInfo) => {
        let params = {
            src: src,
            uid: userInfo.userId,
            device_id: userInfo.clientId,
            token: userInfo.token,
            limit: 100,
            category: category
        };

        request.get({
            url: url,
            qs: params
            // json: true
        }, function (err, res, body) {
            if (err) {
                throw err;
            }
            let entrylist = JSON.parse(body).d.entrylist;
            entrylist = entrylist.map(item => ({
                objectId: item.objectId,
                title: item.title,
                createdAt: item.createdAt,
                lastCommentTime: item.lastCommentTime,
                originalUrl: item.originalUrl,
                user: JSON.stringify(item.user),
                content: item.content,
                summaryInfo: item.summaryInfo,
                category: item.category
            }));
            entrylist.forEach(v => {
                client.get(v.objectId, function (err, reply) {
                    if (err) throw err;
                    if (reply == null) {
                        console.log('==', v.objectId);
                        client.set(v.objectId, 1);
                        store.insert(v);
                    }
                })
            })
        });
    })
}
setInterval(run, 1000 * 30);