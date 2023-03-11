import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { sync } from './router/gasRouterSync'
import store from '@/store'
sync(router)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
