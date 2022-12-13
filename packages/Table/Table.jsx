// import axios from 'axios'
import generate from './core'
import addons from './core/addons'

export default {
  name: 'ZeroTable',
  props: {
    definition: Object,
    schema: Object,
    dataSource: Array,
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dsl: {},
      selectedRowKeys: [],
      filters: {},
      sorter: {},
      params: {},
      list: []
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

    this.dsl = dsl
    this.params = dsl.search.config.params
    this.context = definition.context || this.$parent
  },
  mounted () {
    const { dataSource, lazy } = this

    if (!lazy) {
      this.fetch()
    }

    if (dataSource && dataSource.length) {
      this.list = dataSource
    }
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
    async fetch () {
      const { pagination, filters, sorter, params } = this
      const { search, table } = this.dsl

      // filters
      const filtersParam = {}

      for (const key in filters) {
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

      const searchParam = {
        ...pagination,
        filters: filtersParam,
        sorter: sorterParam,
        search: {
          ...params
        }
      }

      // search callback
      if (search.config.fetch && typeof search.config.fetch === 'function') {
        table.config.loading = true
        search.config.fetch.call(this, searchParam)
      } else {
        if (search.config.api) {
          table.config.loading = true

          let params = searchParam

          if (search.config.interceptors.transformRequest) {
            params = await search.config.interceptors.transformRequest(searchParam)
          }

          let options = {
            method: search.config.method,
            url: search.config.api,
            data: params
          }

          // 请求拦截器
          if (search.config.axios) {
            options = {
              ...search.config.axios,
              ...options
            }
          }

          this.$request(options).then(data => {
            this.onFetchSuccess(data)
          }).catch(err => {
            console.error(err)
            this.onFetchFail(err)
          })
        }
      }
    },
    async onFetchSuccess (data) {
      const { interceptors } = this.dsl.search.config

      if (interceptors.success) {
        data = await interceptors.success(data)
      }

      const { list = [], total = 0 } = data

      this.list = list
      this.dsl.table.config.pagination.total = total
      this.$emit('search', data)
      this.dsl.table.config.loading = false
    },
    onFetchFail (err) {
      const { interceptors } = this.dsl.search.config

      this.dsl.table.config.loading = false

      if (interceptors.fail) {
        interceptors.fail(err)
      } else {
        this.$message.error(err.message || '网络异常，请稍后再试！')
      }
      
    },
    onChange (pagination, filters, sorter) {
      const { config } = this.dsl.table
      config.pagination = {
        ...config.pagination,
        ...pagination
      }

      this.filters = filters
      this.sorter = sorter

      this.fetch()
    },
    onSearch (values) {
      const { config } = this.dsl.table
      this.params = values
      config.pagination = {
        ...config.pagination,
        current: 1
      }

      this.fetch()
    },
    onSelect (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 刷新请求
    reload (fromStart) {
      if (fromStart === true) {
        const { config } = this.dsl.table
        config.pagination = {
          ...config.pagination,
          current: 1
        }
      }

      this.fetch()
    }
  }
}
