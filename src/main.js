
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import lodash from 'lodash'

import ElementUI from 'element-ui'
import '@/assets/theme/index.css'

import '@/assets/icon/iconfont.css'

import {formatTime} from "./utils/time";
import axios from 'axios'
import {setCookie, getCookie, delCookie} from './utils/cokkie.js';


axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}

Vue.config.productionTip = false
//Vue.http.options.xhr = { withCredentials: true } 
Vue.use(ElementUI)

Object.defineProperty(Vue.prototype, '$_', { value: lodash })



Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})
// 格式话时间
Vue.filter('format', formatTime)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
