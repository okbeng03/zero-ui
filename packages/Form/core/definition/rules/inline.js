import extend from 'extend'

export default function (schema, parentSchema, definition) {
  const { columns = [], labelCol, wrapperCol } = definition.formItem || {}

  const def = {
    type: 'zero-inline',
    isLayout: true,
    input: {},
    formItem: {}
  }

  const items = definition.items

  if (!columns.length) {
    const col = Math.floor(24 / items.length)
    
    items.forEach(() => {
      columns.push({
        col
      })
    })

    def.formItem.columns = columns
  }

  if (labelCol && wrapperCol) {
    const formItem = {
      labelCol,
      wrapperCol
    }

    items.forEach(item => {
      item.formItem = extend(true, {}, formItem, item.formItem)
    })
  }

  return extend(true, {}, def, definition)
}
