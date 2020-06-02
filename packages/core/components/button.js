export default function (options) {
  const { type = 'default', action, confirm, text } = options
  const children = text

  const customRender = function (h, text, record, index) {
    const props = {
      type
    }
    const attrs = {
      'zero-button': true
    }
    const _action = () => this[action](text, record, index)

    if (confirm) {
      return h('a-popconfirm', {
        props: {
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
          class: attrs
        }, children)
      ])
    } else {
      return h('a-button', {
        props,
        class: attrs,
        on: {
          click: _action
        }
      }, children)
    }
  }

  return {
    _customRender: customRender
  }
}
