import Vue from 'vue'
import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
// 挂载
Vue.prototype.$axios = service
