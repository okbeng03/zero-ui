export default function (schema) {
  const type = schema.type

  if (type === 'string') {
    const definition = {
      type: 'a-input',
      decorator: {
        validateTrigger: 'blur'
      }
    }

    if (schema.maxLength) {
      definition.input = {
        maxLength: schema.maxLength
      }
    }

    return definition
  }

  return
}
