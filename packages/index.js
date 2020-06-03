import Table, { rules as tableRules } from './Table'

const components = [
  Table
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
