import extend from 'extend'

export default function (schema, parentSchema, definition) {
  return extend(true, {}, {
    type: 'zero-group',
    isLayout: true,
    hideTitle: true,
    input: {},
    formItem: {}
  }, definition)
}
