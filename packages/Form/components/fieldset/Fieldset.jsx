import classNames from 'classnames'
import FormMixin from '../../mixins'

const Fieldset = {
  name: 'zero-fieldset',
  mixins: [ FormMixin ],
  render (h) {
    const classes = classNames('zero-fieldset', {
      'zero-fieldset-vertical': this.path.length
    })

    return (
      <div class={ classes }>
        { this.renderItems(h) }
      </div>
    )
  },
  methods: {
    renderItems (h) {
      const { definition } = this

      return (definition.items || definition).map(item => {
        return h('zero-control', {
          props: {
            path: this.getPath(item.key),
            definition: item
          }
        })
      })
    }
  }
}

export default Fieldset
