import traverse from 'json-schema-traverse'
import ObjectPath from 'objectpath'

const regKeyword = /\/(items|properties)/g

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
      key = pointer.replace(regKeyword, '').substr(1).split('/')
      pathMap[ObjectPath.stringify(key)] = schema
    }
  })

  return pathMap
}

export default schemaPath
