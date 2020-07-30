import { isArray, forEach, isString, isNil } from 'lodash'

const enumToOptions = function (enums) {
  return enums.map(item => {
    return {
      label: item,
      value: item
    }
  })
}

const parseErrors = function (errors) {
  const map = {}

  errors.forEach(err => {
    map[err.path] = err
  })

  return map
}

const removeEmptyValue = function (model) {
  const isArr = isArray(model)

  forEach(model, (value, key) => {
    if (isNil(value) || (isString(value) && !value)) {
      isArr ? model.splice(key, 1) : delete model[key]
      return
    }

    if (_.isObject(value)) {
      if (_.isEmpty(value)) {
        delete model[key]
      } else {
        removeEmptyValue(value)
      }
    }
  })
}

export {
  enumToOptions,
  parseErrors,
  removeEmptyValue
}
