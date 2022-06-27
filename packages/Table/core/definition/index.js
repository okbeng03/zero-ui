import Vue from 'vue'
import { find, isFunction } from 'lodash'
import ObjectPath from 'objectpath'
import schemaParser from '../schema'
import defaultRule from '../schema/rules/default'
import rules, { hooks } from './rule'

function parse (dsl, schemaPathMap) {
  // before
  dsl = hooks.beforeParse(dsl)

  const columns = dsl.map(function (definition) {
    return traverse(definition, schemaPathMap)
  })

  return columns
}

const regArrayKeyword = /\[(\d+)\]/g

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

    // 自定义渲染
    if (customRender) {
      column = {}
      column.render = isFunction(customRender) ? customRender : new Function('h', 'text', 'record', 'index', customRender)
      delete definition.customRender
    } else {
      if (type) {
        const parser = find(rules, { name: type })

        if (!parser) {
          throw new Error(`defintion types has not ${type} parser`)
        }

        column = parser.parse(key, schema, parentSchema, definition)
      } else {
        column = schemaParser(key, schema, parentSchema, definition)
      }
    }
  }

  // 合并
  return Object.assign({}, defaultColumn, column, definition === key ? {} : definition)
}

export {
  rules,
  hooks
}

export default parse
