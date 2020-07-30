import Vue from 'vue'
import App from './App'
import ZeroUI from '@/packages'
import { Table } from 'ant-design-vue'
import '@/packages/Table/style'

Vue.config.productionTip = false

Vue.use(ZeroUI)
Vue.use(Table)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
