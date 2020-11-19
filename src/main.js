import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import VantConfig from './vant.config'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false

Vue.prototype.axios = axios;

axios.defaults.baseURL = "https://v1.alapi.cn/api/zhihu";

// axios
Vue.use(VueAxios, axios)
// 使用vant
Vue.use(VantConfig)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
