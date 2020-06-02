import Table from './Table'
import addons from './core/addons'
import { types as operationAddonRules } from './core/addons/operation'
import { rules as definitionRules } from './core/definition'
import { rules as schemaRules } from './core/schema'

const components = [
  Table
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.use(component)
  })
}

export {
  addons, // 暴露 addons 给外部自定义
  schemaRules, // 暴露 schema 规则给外部自定义
  definitionRules, // 暴露 defintion 规则给外部自定义
  operationAddonRules // 暴露 operation addon 规则给外部自定义
}

export default {
  install,
  version: require('../package.json').version
}
