const redis = require("redis")
// 要先去安装目录下redis-server.exe

// 创建客户端
const redisClient = redis.createClient(6379, "127.0.0.1")
redisClient.on("error", err => {
    console.error(err)
})

// 测试
redisClient.set("myname", "test", redis.print)
redisClient.get("myname", (err, val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(val)

    // 退出
    redisClient.quit()
})
/**
 * 测试的话也可以到安装目录下redis-cli, 然后使用
 * set(key,value) 设置key
 * get(key) 获取key
 * keys *  查看全部key
 */
