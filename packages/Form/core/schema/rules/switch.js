export default function (schema) {
  const type = schema.type

  if (type === 'boolean') {
    return {
      type: 'a-switch',
      decorator: {
        valuePropName: 'checked'
      }
    }
  }

  return
}
