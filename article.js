const request = require('request');
const store = require('./dbUtil');
const jsonUtil = require('./jsonUtil');
const BloomFilter = require('bloomfilter-redis');
const redis = require('redis'),
    client = redis.createClient();

client.on('error', function (err) {
    console.log('Error ' + err);
});

let isExist = (bf, str) => {
    // invokes `SETBIT` to allocate memory in redis.For details https://redis.io/commands/setbit
    var promise = bf.init();
    promise.then(() => {
        return bf.contains(str);
    }).then((result) => {
        return new Promise((resolve, reject) => {
            if (!result) {
                bf.add(str).then(() => {
                    resolve(result);
                })
            }
            resolve(result);
        });
    });
    return promise;
}

let run = () => {
    const bf = new BloomFilter({ // all params have a default value, and I choose some to present below
        redisSize: 256, // this will create a string value which is 256 MegaBytes in length
        hashesNum: 16, // how many hash functions do we use
        redisKey: 'Bloomfilter', // default will create a string whose keyname is `Node_Bloomfilter_Redis`
        redisClient: client, // you can choose to create the client by yourself
    });

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
                let tmp = isExist(bf, v.objectId);
                console.log('current value whether exist in redis:', tmp);
                console.log('current insert value:', v);
                tmp.then((isExist) => {
                    if (!isExist) {
                        store.insert(v);
                    }
                });
            })

        });
    })
}
setInterval(run, 1000 * 60 * 5);