// 操作列
import button from './button'

export default function (key, schema, parentSchema, definition = {}, options = {}) {
  const { items } = options
  const actions = []

  if (items.length) {
    items.forEach(item => {
      actions.push(button(item))
    })
  }

  const customRender = function (h, text, record, index) {
    const childrens = actions.map(children => {
      return children._customRender.call(this, h, text, record, index)
    })

    return h('div', {
      attrs: {
        class: 'zero-column-actions'
      }
    }, childrens)
  }

  return {
    _customRender: customRender
  }
}
