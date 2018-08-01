const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'jujin'
});


/**
 * @description 插入数据库数据
 * @author zhangdj
 * @date 2018-08-01
 * @param {Object} args
 */
function insertData(args) {

    let columns = ['objectId', 'title', 'createdAt', 'lastCommentTime', 'originalUrl', 'user', 'content', 'summaryInfo', 'category'];


    const addSql = 'insert into article(' + columns.join(',') + ') values (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    let addSqlParams = [];
    columns.forEach(key => {
        if (typeof args[key] === 'object') {
            addSqlParams.push(JSON.stringify(args[key]));
        } else {
            addSqlParams.push(args[key]);
        }
    });
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(addSql, addSqlParams, function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
            // Handler error after the release
            if (error) throw error;
        })

    })
}

module.exports = {
    insert: insertData
}