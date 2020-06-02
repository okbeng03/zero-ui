import ObjectPath from 'objectpath'
import schemaParser from '../schema/index'
import defaultRule from '../schema/rules/default'
import rules from './rule'

function parse (dsl, schemaPathMap) {
  const columns = dsl.map(function (definition) {
    return traverse(definition, schemaPathMap)
  })

  return columns
}

const regArrayKeyword = /\[\]/g

function traverse (definition, schemaPathMap) {
  let key = typeof definition === 'string' ? definition : definition.dataIndex || definition.key
  key = key.replace(regArrayKeyword, '[0]')
  const schema = schemaPathMap[key]
  let parentSchema = null
  const keyArray = ObjectPath.parse(key)
  keyArray.splice(-1, 1)

  if (keyArray.length) {
    parentSchema = schemaPathMap[ObjectPath.stringify(keyArray)]
  }

  // 默认规则
  const defaultColumn = defaultRule(key, schema)
  let column

  // only key，schema 推断
  if (definition === key) {
    column = schemaParser(key, schema, parentSchema, definition)
  } else {
    const { type, customRender } = definition

    if (customRender) {
      column = {}
      column.template = function (text, record, index) {
        const template = (new Function('text', 'record', 'index', customRender))(text, record, index)

        return template.replace('text', 'arguments[0]').replace('record', 'arguments[1]').replace('index', 'arguments[2]')
      }
      delete definition.customRender
    } else {
      if (type) {
        const parser = rules[type]

        if (parser) {
          column = parser(key, schema, parentSchema, definition, definition.options || {})
        } else {
          column = {}
        }
      } else {
        column = schemaParser(key, schema, parentSchema, definition)
      }
    }
  }

  // 合并
  return Object.assign({}, defaultColumn, column, definition === key ? {} : definition)
}

export default parse
