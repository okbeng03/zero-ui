import traverse from 'json-schema-traverse'

const regPropertiees = /\/properties/g
const regItems = /\/items/g
const regSplit = /\//g

/**
 * 遍历 jsonSchema，得到 pathMap
 * @param {Object} jsonSchema
 * @return {Object} pathMap
 */
function schemaPath (jsonSchema) {
  const pathMap = {}
  let key

  traverse(jsonSchema, function (schema, pointer, root, parentPointer, parentKeyword, parentSchema, property) {
    if (pointer) {
      key = pointer.replace(regPropertiees, '').replace(regItems, '[0]').substr(1).replace(regSplit, '.')
      pathMap[key] = {
        _property: property || '',
        ...schema
      }
    }
  })

  return pathMap
}

export default schemaPath
