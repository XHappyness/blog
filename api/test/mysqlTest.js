const mysql = require("mysql"); //引入mysql

// 创建链接对象
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    port: "3306",
    database: "myblogs"
})

// 开始链接
con.connect()

// 执行sql语句

/**
 * 增
 * insert into users (username, `password`, realname) values ("zhangsan", "123","张三");
 */

/**
 * 删
 * delete from users where username="lisi";
 */

/**
 * 改
 * update users set realname="李四2" where username="lisi";
 */

/**
 * 查
 * select * from users; 查询所有列
 * select id,username from users; 查询部分列
 * select * from users where username="zhangsan" and `password`="123"; 多个条件查询
 * select * from users where username like "%zhang%"; 模糊查询
 * select * from users where `password` like "%123%" order by id desc; 排序
 */
const sql = 'insert into users (username, `password`, realname) values ("wangwu", "1234","王五");'
con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("获取结果成功:" + JSON.stringify(result))
})

// 关闭链接
con.end()