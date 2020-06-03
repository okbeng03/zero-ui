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

  const render = function (h, text, record, index) {
    const childrens = actions.map(children => {
      return children.render.call(this, h, text, record, index)
    })

    return h('div', {
      attrs: {
        class: 'zero-column-actions'
      }
    }, childrens)
  }

  return {
    render
  }
}
