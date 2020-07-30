export default function (schema) {
  const type = schema.type

  if (type === 'object') {
    const defintion = {
      type: 'zero-fieldset'
    }

    return defintion
  }

  return
}
