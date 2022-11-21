import axios from "axios";


// 设置获取 baseURL
const baseURL = 'http://localhost:8002'

const request=axios.create({
    baseURL:baseURL
})

export default request;