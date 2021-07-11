import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import '../assets/global.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/about',
    component: Home,
    children: [
      { path: 'user', name: 'User', component: () => import('@/components/user/User') },
      { path: 'role', name: 'Role', component: () => import('@/components/role/Role') },
      { path: 'about', name: 'Dept', component: () => import('@/components/dept/Dept') }
    ]
  },
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
