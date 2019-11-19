import httpMethod from './method';
let { getService, postService } = httpMethod;
export default {
    getExportTasks: () => getService('/task/all'),
    getAllInterfaces: () => getService('/domain/stratehy'),
    postConfig: (config) => postService("/v1/export", config),
    downExcel: () => getService('/import/example')
}