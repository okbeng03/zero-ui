import ObjectPath from 'objectpath'
import { findIndex, get, set } from 'lodash'
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
      // dsl: {},
      form: this.$form.createForm(this),
      model: {
        value: null
      }
    }
  },
  computed: {
    dsl () {
      const { definition, schema } = this

      return generate(definition, schema)
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
    const { schema } = this
    this.validate = this.$validator.compile(schema)

    this.$watch('schema', (schema) => {
      this.validate = this.$validator.compile(schema)
    }, {
      deep: true
    })

    this.model.value = this.defaultValue

    this.$watch('defaultValue', (newValue) => {
      this.model.value = newValue
      this.$nextTick(() => {
        this.form.setFieldsValue(newValue)
      })
    }, {
      deep: true
    })
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
          // 移除空数据
          removeEmptyValue(values)
          this.$emit('submit', values)
        }
      })
    },
    handleFieldValidate (rule, value, callback) {
      const { validate, form, dsl, schema } = this

      if (!dsl.form.config.validate) {
        callback()
      }

      const path = rule.fullField
      const model = form.getFieldsValue()
      // 移除空数据
      removeEmptyValue(model)

      const valid = validate(model)
      let error

      if (!valid) {
        localize(validate.errors, schema, dsl.schemaPathMap)
        const allErrors = parseErrors(validate.errors)

        if (allErrors[path]) {
          error = allErrors[path]
        }

        callback(error)
      } else {
        callback()
      }
    },
    // 设置指定 key input
    setOptions (key, options) {
      let definition = this.dsl.form.config.definition
      const keys = ObjectPath.parse(key)
      let flag = true

      keys.forEach((k, i) => {
        if (k === '0') {
          definition = (i === 0 ? definition : definition.items)[0]
          return
        }

        const path = ObjectPath.stringify(keys.slice(0, i + 1))
        const idx = findIndex(definition, { key: path })

        if (idx < 0) {
          flag = false
          return
        }

        definition = (i === 0 ? definition : definition.items)[idx]
      })

      if (flag) {
        definition.input = {
          ...definition.input,
          ...options
        }

        this.$forceUpdate()
      }
    }
  }
}
