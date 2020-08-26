export default function (schema) {
  const type = schema.type

  if (type === 'object') {
    const definition = {
      type: 'zero-fieldset',
      isLayout: true
    }

    return definition
  }

  return
}
