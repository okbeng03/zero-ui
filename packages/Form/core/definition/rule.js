import checkboxParse from './rules/checkbox'
import htmlParse from './rules/html'
import radioParse from './rules/radio'
import textareaParse from './rules/textarea'

export default [
  {
    name: 'checkbox',
    parse: checkboxParse
  },
  {
    name: 'html',
    parse: htmlParse
  },
  {
    name: 'radio',
    parse: radioParse
  },
  {
    name: 'textarea',
    parse: textareaParse
  }
]