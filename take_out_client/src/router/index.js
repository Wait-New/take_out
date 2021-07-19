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
    component: Home,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/components/user/User'),
        meta: {
          title: '用户管理',
          parentTitle: '系统管理'
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/components/role/Role'),
        meta: {
          title: '角色管理',
          parentTitle: '系统管理'
        }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/components/dept/Dept'),
        meta: {
          title: '部门管理',
          parentTitle: '系统管理'
        }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/components/shop/Shop'),
        meta: {
          title: '商户管理',
          parentTitle: '商家管理'
        }
      },
      {
        path: 'food',
        name: 'Food',
        component: () => import('@/components/shop/food/Food'),
        meta: {
          title: '食物管理',
          parentTitle: '商家管理'
        }
      },
      {
        path: 'foodedit',
        name: 'FoodEdit',
        component: () => import('@/components/shop/food/FoodEdit'),
        meta: {
          title: '食物编辑',
          parentTitle: '商家管理'
        }
      },
      {
        path: 'shopedit',
        name: 'ShopEdit',
        component: () => import('@/components/shop/ShopEdit'),
        meta: {
          title: '商户编辑',
          parentTitle: '商家管理'
        }
      }
    ]
  },
  { path: '/login', name: 'Login', component: Login }
]

const router = new VueRouter({
  routes
})

// 导航前置守卫
router.beforeEach((to, from, next) => {
  router.app.$options.store.state.defaultAction = to.path.substr(1)
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
