import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import '@/styles/global.less'

import service from '@/service'
Vue.prototype.$service = service

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
