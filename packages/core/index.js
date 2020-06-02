import schemaPath from './schema/path'
import actionParser from './action'
import parser, { addons } from './addons'

function parse (definition, schema) {
  const schemaPathMap = schemaPath(schema)
  const { actions } = definition
  const dsl = {}

  if (actions) {
    dsl.actions = actionParser(actions)
  }

  addons.forEach(addon => {
    dsl[addon] = parser[addon](definition[addon], schema, schemaPathMap)
  })

  return dsl
}

export default parse
