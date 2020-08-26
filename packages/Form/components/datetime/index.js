import { DatePicker, TimePicker } from 'ant-design-vue'
import ZeroDatePicker from './DatePicker'
import ZeroTimePicker from './TimePicker'

/* istanbul ignore next */
ZeroDatePicker.install = function (Vue) {
  Vue.use(DatePicker)
  Vue.use(TimePicker)
  Vue.component(ZeroDatePicker.name, ZeroDatePicker)
  Vue.component(ZeroTimePicker.name, ZeroTimePicker)
}

export default ZeroDatePicker
