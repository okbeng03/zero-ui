import { Form, Input, InputNumber, Switch, Select, Checkbox, Button, Row, Col, Icon, Popconfirm } from 'ant-design-vue'
import ZForm from './Form'
import ZeroForm from './components'
import validator from './validate'

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

  Vue.prototype.$validator = validator()
  Vue.component(ZForm.name, ZForm)
  Vue.use(ZeroForm)
}

export default ZForm
