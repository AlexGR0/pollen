import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user';
import home from './home';
import cluster from './cluster';
import cart from "./cart";
import address from "./address";
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    home,
    cluster,
    cart,
    address
  }
})
