const { SuccessModel, ErrorModel } = require("../model/resModel")
const { loginCheck } = require("../controller/user.js")

const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path

    // 登录
    if (method === "POST" && path === "/api/user/login") {
        return loginCheck(req.body.name, req.body.psd).then(user => {
            if (user.username) {
                return new SuccessModel("登录成功")
            } else {
                return new ErrorModel("用户名或密码错误")
            }
        })
    }
}

module.exports = handleUserRouter