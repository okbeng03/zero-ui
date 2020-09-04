import moment from 'moment'
import FormMixin from '../../mixins/form'

const DateTimePicker = {
  name: 'zero-range-picker',
  mixins: [ FormMixin ],
  data () {
    return {
      stateValue: []
    }
  },
  computed: {
    format () {
      const { type, format } = this.definition.items[0].input

      return format || (type === 'time' ? 'HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    const vals = []

    this.definition.items.forEach(item => {
      const id = this.getDecoratorId(item.key)
      
      let val = this.getFieldDefaultValue(id)

      if (typeof val === 'undefined') {
        val = typeof definition.schema.default !== 'undefined'
        ? definition.schema.default : undefined
      }

      if (typeof val !== 'undefined') {
        this.form.setFieldsValue({
          [id]: val
        })
        vals.push(moment(val))
      }
    })

    this.stateValue = vals
  },
  render (h) {
    const { definition, stateValue } = this
    const { type } = definition.input
    const inputProps = {
      props: {
        ...definition.input,
        value: stateValue
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
