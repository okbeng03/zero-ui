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

const undef = undefined

const removeEmptyValue = function (model) {
  const isArray = _.isArray(model)

  _.forEach(model, (value, key) => {
    if ((_.isString(value) && !value)) {
      isArray ? model.splice(key, 1, undef) : model[key] = undef
      return
    }

    if (_.isObject(value)) {
      if (_.isEmpty(value)) {
        model[key] = undef
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
