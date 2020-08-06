import moment from 'moment'
import { find } from 'lodash'

const momentFormatMap = {
  date: 'YYYY-MM-DD',
  'date-time': 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss'
}

export default function (key, schema, parentSchema, definition = {}) {
  const { format } = schema
  const options = definition.options || {}
  const column = {}

  if (format) {
    let render

    if (format === 'email') {
      render = function (h, text, record, index) {
        const value = `mailto:${text}`

        return <a href={ value }>{ text }</a>
      }
    }

    if (format === 'date' || format === 'date-time' || format === 'time') {
      render = function (h, text, record, index) {
        const value = moment(text).format(options.format || momentFormatMap[format])

        return <span>{ value }</span>
      }
    }

    if (format === 'uri') {
      render = function (h, text, record, index) {
        return <a href={ text } target={ options.target || '_blank' } title={ options.title || '' }>{ text }</a>
      }
    }

    if (format === 'image') {
      render = function (h, text, record, index) {
        const style = {
          width: options.width || '120px',
          height: options.height || '120px'
        }

        return <img src={ text } style={ style }></img>
      }
    }

    if (render) {
      column.render = render
    }
  }

  if (schema.enum && options.options) {
    column.render = function (h, text, record, index) {
      const item = find(options.options, (item) => item.value === text)
      const value = item ? item.label : text

      return <span>{ value }</span>
    }
  }

  return column
}
