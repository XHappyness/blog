const { exec } = require("../db/mysql")

function login(name, psd) {
    let sql = `select username,realname from users where username="${name}" and password="${psd}"`
    console.log(sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    }).catch(err => {
        return err
    })
}
module.exports = { login }