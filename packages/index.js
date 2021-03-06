import Table, { rules as tableRules } from './Table'
import Form, { rules as formRules, generateDefaults } from './Form'

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
  formRules,
  Table,
  Form,
  generateDefaults
}

export default {
  install,
  version: require('../package.json').version
}
