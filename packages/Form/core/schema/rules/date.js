const DATE_TYPE_ENUM = 'date,date-time,time'

export default function (schema) {
  const type = schema.type
  const format = schema.format

  if (type === 'string' && (format && DATE_TYPE_ENUM.indexOf(format) > -1)) {
    let momentFormat = ''

    switch (format) {
      case 'date-time':
        momentFormat = 'YYYY-MM-DD HH:mm:ss'
        break
      case 'time':
        momentFormat = 'HH:mm:ss'
        break
      default:
        momentFormat = 'YYYY-MM-DD'
    }

    return {
      type: 'zero-date-time-picker',
      input: {
        type: format,
        format: momentFormat
      },
      decorator: {}
    }
  }

  return
}
