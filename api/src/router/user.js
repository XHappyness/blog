const { SuccessModel, ErrorModel } = require("../model/resModel")
const { login } = require("../controller/user.js")

const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path

    // 登录
    if (method === "GET" && path === "/api/user/login") {
        return login(req.query.name, req.query.psd).then(user => {
            if (user.username) {
                // 设置session
                req.session.username = user.username
                req.session.realname = user.realname
                return new SuccessModel("登录成功")
            } else {
                return new ErrorModel("用户名或密码错误")
            }
        })
    }

    // 登录验证
    if (method === "GET" && path === "/api/user/login-test") {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel(`${req.session.username}已经登录`))
        } else {
            return Promise.resolve(new ErrorModel(`尚未登录`))
        }
    }
}

module.exports = handleUserRouter