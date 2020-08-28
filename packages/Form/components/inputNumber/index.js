import { InputNumber } from 'ant-design-vue'
import ZeroInputNumber from './InputNumber'

/* istanbul ignore next */
ZeroInputNumber.install = function (Vue) {
  Vue.use(InputNumber)
  Vue.component(ZeroInputNumber.name, ZeroInputNumber)
}

export default ZeroInputNumber
