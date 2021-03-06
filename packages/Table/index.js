import { Table, Button, Popconfirm, message } from 'ant-design-vue'
import ZTable from './Table'
import ZForm from '../Form'
import addons from './core/addons'
import { types as operationAddonRules } from './core/addons/operation'
import { rules as definitionRules } from './core/definition'
import { rules as schemaRules } from './core/schema'
import axios from './core/axios'

const rules = {
  addons, // 暴露 addons 给外部自定义
  schemaRules, // 暴露 schema 规则给外部自定义
  definitionRules, // 暴露 defintion 规则给外部自定义
  operationAddonRules, // 暴露 operation addon 规则给外部自定义
  axios // 暴露axios instance
}

export {
  rules
}

/* istanbul ignore next */
ZTable.install = function (Vue) {
  Vue.use(Table)
  Vue.use(Button)
  Vue.use(Popconfirm)
  Vue.use(ZForm)
  Vue.prototype.$message = message
  Vue.prototype.$axios = axios
  Vue.component(ZTable.name, ZTable)
}

export default ZTable
