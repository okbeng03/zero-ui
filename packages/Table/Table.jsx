import axios from 'axios'
import generate from './core'
import addons from './core/addons'

export default {
  name: 'ZeroTable',
  props: {
    definition: Object,
    schema: Object
  },
  data () {
    return {
      dsl: {},
      selectedRowKeys: [],
      filters: {},
      sorter: {},
      dataSource: []
    }
  },
  computed: {
    pagination () {
      const { pageSize, current } = this.dsl.table.config.pagination

      return {
        current,
        pageSize
      }
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
  mounted () {
    this.fetch()
  },
  render (h) {
    const { dsl } = this
    const childrends = []

    addons.forEach(({ name }) => {
      const addon = dsl[name]
      if (addon && addon.render) {
        const children = addon.render.call(this, h)
        childrends.push(children)
      }
    })

    return h('div', {
      attrs: {
        class: 'zero-table-module'
      }
    }, childrends)
  },
  methods: {
    fetch () {
      const { pagination, filters, sorter } = this
      const { search, table } = this.dsl
      let key

      // filters
      const filtersParam = {}

      for (key in filters) {
        const filter = filters[key]

        if (filter.length) {
          filtersParam[key] = filter
        }
      }

      // sorter
      const sorterParam = {}

      if (sorter.field && sorter.order) {
        sorterParam[sorter.field] = sorter.order
      }

      const params = {
        ...pagination,
        filters: filtersParam,
        sorter: sorterParam
      }

      table.config.loading = true

      axios({
        method: search.config.method,
        url: search.config.api,
        data: params
      }).then(({ status, data, message }) => {
        if (status === 200) {
          const { list = [], total } = data

          this.dataSource = list
          table.config.pagination.total = total
        } else {
          this.$message.error(message || '网络异常，请稍后再试！')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error(err.message || '网络异常，请稍后再试！')
      }).finally(() => {
        table.config.loading = false
      })
    },
    onSearch (pagination, filters, sorter, data) {
      const { table } = this.dsl

      // TODO: filter、sorter时分页设为1

      table.config.pagination = {
        ...table.config.pagination,
        ...pagination
      }
      this.filters = filters
      this.sorter = sorter

      this.$nextTick(() => {
        this.fetch()
      })
    },
    onSelect (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
