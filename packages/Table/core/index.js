import schemaPath from '../../util/schemaPath'
import actionParse from './action'
import addons from './addons'

function parse (definition, schema) {
  const schemaPathMap = schemaPath(schema)
  const { actions } = definition
  const dsl = {}

  if (actions) {
    dsl.actions = actionParse(actions)
  }

  addons.forEach(({ name, parse }) => {
    dsl[name] = parse(definition[name], schema, schemaPathMap)
  })

  return dsl
}

export default parse
