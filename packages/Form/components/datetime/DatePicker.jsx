import moment from 'moment'
import FormMixin from '../../mixins'
import DateMixin from '../../mixins/date'

const DateTimePicker = {
  name: 'zero-date-picker',
  mixins: [ FormMixin, DateMixin ],
  render (h) {
    const { definition, stateValue } = this
    const { type } = definition.input
    const inputProps = {
      props: definition.input
    }

    if (type === 'date-time') {
      inputProps.props.showTime = true
    }

    return <a-date-picker { ...inputProps } value={ stateValue } onChange={ this.onChange } />
  }
}

export default DateTimePicker
