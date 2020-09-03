import extend from 'extend'
import FormMixin from '../../mixins/form'

const List = {
  name: 'zero-group',
  mixins: [ FormMixin ],
  render (h) {
    return (
      <div class="zero-group">
        { this.renderItems(h) }
      </div>
    )
  },
  methods: {
    renderItems (h) {
      const { definition } = this

      return definition.items.map((item, i) => {
        const component = item.type
        const inputProps = {
          props: {
            ...item.input,
            definition: item,
            path: this.getPath(item.key)
          }
        }

        if (item.decorator) {
          const id = this.getDecoratorId(item.key)
          const decorator = extend(true, {}, item.decorator)
    
          if (!decorator.rules) {
            decorator.rules = []
          }
    
          decorator.rules.push({
            validator: this.handleFieldValidate
          })
    
          inputProps.directives = [
            {
              name: 'decorator',
              value: [
                id,
                {
                  ...decorator
                }
              ]
            }
          ]
        }

        return h(component, inputProps, definition.input.children || [])
      })
    }
  }
}

export default List
