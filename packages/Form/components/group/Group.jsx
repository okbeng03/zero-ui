import extend from 'extend'
import FormMixin from '../../mixins/form'

const List = {
  name: 'zero-group',
  mixins: [ FormMixin ],
  render (h) {
    const { definition } = this
    const groupProps = {
      attrs: {
        class: 'ant-row ant-form-item zero-group'
      },
      props: definition.formItem
    }

    return h('a-form-item', {
      ...groupProps,
    }, [
      this.renderItems(h)
    ])
  },
  methods: {
    renderItems (h) {
      const { definition } = this

      return (definition.items || definition).map(item => {
        const style = {}

        if (item.width) {
          style.width = item.width
        } else {
          style.flex = 1
        }

        return (
          <div class="zero-group-item" style={ style }>
            {
              h('zero-control', {
                props: {
                  path: this.getPath(item.key),
                  definition: item,
                  hideTitle: true
                }
              })
            }
          </div>
        )
      })
    }
  }
}

export default List
