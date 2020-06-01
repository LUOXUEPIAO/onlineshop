import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI)

axios.interceptors.response.use(res => { // 401的情况下表示验证未通过直接到error
  return res
}, error => {
  if (error.response.status === 401) {
    router.push({ path: '/login' })
  }
  return Promise.reject(new Error(error))
})

Vue.prototype.$http=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
