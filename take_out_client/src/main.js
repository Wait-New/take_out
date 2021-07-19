import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element相关配置
import './plugins/element.js'
// 引入cookie 配置
import './utils/cookies'
// 引入axios 相关配置
import './utils/http'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
