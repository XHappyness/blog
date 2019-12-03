const path = require('path')

//开发api请求路径
const devProxy = "http://localhost:3000"

const resolve = dir => {
    return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
    publicPath: BASE_URL,
    chainWebpack: config => {
        config
            .entry('app')
            .add('babel-polyfill')
        config.resolve.alias
            .set('@', resolve('src'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    runtimeCompiler: true,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        open: true, //配置自动启动浏览器
        proxy: {
            '/': {
                target: devProxy,
                changeOrigin: true,
                ws: false, //关闭websocket服务
                // pathWrite: {
                //   '^/bc-piis': '/bc-piis'
                // }
            },
        }
    }
}
