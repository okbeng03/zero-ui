import { Table, Button, Popconfirm, message } from 'ant-design-vue'
import ZTable from './Table'
import ZForm from '../Form'
import addons from './core/addons'
import { types as operationAddonRules } from './core/addons/operation'
import { rules as definitionRules, hooks as definitionHooks } from './core/definition'
import { rules as schemaRules } from './core/schema'
import axios, { interceptor } from './core/axios'

const rules = {
  addons, // 暴露 addons 给外部自定义
  schemaRules, // 暴露 schema 规则给外部自定义
  definitionRules, // 暴露 definition 规则给外部自定义
  definitionHooks, // 暴露 definition 生命周期 hook
  operationAddonRules, // 暴露 operation addon 规则给外部自定义
  axios, // 暴露axios instance
  axiosInterceptor: interceptor // 暴露axios interceptor
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
  Vue.prototype.$request = axios
  Vue.component(ZTable.name, ZTable)
}

export default ZTable
