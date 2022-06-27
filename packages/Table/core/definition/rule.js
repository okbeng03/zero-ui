import operationParser from '../../components/operation'

export default [
  {
    name: 'operation',
    parse: operationParser
  }
]

export const hooks = {
  beforeParse: function (columns) {
    return columns
  }
}
