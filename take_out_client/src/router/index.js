import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import '../assets/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'Login', component: Login }
]

const router = new VueRouter({
  routes
})

// 导航前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (Vue.$cookies.isKey('token')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
export default router
