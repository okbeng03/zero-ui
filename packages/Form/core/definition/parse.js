import { find } from 'lodash'
import extend from 'extend'
import rules from './rule'

export default function (definition, schema, parentSchema) {
  const { type }  = definition
  const parser = find(rules, { name: type })

  if (parser) {
    return parser.parse(schema, parentSchema, definition)
  }

  return extend(true, {}, definition)
}
