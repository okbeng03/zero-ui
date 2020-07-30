import Vue from 'vue'
import App from './App'
import ZeroUI from '@/packages'
import { Form } from 'ant-design-vue'
// import '@/packages/Form/style'

Vue.config.productionTip = false

Vue.use(ZeroUI)
Vue.use(Form)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
