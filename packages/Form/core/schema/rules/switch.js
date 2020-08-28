export default function (schema, parentSchema, definition) {
  const type = schema.type

  if (type === 'boolean' || definition.type === 'a-switch') {
    return {
      type: 'a-switch',
      decorator: {
        valuePropName: 'checked'
      }
    }
  }

  return
}
