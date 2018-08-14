const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'juejin'
});

/**
 * @description 插入数据库数据
 * @author zhangdj
 * @date 2018-08-01
 * @param {Object} args
 */
function insertData(args) {

    const placeholder = ',';

    let columns = Object.keys(args),
        keys = columns.join(placeholder), // 不使用字符串拼接，提高效率
        length = columns.length,
        questionMarks = [];

    // 拼接占位符字符串（?, ?, ?, ?, ?, ?）
    while (length > 0) {
        questionMarks.push('?');
        length--;
    }

    let placeholders = questionMarks.join(placeholder);

    const addSql = 'insert into article(' + keys + ') values ('+ placeholders +')';

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