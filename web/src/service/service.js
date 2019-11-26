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
}
export default {
    ...user,
    ...blog
}