import { enumToOptions } from '../../../../util/util'

export default function (schema, parentSchema, definition) {
  const type = schema.type

  if (definition.type === 'select') {
    return {
      type: 'a-select',
      input: {
        options: [
          {
            label: '请选择',
            value: ''
          }
        ]
      },
      decorator: {}
    }
  }

  if (type === 'string' && schema['enum']) {
    return {
      type: 'a-select',
      input: {
        options: enumToOptions(schema['enum'])
      },
      decorator: {}
    }
  }

  return
}
