const Action = {
  name: 'zero-action',
  props: {
    config: Object,
    form: Object
  },
  render (h) {
    const { wrapperCol, labelCol, hideReset } = this.config
    const actionWrapperCol = wrapperCol ? {
      span: wrapperCol.span,
      offset: labelCol.span + labelCol.offset
    }: {}
    const resetBtn = hideReset ? null : (
      <a-popconfirm
        title="确认重置？"
        onConfirm={ () => this.handleClear() }
      >
        <a-button type="danger" style="margin-left: 16px;">重置</a-button>
      </a-popconfirm>
    )

    return (
      <a-form-item wrapperCol={ actionWrapperCol }>
        <a-button type="primary" html-type="submit">提交</a-button>
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
