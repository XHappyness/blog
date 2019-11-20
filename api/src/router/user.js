const { SuccessModel, ErrorModel } = require("../model/resModel")
const { register, login } = require("../controller/user.js")
const { setRedis, deleRedis } = require("../db/redis")

const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path

    // 注册
    if (method === "POST" && path === "/api/user/register") {
        return register(req.body.name, req.body.psd).then(user => {
            if (user.username) {
                return new ErrorModel("用户名已经存在")
            } else {
                return new SuccessModel("注册成功")
            }
        })
    }

    // 登录
    if (method === "POST" && path === "/api/user/login") {
        return login(req.body.name, req.body.psd).then(user => {
            if (user.username) {
                // 设置session；同步redis
                const userObj = {
                    username: user.username,
                    realname: user.realname
                }
                setRedis(req.sessionId, userObj)
                return new SuccessModel("登录成功")
            } else {
                return new ErrorModel("用户名或密码错误")
            }
        })
    }
    // 登出
    if (method === "POST" && path === "/api/user/logout") {
        if (req.body.name && req.sessionId) {
            deleRedis(req.sessionId)
            return Promise.resolve(new SuccessModel(`退出登录成功`))
        } else {
            return Promise.resolve(new ErrorModel(`退出失败`))
        }
    }

    // 登录验证
    // if (method === "GET" && path === "/api/user/login-test") {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel(`${req.session.username}已经登录`))
    //     } else {
    //         return Promise.resolve(new ErrorModel(`尚未登录`))
    //     }
    // }
}

module.exports = handleUserRouter