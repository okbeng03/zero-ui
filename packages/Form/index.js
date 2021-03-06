import { Form, Input, InputNumber, Switch, Select, Checkbox, Radio, Button, Row, Col, Icon, Popconfirm, message } from 'ant-design-vue'
import ZForm from './Form'
import ZeroForm from './components'
import validator from './validate'
import addons from './core/addons'
import definitionRules from './core/definition/rule'
import schemaRules from './core/schema/rule'
import { generateDefaults } from './core/definition'
import mixin from './mixins'

const ajv = validator()

const rules = {
  addons, // 暴露 addons 给外部自定义
  schemaRules, // 暴露 schema 规则给外部自定义
  definitionRules, // 暴露 defintion 规则给外部自定义
  ajv,
  mixin
}

export {
  rules,
  generateDefaults
}

/* istanbul ignore next */
ZForm.install = function (Vue) {
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Form)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Switch)
  Vue.use(Select)
  Vue.use(Checkbox)
  Vue.use(Button)
  Vue.use(Icon)
  Vue.use(Popconfirm)
  Vue.use(Radio)

  Vue.prototype.$message = message
  Vue.prototype.$validator = ajv
  Vue.component(ZForm.name, ZForm)
  Vue.use(ZeroForm)
}

export default ZForm
