import generate from './core'
import addons from './core/addons'
import localize from './validate/localize'
import { parseErrors, removeEmptyValue } from '../util/util'

export default {
  name: 'ZeroForm',
  props: {
    definition: Object,
    schema: Object,
    defaultValue: [Object, Array]
  },
  data () {
    return {
      dsl: {},
      form: this.$form.createForm(this),
      model: {
        value: null
      }
    }
  },
  provide () {
    return {
      form: this.form,
      model: this.model,
      handleFieldValidate: this.handleFieldValidate.bind(this)
    }
  },
  created () {
    const { definition, schema } = this
    this.dsl = generate(definition, schema)
    this.validate = this.$validator.compile(schema)

    this.$watch('schema', (schema) => {
      this.validate = this.$validator.compile(schema)
      this.dsl = generate(this.definition, schema)
    }, {
      deep: true
    })

    this.$watch('definition', (definition) => {
      this.dsl = generate(definition, this.schema)
    }, {
      deep: true
    })

    this.model.value = this.defaultValue

    this.$watch('defaultValue', (newValue) => {
      this.model.value = newValue
    }, {
      deep: true
    })

    console.log(this.dsl)
  },
  mounted () {
    const { defaultValue } = this

    if (!_.isEmpty(defaultValue)) {
      this.form.setFieldsValue(defaultValue)
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
        class:'zero-form-module'
      }
    }, childrends)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()

      this.form.validateFields((errors, values) => {
        if (!errors) {
          removeEmptyValue(values)
          console.log('submit', values)
          this.$emit('submit', values)
        }
      })
    },
    handleFieldValidate (rule, value, callback) {
      const { validate, form, dsl } = this
      const schema = dsl.schemaPathMap
      const path = rule.fullField
      const model = form.getFieldsValue()
      // 移除空数据
      removeEmptyValue(model)

      const valid = validate(model)
      let error

      if (!valid) {
        localize(validate.errors, schema)
        const allErrors = parseErrors(validate.errors)

        if (allErrors[path]) {
          error = allErrors[path]
        }

        callback(error)
      } else {
        callback()
      }
    }
  }
}
