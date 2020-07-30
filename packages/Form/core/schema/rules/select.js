import { enumToOptions } from '../../../../util/util'

export default function (schema) {
  const type = schema.type

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
