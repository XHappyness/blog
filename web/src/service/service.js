import httpMethod from './method';
let { getService, postService } = httpMethod;
const user = {
    register: (userInfo) => postService("/api/user/register", userInfo),
    logout: (name) => postService("/api/user/logout", { name }),
    login: (userInfo) => postService("/api/user/login", userInfo)
}
export default {
    getBlogs: (author) => getService('/api/blog/list', {
        params: { author }
    }),
    getAllInterfaces: () => getService('/domain/stratehy'),
    postConfig: (config) => postService("/v1/export", config),
    downExcel: () => getService('/import/example'),
    ...user
}