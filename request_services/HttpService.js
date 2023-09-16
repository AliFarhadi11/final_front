import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.response.use(null, error => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    if (!expectedErrors) {
    }
    return Promise.reject(error);
})

const request = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch ,
}
export default request