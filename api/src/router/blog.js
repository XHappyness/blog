const { SuccessModel, ErrorModel } = require("../model/resModel")
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../controller/blog.js")

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const path = req.path;
    const id = req.query.id

    // 获取博客列表
    if (method === "GET" && path === "/api/blog/list") {
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        new SuccessModel([])
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
        return newBlog(req.body).then(obj => {
            return new SuccessModel(obj)
        }).catch(err => {
            return new ErrorModel(err)
        })
    }
    // 修改博客
    if (method === "POST" && path === "/api/blog/update") {
        return updateBlog(id, req.body).then(result => {
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel("新增博客失败")
            }
        })
    }

    // 删除博客
    if (method === "POST" && path === "/api/blog/del") {
        const author = "新作2者";
        return deleteBlog(id, author).then(result => {
            if (result) {
                return new SuccessModel("成功")
            } else {
                return new ErrorModel("删除博客失败")
            }
        })
    }
}

module.exports = handleBlogRouter