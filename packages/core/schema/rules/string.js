import moment from 'moment'
import _ from 'lodash'

const momentFormatMap = {
  date: 'YYYY-MM-DD',
  'date-time': 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss'
}

export default function (key, schema, parentSchema, definition = {}, options = {}) {
  const { format, enums } = schema
  const column = {}

  if (format) {
    let customRender

    if (format === 'email') {
      customRender = (h, value, record, index) => {
        return <a href="mailto:{ value }">{ value }</a>
      }
    }

    if (format === 'date' || format === 'date-time' || format === 'time') {
      customRender = function (h, text, record, index) {
        const value = moment(text).format(options.format || momentFormatMap[format])

        return <span>{ value }</span>
      }
    }

    if (format === 'uri') {
      customRender = function (h, text, record, index) {
        return <a href={ text } target={ options.target || '_blank' }>{ text }</a>
      }
    }

    if (format === 'image') {
      customRender = function (h, text, record, index) {
        const style = {
          width: options.width || '120px',
          height: options.height || '120px'
        }

        return <img src={ text } style={ style }></img>
      }
    }

    if (customRender) {
      column._customRender = customRender
    }
  }

  if (enums && options.options) {
    column._customRender = function (h, text, record, index) {
      const item = _.find(options.options, (item) => item.value === text)
      const value = item ? item.text : text

      return <span>{ value }</span>
    }
  }

  return column
}
