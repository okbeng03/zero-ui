import switchParse from './rules/switch'
import fieldsetParse from './rules/fieldset'
import numberParse from './rules/number'
import checkboxesParse from './rules/checkboxes'
import listParse from './rules/array'
import dateParse from './rules/date'
import selectParse from './rules/select'
import textParse from './rules/text'

export default [
  {
    name: 'string',
    rules: [
      dateParse,
      selectParse,
      textParse
    ]
  },
  {
    name: 'number',
    rules: [
      numberParse
    ]
  },
  {
    name: 'integer',
    rules: [
      numberParse
    ]
  },
  {
    name: 'boolean',
    rules: [
      switchParse
    ]
  },
  {
    name: 'object',
    rules: [
      fieldsetParse
    ]
  },
  {
    name: 'array',
    rules: [
      checkboxesParse,
      listParse
    ]
  }
]
