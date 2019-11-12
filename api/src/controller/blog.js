function getList(author, keyword) {
    return [{
        id: 1,
        title: "标题1",
        content: "内容1",
        createTime: 1546610491112,
        author: author
    }, {
        id: 2,
        title: "标题2",
        content: "内容2",
        createTime: 1546610491112,
        author: author
    }]
}

function getDetail(id) {
    return {
        id: 1,
        title: "标题1",
        content: "内容1",
        createTime: 1546610491112,
        author: "xuehaoshaung"
    }
}

function newBlog(body = {}) {
    return { body }
}

function updateBlog(id, body = {}) {
    return true
}

function deleteBlog(id) {
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}