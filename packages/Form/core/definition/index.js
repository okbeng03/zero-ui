import { findIndex, find, remove, cloneDeep } from 'lodash'
import ObjectPath from 'objectpath'
import extend from 'extend'
import defaultRule from '../schema/rules/default'
import schemaParser from '../schema'
import definitionParser from './parse'
import schemaPath from '../../../util/schemaPath'

function parse (definition, schemaPathMap, root) {
  const items = definition.items

  // 转成嵌套结构
  const constructKeys = generateDefaults(null, schemaPathMap)

  // 补齐完整 definition
  const dsl = parseDefinition(items)
  fill(dsl, constructKeys, '')

  // 解析规则
  const _definition = parseRule(dsl, schemaPathMap, root, definition)

  return _definition
}

export function generateDefaults (schema, schemaPathMap) {
  if (schema) {
    schemaPathMap = schemaPath(schema)
  }

  const schemaPathMapKeys = Object.keys(schemaPathMap)

  // 转成嵌套结构
  const constructKeys = []
  construct(schemaPathMapKeys, constructKeys, '')

  return constructKeys
}

// 生成渲染数据结构
function parseRule (dsl, schemaPathMap, root, definition) {
  const def = dsl[0]
  const key = def.key
  const keyArray = key ? ObjectPath.parse(key) : []
  keyArray.splice(-1, 1)
  const parentSchema = keyArray.length
    ? schemaPathMap[ObjectPath.stringify(keyArray)]
    : root

  return dsl.map(item => {
    return traverse(item, schemaPathMap, parentSchema, definition)
  })
}

const baseTypes = ['boolean', 'number', 'string', 'integer', 'object', 'array']

function traverse (def, schemaPathMap, parentSchema, definition) {
  const key = def.key
  const schema = schemaPathMap[key]
  let config
  // 获取 schema 默认配置
  const defaults = key ? defaultRule(key, schema, parentSchema, definition) : {}

  // definition 未指定type or type 为基础类型，走 schema 基础规则解析
  if (!def.type || baseTypes.indexOf(def.type) > -1) {
    config = schemaParser(schema, parentSchema, def, defaults)
  } else {
    config = definitionParser(def, schema, parentSchema)
  }

  // 非布局组件，必须加上decorator
  if (!config.isLayout && typeof config.decorator === 'undefined') {
    config.decorator = {}
  }

  if (def.items) {
    config.items = parseRule(def.items, schemaPathMap, parentSchema, definition)
  }

  delete def.type

  return extend(true, {}, defaults, config, def)
}

// 扁平结构组装成嵌套结构
function construct (schemaPathMapKeys, parent, parentPath = '') {
  const keys = schemaPathMapKeys.slice()
  const leafs = remove(keys, item => item.indexOf('[0]') <= 0 && item.indexOf('.') < 0)

  leafs.forEach(key => {
    // 找出子节点
    const childs = remove(keys, item => new RegExp(`${key}(\\.|\\[0\\])`).test(item) || item.indexOf('[0]') === 0).map(item => item.replace(key === '[0]' ? '[0].' : new RegExp(`${key}\\.?`), ''))
    const path = `${parentPath}${key}`

    if (childs.length) {
      const isArray = childs[0] === '[0]'
      const node = {
        key: path,
        type: isArray ? 'array' : 'object',
        items: []
      }
      construct(childs, node.items, `${path}${isArray ? '' : '.'}`)
      parent.push(node)
    } else {
      parent.push({
        key: path
      })
    }
  })
}

// 补齐完整的 definition
// 规则:
// ['*'], ['itemA', '*'], ['*', 'itemA'], ['itemA', '*', 'itemB']
// 只能出现一次 '*'，否则位置会出现不确定性
// 遇到 '*' 则排除数组里定义的元素，自动补齐 schema 描述
const placeholder = '*'

function fill (items, schemaPathMap) {
  const len = items.length
  const idx = findIndex(items, item => item.key === placeholder)

  if (!len || (idx === 0 && len === 1)) {
    items.splice(idx, 1, ...schemaPathMap)
    return
  }

  items.forEach(item => {
    if (typeof item === 'string') {
      return
    }

    if (item.items) {
      const child = find(schemaPathMap, child => child.key === item.key)

      fill(item.items, child ? child.items : schemaPathMap)
    }

    remove(schemaPathMap, exitItem => exitItem.key === item.key)
  })

  if (idx > -1) {
    // const _items = generate(items, schemaPathMap)
    items.splice(idx, 1, ...schemaPathMap)
  }
}

// 排除已定义 formItem
// function generate (exitItems, schemaPathMap) {
//   const items = cloneDeep(schemaPathMap)
//   const items = schemaPathMap
//   exitItems.forEach(exitItem => {
//     remove(items, item => typeof exitItem === 'string' ? exitItem === item.key : exitItem.key === item.key)
//   })

//   return items
// }

const regArrayKeyword = /\[\]/g

// 兼容以前 definition.key 数组用 `[]` 定义
function parseDefinition (items) {
  return items.map(item => {
    if (typeof item === 'string') {
      return {
        key: item.replace(regArrayKeyword, '[0]')
      }
    } else {
      if (typeof item.key === 'undefined') {
        return item
      }

      const newItem = {
        ...item,
        key: item.key.replace(regArrayKeyword, '[0]')
      }

      if (item.items) {
        newItem.items = parseDefinition(item.items)
      }

      return newItem
    }
  })
}

export default parse
