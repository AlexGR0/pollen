import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "swiper/css/swiper.min.css"                 //swiper样式
import "bootstrap/dist/css/bootstrap.min.css"      //bootstrap样式
import "animate.css"                               //animate过度动画

// 引入vant UI
import Vant from "vant"
import 'vant/lib/index.css'
Vue.use(Vant)

//配置axios
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:3000';
Vue.prototype.$axios = axios;

//解决移动端300ms延时
import FastClick from "fastclick";
FastClick.attach(document.body)

// vue-lazyload懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload,{
  error:require("./assets/public/error.png"),
  loading:require("./assets/public/loading.png")
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
