// 表格模块
// import compiler from 'vue-template-compiler'
import Vue from 'vue'
import parser from '../definition'
import defaultConfig from '../config'

export default function (table, schema, schemaPathMap) {
  const columns = parser(table.columns, schemaPathMap)
  const config = {
    ...table,
    columns,
    ready: false
  }

  Object.assign(config, defaultConfig)

  const render = function (h) {
    const { dataSource } = this

    if (!config.ready) {
      // Table columns parse
      config.columns = config.columns.map(column => {
        if (column._customRender) {
          column.customRender = (text, record, index) => {
            return column._customRender.call(this, this.$createElement, text, record, index)
          }
        }

        if (column.template) {
          column.customRender = (text, record, index) => {
            const template = column.template(text, record, index)
            const render = Vue.compile(template)

            return render.render.call(this, text, record, index)
          }
        }

        return column
      })

      // Table rowSelection default event
      if (config.rowSelection && !config.rowSelection.onChange) {
        config.rowSelection.onChange = this.onSelect
      }

      // Table expand row render parse
      if (config.expandedRowRender) {
        const template = table.expandedRowRender

        config.expandedRowRender = (record, index, indent, expended) => {
          const _template = (new Function('record', 'index', 'indent', 'expended', template))(record, index, indent, expended)
          const render = Vue.compile(_template)

          return render.render.call(this)
        }
      }

      config.ready = true
    }

    return h('a-table', {
      attrs: {
        class: 'zero-table'
      },
      props: {
        dataSource,
        ...config
      },
      on: {
        change: this.onSearch
      }
    })
  }

  return {
    ...config,
    render
  }
}
