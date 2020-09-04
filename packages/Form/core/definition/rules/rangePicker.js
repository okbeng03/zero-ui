import extend from 'extend'

export default function (schema, parentSchema, definition) {
  return extend(true, {}, {
    type: 'zero-range-picker',
    isLayout: true,
    input: {},
    formItem: {}
  }, definition)
}
