import Fieldset from './Fieldset'
import './style/index.less'

/* istanbul ignore next */
Fieldset.install = function (Vue) {
  Vue.component(Fieldset.name, Fieldset)
}

export default Fieldset
