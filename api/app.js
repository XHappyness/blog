const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const querystring = require("querystring")

const { setRedis, getRedis } = require("./src/db/redis")

function getPostData(req) {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }
        if (req.headers["content-type"] && req.headers["content-type"].indexOf("application/json") === -1) {
            resolve({})
            return
        }
        let postData = ""
        req.on("data", chunk => {
            postData += chunk.toString()
        })
        req.on("end", () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    });
}

// 获取cookie过期时间
function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString()
}

const serverHandle = (req, res) => {
    res.setHeader("Content-Type", "application/json")

    // 获取path
    const url = req.url
    req.path = url.split("?")[0]

    // 解析query
    req.query = querystring.parse(url.split("?")[1])

    // 解析cookies
    req.cookies = {}
    const cookiesStr = req.headers.cookie || ""
    cookiesStr.split(";").forEach(item => {
        if (!item) return
        const arr = item.split("=")
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookies[key] = value
    });

    // 解析session
    let userId = req.cookies.userid
    let needSetCookieUserid = false
    if (!userId) {
        needSetCookieUserid = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化session
        setRedis(userId, {})
    }
    // 获取session
    req.sessionId = userId
    getRedis(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            setRedis(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        // 处理 data:将post的数据放入body中
        getPostData(req).then(postData => {
            req.body = postData
            // 处理blog路由
            const blogResult = handleBlogRouter(req, res)
            if (blogResult) {
                blogResult.then(blogData => {
                    if (needSetCookieUserid)
                        res.setHeader("Set-Cookie", `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
                    res.end(JSON.stringify(blogData))
                })
                return;
            }


            // 处理user路由
            const userResult = handleUserRouter(req, res)
            if (userResult) {
                userResult.then(userData => {
                    if (needSetCookieUserid)
                        res.setHeader("Set-Cookie", `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
                    res.end(JSON.stringify(userData))
                })
                return;
            }
            // 未命中路由，返回404
            res.writeHead(404, { "Content-type": "text/plain" })
            res.write("404 Not Found\n")
            res.end()
        })
    }).catch(err => {
        // 发生错误，返回500
        res.writeHead(500, { "Content-type": "text/plain" })
        res.write("内部错误\n")
        res.end()
    })
}

module.exports = serverHandle