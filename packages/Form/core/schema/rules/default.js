// 通用默认规则
import { indexOf } from 'lodash'

export default function (key, schema, parentSchema, definition) {
  const required = parentSchema.required ? indexOf(parentSchema.required, schema._property) !== -1 : false
  const def = {
    key,
    schema,
    formItem: {
      label: schema.title,
      required
    },
    input: {}
  }

  if (!definition.labelCol && definition.wrapperCol) {
    def.formItem = {
      ...def.formItem,
      labelCol: definition.labelCol,
      wrapperCol: definition.wrapperCol
    }
  }

  // if (parentSchema) {
  //   if (definition.labelCol) {
  //     def.formItem.labelCol = {
  //       span: 24
  //     }
  //   }
  //   delete def.formItem.wrapperCol
  // }

  if (schema.description) {
    def.input.placeholder = schema.description
    def.formItem.help = schema.description
  }

  return def
}
