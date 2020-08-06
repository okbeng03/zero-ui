import extend from 'extend'
import FormMixin from '../../mixins'

const Control = {
  name: 'zero-control',
  props: {
    hideTitle: Boolean
  },
  mixins: [ FormMixin ],
  render (h) {
    const { path, definition, hideTitle } = this
    const component = definition.type
    const groupProps = {
      props: definition.formItem
    }
    const inputProps = {
      props: {
        ...definition.input,
        definition,
        path
      }
    }

    if (definition.decorator) {
      const id = this.getDecoratorId(definition.key)
      const decorator = extend(true, {}, definition.decorator)

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

    if (definition.formItem && definition.formItem.label) {
      if (hideTitle) {
        groupProps.label = ''
      }

      return h('a-form-item', {
        ...groupProps,
      }, [
        h(component, inputProps)
      ])
    } else {
      return h(component, inputProps)
    }
  }
}

export default Control
