import { size, each } from 'lodash'
import ObjectPath from 'objectpath'

export default function (schema, parentSchema, def) {
  const type = schema.type

  if (type === 'array') {
    const childSchema = schema.items
    const definition = {
      type: 'zero-list',
      isLayout: true,
      input: {}
    }

    if (schema.minItems) {
      definition.input.minItems = schema.minItems
    }

    if (schema.maxItems) {
      definition.input.maxItems = schema.maxItems
    }

    if (childSchema.type === 'object') {
      const len = size(childSchema.properties)
      let flag = false

      if (len <= 6) {
        flag = true
        each(childSchema.properties, val => {
          if (val.type === 'object' || val.type === 'array') {
            flag = false
            return false
          }
        })
      }

      if (flag) {
        const columns = []
        const col = Math.floor(24 / len)

        _.each(def.items[0].items, (item) => {
          const key = ObjectPath.parse(item.key).pop()[0]
          const required = childSchema.required && _.indexOf(childSchema.required, key) !== -1
          const val = childSchema.properties[key]

          columns.push({
            col,
            label: val.title || '',
            required
          })
        })

        definition.columns = columns
      }
    }

    return definition
  }

  return
}
