import axios from 'axios'
import iView from 'view-design'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        config.timeout = 60000;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
axios.interceptors.response.use(
    response => {
        if (response.data.errno && response.data.errno !== 0) {
            iView.Notice.error({
                title: '错误',
                desc: response.data.message ? response.data.message : '系统内部错误'
            })
            return Promise.reject(response.data)
        } else {
            return response.data;
        }
    },
    error => {
        if (error.response) {
            iView.Notice.error({
                title: `请求错误`,
                desc: `错误码：${error.response.status}`
            })
        }
        return Promise.reject(error.response.data)
    }
)

let httpMethod = {

    getService: (url, config, loading = false) => {
        if (!loading) {
            return new Promise((resolve, reject) => {
                axios.get(url, config)
                    .then(data => {
                        resolve(data)
                    }).catch(error => {
                        resolve({ errno: -1 })
                    })
            })
        }
        return new Promise((resolve, reject) => {
            iView.LoadingBar.start()
            axios.get(url, config)
                .then(data => {
                    resolve(data)
                    iView.LoadingBar.finish()
                }).catch(error => {
                    resolve({ errno: -1 })
                    iView.LoadingBar.error()
                })
        })
    },

    postService: (url, data, config, loading = false) => {
        if (!loading) {
            return new Promise((resolve, reject) => {
                axios
                    .post(url, data, config)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(error => {
                        resolve({ errno: -1 })
                    })
            })
        }

        return new Promise((resolve, reject) => {
            iView.LoadingBar.start()
            axios
                .post(url, data, config)
                .then(data => {
                    resolve(data)
                    iView.LoadingBar.finish()
                })
                .catch(error => {
                    resolve({ errno: -1 })
                    iView.LoadingBar.error()
                })
        })
    }
}

export default httpMethod