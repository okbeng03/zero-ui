export default function (schema) {
  const type = schema.type

  if (type === 'number' || type === 'integer') {
    return {
      type: 'a-input-number',
      decorator: {
        validateTrigger: 'blur'
      }
    }
  }

  return
}
