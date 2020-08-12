import ZeroArray from './array'
import ZeroCheckbox from './checkbox'
import ZeroControl from './control'
import ZeroDateTime from './datetime'
import ZeroFieldset from './fieldset'
import ZeroInline from './inline'
import ZeroRadio from './radio'
import ZeroAction from './action'

const components = [
  ZeroArray,
  ZeroCheckbox,
  ZeroControl,
  ZeroDateTime,
  ZeroFieldset,
  ZeroInline,
  ZeroRadio,
  ZeroAction
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  ZeroArray,
  ZeroCheckbox,
  ZeroControl,
  ZeroDateTime,
  ZeroFieldset,
  ZeroInline,
  ZeroRadio
}

export default {
  install
}
