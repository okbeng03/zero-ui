import generate from '../core'
import { addons } from '../core/addons'

export default {
  name: 'ZeroTable',
  props: {
    definition: Object,
    schema: Object,
    dataSource: Array
  },
  data () {
    return {
      dsl: {},
      selectedRowKeys: []
    }
  },
  created () {
    const { definition, schema } = this
    const dsl = generate(definition, schema)
    const { actions } = dsl

    // methods parse
    if (actions) {
      for (const key in actions) {
        this[key] = actions[key]
      }
    }

    this.dsl = dsl
  },
  render (h) {
    const { dsl } = this
    const childrends = []

    addons.forEach(addonKey => {
      const addon = dsl[addonKey].render.call(this, h)
      childrends.push(addon)
    })

    return h('div', {
      attrs: {
        class: 'zero-table-page'
      }
    }, childrends)
  },
  methods: {
    onSearch (pagination, filters, sorter, data) {
      console.log(pagination, filters, sorter, data)
    },
    onSelect (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
