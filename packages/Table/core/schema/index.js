import { find } from 'lodash'
import rules from './rule.js'

export {
  rules
}

export default function (key, schema, parentSchema, definition = {}) {
  const type = schema.type
  const parser = find(rules, { name: type })

  return parser ? parser.parse(key, schema, parentSchema, definition) : {}
}
