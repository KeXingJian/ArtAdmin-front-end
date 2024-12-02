import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import './styles/variables.css'
import 'animate.css'
import {
  Button,
  Checkbox, CheckboxButton, CheckboxGroup,
  Form,
  FormItem,
  Input,
  Option,
  Pagination,
  Radio,
  Select,
  Table,
  TableColumn,
  Tag
} from 'element-ui';

Vue.config.productionTip = false
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Button);
Vue.use(Radio)
Vue.use(Tag);
Vue.use(Pagination)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)



new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
