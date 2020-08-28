import _ from 'lodash'
import ObjectPath from 'objectpath'

export default {
  props: {
    path: {
      type: Array,
      default: () => {
        return []
      }
    },
    definition: [Object, Array]
  },
  inject: [
    'form',
    'model',
    'handleFieldValidate'
  ],
  methods: {
    getFieldDefaultValue (key) {
      if (!key) {
        return
      }

      return _.get(this.model.value, key)
    },
    getPath (key) {
      if (!key) {
        return
      }

      const { path } = this
      return ObjectPath.parse(key).map((item, idx) => {
        return path[idx] || item
      })
    },
    getDecoratorId (key) {
      if (!key) {
        return
      }

      return ObjectPath.stringify(this.getPath(key))
    }
  }
}
