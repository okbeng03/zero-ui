import { enumToOptions } from '../../../../util/util'

export default function (schema) {
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
