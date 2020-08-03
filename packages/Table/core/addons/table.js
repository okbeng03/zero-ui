// 表格模块
import Vue from 'vue'
import extend from 'extend'
import { isFunction } from 'lodash'
import columnsParse from '../definition'
import defaultConfig from '../config'

export default function (table, schema, schemaPathMap) {
  const columns = columnsParse(table.columns, schemaPathMap)
  const config = extend(true, {}, defaultConfig.table, {
    ...table,
    columns,
    ready: false
  })

  const render = function (h) {
    const { dataSource } = this
    const { config } = this.dsl.table

    if (!config.ready) {
      // Table columns parse
      config.columns = config.columns.map(column => {
        if (column.render) {
          column.customRender = (text, record, index) => {
            return column.render.call(this, this.$createElement, text, record, index)
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
        if (!isFunction(config.expandedRowRender)) {
          const template = config.expandedRowRender

          config.expandedRowRender = (record, index, indent, expended) => {
            return (new Function('h', 'record', 'index', 'indent', 'expended', template)).call(this, this.$createElement, record, index, indent, expended)
          }
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
        change: this.onChange
      }
    })
  }

  return {
    config,
    render
  }
}
