export default function (schema) {
  const type = schema.type

  if (type === 'string') {
    return {
      type: 'a-input',
      decorator: {
        validateTrigger: 'blur'
      }
    }
  }

  return
}
