// 操作模块
import button from '../components/button'

export default function (operation) {
  const { items } = operation
  const actions = []

  if (items.length) {
    items.forEach(item => {
      actions.push(button(item))
    })
  }

  const render = function (h) {
    const childrens = actions.map(children => {
      return children._customRender.call(this, h)
    })

    return h('div', {
      attrs: {
        class: 'zero-operations'
      }
    }, childrens)
  }

  return {
    actions,
    render
  }
}
