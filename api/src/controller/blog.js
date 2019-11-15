const { exec } = require("../db/mysql")

function getList(author, keyword) {
    let sql = "select * from blogs where 1=1"
    if (author) {
        sql += `and author=${author}`
    }
    if (keyword) {
        sql += `and title like "%${keyword}%"`
    }
    return exec(sql);
}

function getDetail(id) {
    return {
        id: 1,
        title: "标题1",
        content: "内容1",
        createTime: 1546610491112,
        author: "xuehaoshaung"
    }
}

function newBlog(body = {}) {
    return { body }
}

function updateBlog(id, body = {}) {
    return true
}

function deleteBlog(id) {
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}