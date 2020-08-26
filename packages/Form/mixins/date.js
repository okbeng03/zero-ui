import moment from 'moment'

export default {
  model: {
    prop: 'value',
    event: 'change.value'
  },
  props: {
    value: [ String, Object ]
  },
  computed: {
    format () {
      const { type } = this

      return this.definition.input.format || (type === 'time' ? 'HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss')
    }
  },
  data () {
    const { value } = this.$props
    return {
      stateValue: value ? moment(value, this.format) : null
    }
  },
  watch: {
    value (val) {
      this.stateValue = val ? moment(val, this.format) : null
    }
  },
  methods: {
    onChange (time) {
      this.$emit('change', time)
    }
  }
}
