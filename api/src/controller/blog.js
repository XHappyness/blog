const { exec } = require("../db/mysql")

function getList(author, keyword) {
    let sql = "select * from blogs where 1=1 "
    if (author) {
        sql += `and author="${author}" `
    }
    if (keyword) {
        sql += `and title like "%${keyword}%"`
    }
    return exec(sql);
}

function getDetail(id) {
    let sql = `select * from blogs where id=${id}`
    return exec(sql)
}

function newBlog(body = {}) {
    const { title, content, createtime, author } = body
    let sql = `insert into blogs (title, content, createtime, author) values ("${title}","${content}",${createtime},"${author}")`
    return exec(sql).then(insertInfo => insertInfo.insertId)
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