import { isArray } from 'lodash'
import schemaPath from '../../util/schemaPath'
import addons from './addons'

function parse (definition, schema) {
  const schemaPathMap = schemaPath(schema)
  const dsl = {}
  let _definition = {}

  if (isArray(definition)) {
    _definition.form = {
      items: definition
    }
  } else {
    _definition = definition
  }

  addons.forEach(({ name, parse }) => {
    dsl[name] = parse(_definition[name], schema, schemaPathMap)
  })

  dsl.schemaPathMap = schemaPathMap

  return dsl
}

export default parse
