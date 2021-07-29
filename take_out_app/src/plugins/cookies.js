import Vue from 'vue'
import cookies from 'vue-cookies'
Vue.use(cookies)

Vue.$cookies.config(60 * 60 * 24 * 3)
