export default function (options) {
  const { type = 'default', action, confirm, text, ...attr } = options
  const children = text

  const render = function (h, text, record, index) {
    const props = {
      type
    }
    const attrs = {
      ...attr,
      class: 'zero-button'
    }
    const _action = ($event) => this[action]($event, text, record, index)

    if (confirm) {
      return h('a-popconfirm', {
        props: {
          ...confirm,
          okText: confirm.okText || '确定',
          cancelText: confirm.cancelText || '取消',
          title: confirm.title || '操作前请三思...'
        },
        on: {
          confirm: _action
        }
      }, [
        h('a-button', {
          props,
          ...attrs,
        }, children)
      ])
    } else {
      return h('a-button', {
        props,
        ...attrs,
        on: {
          click: _action
        }
      }, children)
    }
  }

  return {
    render
  }
}
