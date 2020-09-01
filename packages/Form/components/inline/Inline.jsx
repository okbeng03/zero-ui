import FormMixin from '../../mixins/form'

const List = {
  name: 'zero-inline',
  props: {
    columns: Array,
    hideTitle: {
      type: Boolean,
      default: false
    }
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
      const { definition, hideTitle } = this
      const columns = this.columns || definition.formItem.columns

      return definition.items.map((item, i) => {
        if (hideTitle) {
          delete item.formItem.wrapperCol
        }

        return (
          <a-col span={ columns[i].col }>
            <zero-control path={ this.getPath(item.key) } definition={ item } hideTitle={ hideTitle }></zero-control>
          </a-col>
        )
      })
    }
  }
}

export default List
