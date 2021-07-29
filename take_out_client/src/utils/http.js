import Vue from 'vue'
import axios from 'axios'
// 初始化通用配置
const service = axios.create({
  // 基地址设置
  baseURL: process.env.VUE_APP_BASE_API
})

// 设置请求拦截器
service.interceptors.request.use(config => {
  // 预处理：挂载在请求头中使用Authorization字段提供的token令牌
  const token = Vue.$cookies.get('token')
  if (token) {
    config.headers.Authorization = token
  }
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

const http = {
  get (url, params) {
    return service.get(formatterUrl(url, params))
  },
  post (url, params) {
    return service.post(formatterUrl(url, params))
  }
}
function formatterUrl (url, params) {
  let formatterParams = ''
  if (params) {
    if (typeof params === 'object') {
      if (Object.keys(params).length > 0) {
        for (const p in params) {
          formatterParams += `${p}=${params[p]}&`
        }
        formatterParams = formatterParams.substr(0, formatterParams.length - 1)
        url = `${url}?${formatterParams}`
      }
    }
  }
  return url
}

// 挂载
Vue.prototype.$axios = service
Vue.prototype.$http = http
