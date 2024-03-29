import { isEmpty } from 'lodash'
import moment from 'moment'
import FormMixin from '../../mixins/form'

const DateTimePicker = {
  name: 'zero-range-picker',
  mixins: [ FormMixin ],
  computed: {
    format () {
      const { definition } = this
      const { type, format } = !isEmpty(definition.input) ? definition.input : definition.items[0].input

      return format || (type === 'time' ? 'HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss')
    }
  },
  render (h) {
    const { definition } = this
    const { type } = definition.input
    const vals = []

    this.definition.items.forEach(item => {
      const id = this.getDecoratorId(item.key)
      const val = this.form.getFieldValue(id)
      const value = moment(val ? val : null)

      if (value.isValid()) {
        vals.push(value)
      }
    })

    const inputProps = {
      props: {
        ...definition.input,
        value: vals.length ? vals : null
      }
    }

    if (type === 'date-time') {
      inputProps.props.showTime = true
    }
    
    return (
      <div class="zero-range-picker">
        <a-range-picker { ...inputProps } onChange={ this.onChange } />
        <div></div>
        { this.renderItems(h) }
        <div style="clear: both;"></div>
      </div>
    )
  },
  methods: {
    onChange (value) {
      const { definition, format } = this
      const { items } = definition

      this.stateValue = value

      items.forEach((item, i) => {
        const id = this.getDecoratorId(item.key)

        this.form.setFieldsValue({
          [id]: value[i] ? value[i].format(format) : ''
        })
      })
    },
    renderItems (h) {
      // 两个隐藏 input + decorator
      const { definition } = this

      return definition.items.map(item => {
        item.type = 'a-input'
        item.input.type = 'hidden'

        return <zero-control path={ this.getPath(item.key) } definition={ item } hideTitle></zero-control>
      })
    }
  }
}

export default DateTimePicker
