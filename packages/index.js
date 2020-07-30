import Table, { rules as tableRules } from './Table'
import Form, { rules as formRules } from './Form'

const components = [
  Table,
  Form
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.use(component)
  })
}

export {
  tableRules,
  formRules
}

export default {
  install,
  version: require('../package.json').version
}
