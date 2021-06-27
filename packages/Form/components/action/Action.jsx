const Action = {
  name: 'zero-action',
  props: {
    config: Object,
    form: Object,
    loading: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    const { loading } = this
    const { wrapperCol, labelCol, hideReset, okText, cancelText } = this.config
    const actionWrapperCol = wrapperCol ? {
      span: wrapperCol.span,
      offset: labelCol.span + labelCol.offset
    }: {}
    const resetBtn = hideReset ? null : (
      <a-popconfirm
        title="确认重置？"
        onConfirm={ () => this.handleClear() }
      >
        <a-button loading={ loading } type="danger" style="margin-left: 16px;">{ cancelText }</a-button>
      </a-popconfirm>
    )

    return (
      <a-form-item wrapperCol={ actionWrapperCol }>
        <a-button loading={ loading } type="primary" html-type="submit">{ okText }</a-button>
        { resetBtn }
      </a-form-item>
    )
  },
  methods: {
    handleClear () {
      this.form.resetFields()
    }
  }
}

export default Action
