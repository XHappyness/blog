const { SuccessModel, ErrorModel } = require("../model/resModel")
const { login } = require("../controller/user.js")

// 获取cookie过期时间
function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path

    // 登录
    if (method === "GET" && path === "/api/user/login") {
        return login(req.query.name, req.query.psd).then(user => {
            if (user.username) {
                res.setHeader("Set-Cookie", `username=${user.username};path=/;httpOnly;expires=${getCookieExpires()}`);
                return new SuccessModel("登录成功")
            } else {
                return new ErrorModel("用户名或密码错误")
            }
        })
    }

    // 登录验证
    if (method === "GET" && path === "/api/user/login-test") {
        if (req.cookies.username) {
            return Promise.resolve(new SuccessModel(`${req.cookies.username}已经登录`))
        } else {
            return Promise.resolve(new ErrorModel(`尚未登录`))
        }
    }
}

module.exports = handleUserRouter