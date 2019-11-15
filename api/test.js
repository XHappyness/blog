const mysql = require("mysql"); //引入mysql

// 创建链接对象
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    port: "3306",
    database: "testschema"
})

// 开始链接
con.connect()

// 执行sql语句
const sql = "select * from usesrs;"
con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("获取结果成功:" + result)
})

// 关闭链接
con.end()