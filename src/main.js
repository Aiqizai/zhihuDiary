import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import VantConfig from './vant.config'
import VueAxios from 'vue-axios'
import axios from 'axios'


Vue.config.productionTip = false

// axios
Vue.use(VueAxios, axios)
// 使用vant
Vue.use(VantConfig)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
