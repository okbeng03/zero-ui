import extend from 'extend'
import FormMixin from '../../mixins/form'
import { pick } from "lodash"

const propsKey = ["class", "style", "domProps", "on", "nativeOn", "directives", "scopedSlots", "slot", "key", "ref", "refInFor"];

const Control = {
  name: 'zero-control',
  props: {
    hideTitle: Boolean
  },
  mixins: [ FormMixin ],
  mounted () {
    const { definition } = this

    // 设置 default value
    if (definition.decorator) {
      const id = this.getDecoratorId(definition.key)
      let val = this.getFieldDefaultValue(id)

      if (typeof val === 'undefined') {
        val = typeof definition.schema.default !== 'undefined'
        ? definition.schema.default
        : definition.schema.type === 'boolean'
          ? false : undefined
      }

      if (typeof val !== 'undefined') {
        this.form.setFieldsValue({
          [id]: val
        })
      }
    }
  },
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
      },
      attrs: {
        ...(definition.attrs || {})
      },
      ...(pick(definition.input || {}, propsKey))
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

    if (definition.decorator || (!definition.hideTitle && definition.formItem && definition.formItem.label)) {
      if (hideTitle) {
        groupProps.props.label = ''
      }

      return h('a-form-item', {
        ...groupProps,
      }, [
        h(component, inputProps, definition.input.children || [])
      ])
    } else {
      return h(component, inputProps, definition.input.children || [])
    }
  }
}

export default Control
