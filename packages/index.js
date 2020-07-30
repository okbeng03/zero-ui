import Table, { rules as tableRules } from './Table'
import Form from './Form'

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
  tableRules
}

export default {
  install,
  version: require('../package.json').version
}
