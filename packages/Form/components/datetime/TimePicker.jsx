import FormMixin from '../../mixins'
import DateMixin from '../../mixins/date'

const TimePicker = {
  name: 'zero-time-picker',
  mixins: [ FormMixin, DateMixin ],
  render (h) {
    const { definition, stateValue } = this
    const inputProps = {
      props: definition.input
    }

    return <a-time-picker { ...inputProps } value={ stateValue } onChange={ this.onChange } />
  }
}

export default TimePicker
