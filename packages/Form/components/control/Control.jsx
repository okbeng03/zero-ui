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
      ...definition.formItem
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
      inputProps.directives = [
        {
          name: 'decorator',
          value: [
            id,
            {
              ...definition.decorator,
              rules: [
                {
                  validator: this.handleFieldValidate
                }
              ]
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
        props: groupProps,
      }, [
        h(component, inputProps)
      ])
    } else {
      return h(component, inputProps)
    }
  }
}

export default Control
