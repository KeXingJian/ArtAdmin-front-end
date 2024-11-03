import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import './styles/variables.css'


Vue.config.productionTip = false
//应用插件

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
