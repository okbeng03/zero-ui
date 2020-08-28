const DATE_TYPE_ENUM = 'date,date-time,time'

export default function (schema, parentSchema, definition) {
  const type = schema.type
  const format = schema.format
  const cType = definition.type
  const mode = definition.input ? definition.input.mode : (cType === 'zero-date-picker' ? 'date' : '')

  if (type === 'string' && ((format && DATE_TYPE_ENUM.indexOf(format) > -1) || cType === 'zero-date-picker' || cType === 'zero-time-picker')) {
    let momentFormat = ''
    let type = 'zero-date-picker'

    if (cType) {
      switch (mode) {
        case 'date':
          momentFormat = 'YYYY-MM-DD'
          break
        case 'time':
          momentFormat = 'YYYY-MM-DD HH:mm:ss'
          break
        default:
          momentFormat = 'HH:mm:ss'
          type = 'zero-time-picker'
      }
    } else {
      switch (format) {
        case 'date-time':
          momentFormat = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'time':
          momentFormat = 'HH:mm:ss'
          type = 'zero-time-picker'
          break
        default:
          momentFormat = 'YYYY-MM-DD'
      }
    }

    return {
      type,
      input: {
        type: format,
        format: momentFormat,
        valueFormat: momentFormat
      },
      decorator: {}
    }
  }

  return
}
