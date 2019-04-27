import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang/lang'
import axios from 'axios'

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);


axios.defaults.baseURL = 'http://192.168.1.211:8000/'


Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  i18n,
  
  render: h => h(App)
}).$mount('#app')

window['vue'] = app
window.store = store