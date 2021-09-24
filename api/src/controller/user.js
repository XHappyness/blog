const { exec } = require("../db/mysql")

function register(name, psd) {
    let sql = `select username from users where username="${name}"`
    return exec(sql).then(rows => {
        if (!rows[0]) { //不存在用户则插入
            exec(`insert into users (username, password, realname) values ("${name}", "${psd}","${name}")`)
        }
        return rows[0] || {}
    }).catch(err => {
        return err
    })
}

function login(name, psd) {
    let sql = `select username,realname from users where username="${name}" and password="${psd}"`
    return exec(sql).then(rows => {
        return rows[0] || {}
    }).catch(err => {
        return err
    })
}
module.exports = { register, login }