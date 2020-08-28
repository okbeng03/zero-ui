import FormMixin from '../../mixins/form'

const DateTimePicker = {
  name: 'zero-input-number',
  mixins: [ FormMixin ],
  props: {
    value: [ Number ]
  },
  render (h) {
    const { definition, value } = this
    const inputProps = {
      props: definition.input
    }

    return <a-input-number { ...inputProps } value={ value } onChange={ this.onChange } />
  },
  
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}

export default DateTimePicker
