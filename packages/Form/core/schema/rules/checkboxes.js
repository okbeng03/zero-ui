import { enumToOptions } from '../../../../util/util'

export default function (schema, parentSchema, definition, defaults) {
  const type = schema.type

  if (type === 'array' && schema.items && schema.items['enum']) {
    if (defaults.formItem.required && !schema.minItems) {
      schema.minItems = 1
    }

    return {
      type: 'a-checkbox-group',
      input: {
        options: enumToOptions(schema.items['enum'])
      },
      decorator: {}
    }
  }

  return
}
