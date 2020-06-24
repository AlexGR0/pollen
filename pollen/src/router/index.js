import Vue from 'vue'
import VueRouter from 'vue-router'

// 避免设置路由守卫后，this.$router.push(会报错Uncaught (in promise)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

import home from "./home"
import mine from "./mine"
import publics from "./publics"
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  ...home,
  ...publics,
  ...mine,
  {
    path: "/cluster",
    name: "分类",
    component: (res) => require(["@/views/cluster.vue"],res)
  },
  {
    path: "/found",
    name: "发现频道",
    component: (res) => require(["@/views/found.vue"],res)
  },
  {
    path: "/cart",
    name: "购物车",
    component: (res) => require(["@/views/cart.vue"],res)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
