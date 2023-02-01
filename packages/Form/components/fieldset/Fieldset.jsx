import classNames from 'classnames'
import FormMixin from '../../mixins/form'

const Fieldset = {
  name: 'zero-fieldset',
  data: () => {
    return {
      toggle: true
    }
  },
  mixins: [ FormMixin ],
  render (h) {
    const { toggle, path } = this
    const classes = classNames('zero-fieldset', {
      'zero-fieldset-vertical': path.length,
      'close': !toggle
    })

    return (
      <div class={ classes }>
        <span class="zero-expand" onClick={() => {this.toggle = !this.toggle}}>
          {
            toggle ? <a-icon title="收起" type="caret-up" /> : <a-icon title="展开" type="caret-down" />
          }
        </span>
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
