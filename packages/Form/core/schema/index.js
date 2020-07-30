import { find } from 'lodash'
import parsers from './rule'

export default function (schema, parentSchema, definition) {
  const type = schema.type
  const rules = find(parsers, { name: type }).rules
  let def

  for (let i = 0, len = rules.length; i < len; i++) {
    def = rules[i](schema, parentSchema, definition)

    if (def) {
      break
    }
  }

  return def
}
