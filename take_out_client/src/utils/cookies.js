import Vue from 'vue'
import Cookies from 'vue-cookies'

Vue.use(Cookies)

// 设置全局cookie存在时间
Vue.prototype.$cookies.config(60 * 60 * 24)
