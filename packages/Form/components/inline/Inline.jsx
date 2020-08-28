import FormMixin from '../../mixins/form'

const List = {
  name: 'zero-list-inline',
  props: {
    columns: Array
  },
  mixins: [ FormMixin ],
  render (h) {
    return (
      <a-row>
        { this.renderItems(h) }
      </a-row>
    )
  },
  methods: {
    renderItems (h) {
      const { definition, columns } = this

      return definition.items.map((item, i) => {
        delete item.formItem.wrapperCol

        return (
          <a-col span={ columns[i].col }>
            <zero-control path={ this.getPath(item.key) } definition={ item } hideTitle={ true }></zero-control>
          </a-col>
        )
      })
    }
  }
}

export default List
