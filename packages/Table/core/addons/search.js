// 搜索模块
import extend from 'extend'
import defaultConfig from '../config'

export default function (search = {}, schema) {
  const config = extend(true, {}, defaultConfig.search, search)

  function render (h) {
    const definition = {
      form: config.form
    }

    if (definition.form.items) {
      return h('zero-form', {
        attrs: {
          class: 'zero-table-search'
        },
        props: {
          definition,
          schema,
          defaultValue: config.params
        },
        on: {
          submit: this.onSearch
        },
        ref: 'search'
      })
    } else {
      return null
    }
  }

  return {
    config,
    render
  }
}
