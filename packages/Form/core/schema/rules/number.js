export default function (schema) {
  const type = schema.type

  if (type === 'number' || type === 'integer') {
    const definition = {
      type: 'zero-input-number',
      decorator: {
        validateTrigger: 'blur'
      },
      input: {}
    }

    if (typeof schema.minimum === 'number') {
      definition.input.min = schema.minimum
    }

    if (typeof schema.maximum === 'number') {
      definition.input.max = schema.maximum
    }

    if (schema.multipleOf) {
      definition.input.step = schema.multipleOf
    }

    return definition
  }

  return
}
