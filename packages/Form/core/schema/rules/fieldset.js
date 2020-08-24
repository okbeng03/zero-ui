export default function (schema) {
  const type = schema.type

  if (type === 'object') {
    const definition = {
      type: 'zero-fieldset'
    }

    return definition
  }

  return
}
