import { enumToOptions } from '../../../../util/util'

export default function (definition, schema) {
  if (schema && schema.enums) {
    return {
      type: 'zero-radio',
      input: {
        options: enumToOptions(schema.enums)
      },
      decorator: {}
    }
  }

  return
}
