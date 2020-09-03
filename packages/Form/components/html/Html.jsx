import FormMixin from '../../mixins/form'

export default {
  name: 'zero-html',
  mixins: [ FormMixin ],
  render (h) {
    const { html } = this.definition.input

    return (
      <div class="zero-html zero-input" domPropsInnerHTML={ html }></div>
    )
  }
}
