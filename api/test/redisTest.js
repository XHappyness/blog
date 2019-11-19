const redis = require("redis")

// 创建客户端
const redisClient = redis.createClient(6379, "127.0.0.1")
redisClient.on("error", err => {
    console.err(err)
})

// 测试
redisClient.set("myname", "test", redis.print)
redisClient.get("myname", (err, val) => {
    if (err) {
        console.err(err)
        return
    }
    console.log(val)

    // 退出
    redisClient.quit()
})
console.log("执行")