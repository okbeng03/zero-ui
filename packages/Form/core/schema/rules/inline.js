import { size, each } from 'lodash'

export default function (schema, parentSchema) {
  const type = schema.type
  const parentType = parentSchema.type

  if (type === 'object') {
    if (parentType && parentType === 'array') {
      const size = size(schema.properties)
      const col = Math.floor(24 / size)
      const columns = []

      each(schema.properties, (val, key) => {
        const required = schema.required && _.indexOf(schema.required, key) !== -1
        columns.push({
          col,
          label: val.title || '',
          required
        })

        val.title = ''
      })

      return {
        type: 'zero-inline',
        
      }
    }
  }

  return
}
