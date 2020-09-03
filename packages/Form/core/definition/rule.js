// import checkboxParse from './rules/checkbox'
import htmlParse from './rules/html'
// import radioParse from './rules/radio'
// import textareaParse from './rules/textarea'
// import selectParse from '../schema/rules/select'
import fieldsetParse from '../schema/rules/fieldset'
import listParse from '../schema/rules/array'
import datePickerParse from '../schema/rules/date'
import switchParse from '../schema/rules/switch'
import inlineParse from './rules/inline'
import groupParse from './rules/group'

export default [
  {
    name: 'zero-date-picker',
    parse: datePickerParse
  },
  {
    name: 'zero-time-picker',
    parse: datePickerParse
  },
  {
    name: 'a-switch',
    parse: switchParse
  },
  {
    name: 'zero-inline',
    parse: inlineParse
  },
  {
    name: 'zero-html',
    parse: htmlParse
  },
  {
    name: 'zero-fieldset',
    parse: fieldsetParse
  },
  {
    name: 'zero-list',
    parse: listParse
  },
  {
    name: 'zero-group',
    parse: groupParse
  }
]
