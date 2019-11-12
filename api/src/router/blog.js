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
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }

    // 获取博客详情
    if (method === "GET" && path === "/api/blog/detail") {
        const blog = getDetail(id)
        return new SuccessModel(blog)
    }

    // 新建博客
    if (method === "POST" && path === "/api/blog/new") {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    // 修改博客
    if (method === "POST" && path === "/api/blog/update") {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel("新增博客失败")
        }
    }

    // 删除博客
    if (method === "POST" && path === "/api/blog/del") {
        const result = deleteBlog(id)
        if (result) {
            return new SuccessModel("成功")
        } else {
            return new ErrorModel("删除博客失败")
        }
    }
}

module.exports = handleBlogRouter