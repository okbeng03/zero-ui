import Table from './Table'

const components = [
  Table
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.use(component)
  })
}

export default {
  install,
  version: require('../package.json').version
}
