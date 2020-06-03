import table from './table'
import operation from './operation'
import search from './search'

export default [
  {
    name: 'search',
    parse: search
  },
  {
    name: 'operation',
    parse: operation
  },
  {
    name: 'table',
    parse: table
  }
]
