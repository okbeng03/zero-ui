import { find } from 'lodash'
import schemaPath from './path'
import rules from './rule.js'

export {
  rules,
  schemaPath
}

export default function (key, schema, parentSchema, definition = {}) {
  const type = schema.type
  const parser = find(rules, { name: type })

  return parser ? parser.parse(key, schema, parentSchema, definition, definition.options || {}) : {}
}
