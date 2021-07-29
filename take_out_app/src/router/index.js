import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '../views/Layout.vue'),
    children: [
      { path: 'home', name: 'Home', component: () => import(/* webpackChunkName: "layout_home" */ '../views/layout/Home.vue') },
      { path: 'about', name: 'About', component: () => import(/* webpackChunkName: "layout_about" */ '../views/layout/About.vue') },
      { path: 'order', name: 'Order', component: () => import(/* webpackChunkName: "layout_order" */ '../views/layout/Order.vue') },
      { path: 'useredit', name: 'UserEdit', component: () => import(/* webpackChunkName: "login" */ '../views/user/UserEdit') }
    ]
  },
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue') },
  { path: '/address', name: 'AddressList', component: () => import(/* webpackChunkName: "address_list" */ '../views/address/AddressList') },
  { path: '/address/edit', name: 'AddressEdit', component: () => import(/* webpackChunkName: "address_edit" */ '../views/address/AddressEdit') },
  { path: '/shop', name: 'ShopDetail', component: () => import(/* webpackChunkName: "address_edit" */ '../views/shop/ShopDetail') },
  { path: '/order/detail', name: 'OrderDetail', component: () => import(/* webpackChunkName: "order_detail" */ '../views/order/OrderDetail') },
  { path: '/service', name: 'Service', component: () => import(/* webpackChunkName: "service" */ '../views/service/Service') },
  { path: '/member', name: 'Member', component: () => import(/* webpackChunkName: "member" */ '../views/member/Member') },
  { path: '/balance', name: 'Balance', component: () => import(/* webpackChunkName: "balance" */ '../views/balance/Balance') },
  { path: '/integral', name: 'Integral', component: () => import(/* webpackChunkName: "integral" */ '../views/integral/Integral') },
  { path: '/integral/description', name: 'IntegralDes', component: () => import(/* webpackChunkName: "integral_des" */ '../views/integral/IntegralDes') },
  { path: '/reset_pwd', name: 'ResetPwd', component: () => import(/* webpackChunkName: "resetPwd" */ '../views/login/ResetPwd') }

]

const router = new VueRouter({
  routes
})

const whiteList = ['/', '/login', '/order', '/about', '/home']

router.beforeEach((to, from, next) => {
  router.app.$options.store.state.defaultActive = to.path.substr(1)
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (Vue.$cookies.isKey('user_id')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
