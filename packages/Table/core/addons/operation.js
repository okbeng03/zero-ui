// 操作模块
import { find } from 'lodash'
import button from '../../components/button'

const types = [
  {
    name: 'primary',
    parse: button
  },
  {
    name: 'default',
    parse: button
  },
  {
    name: 'danger',
    parse: button
  },
  {
    name: 'ghost',
    parse: button
  },
  {
    name: 'dashed',
    parse: button
  },
  {
    name: 'link',
    parse: button
  }
]

export {
  types
}

export default function (operation = {}) {
  const { items } = operation

  if (!items || !items.length) {
    return
  }

  const actions = []
  items.forEach(item => {
    const parser = find(types, { name: item.type })

    if (!parser) {
      throw new Error(`operation addon has not ${item.type} parser`)
    }

    actions.push(parser.parse(item))
  })

  const render = function (h) {
    const childrens = actions.map(children => {
      return children.render.call(this, h)
    })

    return h('div', {
      attrs: {
        class: 'zero-operations'
      }
    }, childrens)
  }

  return {
    config: {
      actions
    },
    render
  }
}
