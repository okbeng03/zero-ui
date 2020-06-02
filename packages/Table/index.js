import { Table, Button, Popconfirm, message } from 'ant-design-vue'
import ZTable from './Table'

/* istanbul ignore next */
ZTable.install = function (Vue) {
  Vue.use(Table)
  Vue.use(Button)
  Vue.use(Popconfirm)
  Vue.prototype.$message = message
  Vue.component(ZTable.name, ZTable)
}

export default ZTable
