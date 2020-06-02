import parsers from './rule.js'

export default function (key, schema, parentSchema, definition = {}) {
  const type = schema.type
  const parser = parsers[type]

  return parser ? parser(key, schema, parentSchema, definition, definition.options || {}) : {}
}
