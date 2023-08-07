import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { AnyProps } from '../types/base'
import users from '../stores/users'

//通用功能
const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
});

// 请求拦截器 携带token
instance.interceptors.request.use(function (config) {
    // 从本地存储中获取token
    const token = ('token' in users.info && users.info.token) as string
    // 在请求头中挂载token
    config.headers.Authorization = token

    return config;
}, function (error) {
    return Promise.reject(error);
});

//相应拦截器 统一处理所有的错误响应
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

interface Http {
    get: (url: string, data?: AnyProps, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    post: (url: string, data?: AnyProps, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    put: (url: string, data?: AnyProps, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    patch: (url: string, data?: AnyProps, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    delete: (url: string, data?: AnyProps, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

// 统一请求接口的写法
const http: Http = {
    // 查询数据
    get(url, data, config) {
        return instance.get(url, { ...config, params: data })
    },
    // 添加数据
    post(url, data, config) {
        return instance.post(url, data, config)
    },
    // 整体更新
    put(url, data, config) {
        return instance.put(url, data, config)
    },
    // 局部更新
    patch(url, data, config) {
        return instance.patch(url, data, config)
    },
    // 删除数据
    delete(url, data, config) {
        return instance.delete(url, { ...config, data })
    }
}

export default http