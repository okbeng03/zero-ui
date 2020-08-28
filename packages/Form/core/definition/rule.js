// import checkboxParse from './rules/checkbox'
// import htmlParse from './rules/html'
// import radioParse from './rules/radio'
// import textareaParse from './rules/textarea'
// import selectParse from '../schema/rules/select'
import datePickerParse from '../schema/rules/date'
import switchParse from '../schema/rules/switch'

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
  // {
  //   name: 'radio',
  //   parse: radioParse
  // },
  // {
  //   name: 'textarea',
  //   parse: textareaParse
  // },
  // {
  //   name: 'select',
  //   parse: selectParse
  // }
]
