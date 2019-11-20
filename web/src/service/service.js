import httpMethod from './method';
let { getService, postService } = httpMethod;
export default {
    getBlogs: () => getService('/api/blog/list'),
    getAllInterfaces: () => getService('/domain/stratehy'),
    postConfig: (config) => postService("/v1/export", config),
    downExcel: () => getService('/import/example')
}