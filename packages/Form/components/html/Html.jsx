import FormMixin from '../../mixins'

export default {
  name: 'zero-html',
  mixins: [ FormMixin ],
  render (h) {
    const { html } = this.definition.input

    return (
      <div domPropsInnerHTML={ html }></div>
    )
  }
}
