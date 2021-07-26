import extend from 'extend'
import parse from '../definition'
import defaultConfig from '../config'

export default function (definition, schema, schemaPathMap) {
  const config = extend(true, {}, defaultConfig.form, definition)

  if (config.layout !== 'horizontal') {
    delete config.labelCol
    delete config.wrapperCol
  }

  const items = parse(config, schemaPathMap, schema)
  config.definition = items
  delete config.items
 
  const render = function (h) {
    const { form, loading, $slots } = this
    const { config } = this.dsl.form
    const { footer = [] } = $slots || {}

    return h('a-form', {
      props: {
        form,
        ...config
      },
      on: {
        submit: this.handleSubmit
      }
    }, [
      h('zero-fieldset', {
        props: {
          path: [],
          definition: config.definition
        }
      }),
      footer,
      h('zero-action', {
        props: {
          config,
          form,
          loading
        }
      })
    ])
  }

  return {
    config,
    render
  }
}
