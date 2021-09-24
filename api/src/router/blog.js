const { SuccessModel, ErrorModel } = require("../model/resModel")
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../controller/blog.js")

function loginCheck(req) {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel(`尚未登录`))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    const id = req.query.id

    // 获取博客列表
    if (method === "GET" && path === "/api/blog/list") {
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        return getList(author, keyword).then(listData => {
            return new SuccessModel(listData)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }

    // 获取博客详情
    if (method === "GET" && path === "/api/blog/detail") {
        return getDetail(id).then(blogs => {
            return new SuccessModel(blogs[0])
        }).catch(err => {
            return new ErrorModel(err)
        })
    }

    // 新建博客
    if (method === "POST" && path === "/api/blog/new") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const body = {
            title: req.body.title,
            content: req.body.content,
            createtime: +new Date(),
            author: req.session.username
        }
        return newBlog(body).then(obj => {
            return new SuccessModel(obj)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    // 修改博客
    if (method === "POST" && path === "/api/blog/update") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const body = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            createtime: +new Date(),
            author: req.session.username
        }
        return updateBlog(body).then(result => {
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel("新增博客失败")
            }
        })
    }

    // 删除博客
    if (method === "POST" && path === "/api/blog/del") {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const author = req.session.username;
        return deleteBlog(req.body.id, author).then(result => {
            if (result) {
                return new SuccessModel("成功")
            } else {
                return new ErrorModel("删除博客失败")
            }
        })
    }
}

module.exports = handleBlogRouter