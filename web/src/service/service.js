import httpMethod from './method';
let { getService, postService } = httpMethod;
const user = {
    register: (userInfo) => postService("/api/user/register", userInfo),
    logout: (name) => postService("/api/user/logout", { name }),
    login: (userInfo) => postService("/api/user/login", userInfo)
};
const blog = {
    getBlogs: (author) => getService('/api/blog/list', {
        params: { author }
    }),
    getBlogDetail: (id) => getService('/api/blog/detail', {
        params: { id }
    }),
    addBLog: (bolg) => postService('/api/blog/new', bolg),
    upBlog: (bolg) => postService('/api/blog/update', bolg),
    deleteBolg: (id) => postService('/api/blog/del', { id }),
}
export default {
    ...user,
    ...blog
}