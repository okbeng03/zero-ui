import classNames from 'classnames'
import draggable from 'vuedraggable'
import FormMixin from '../../mixins'

const List = {
  name: 'zero-list',
  mixins: [ FormMixin ],
  data () {
    return {
      id: '',
      size: 0,
      list: []
    }
  },
  created () {
    const id = this.id = this.getDecoratorId(this.definition.key)

    this.$watch('model', (newValue) => {
      const value = this.getFieldDefaultValue(id)

      if (value && value.length) {
        const len = value.length
        const list = []

        for (let i = 0; i < len; i++) {
          list.push(i)
        }

        this.size = len
        this.list = list
      }
    }, {
      deep: true,
      immediate: true
    })
  },
  render (h) {
    const { definition, list } = this
    const classes = classNames('zero-list', {
      'zero-list-inline': definition.columns
    })

    return (
      <div class={ classes }>
        { this.renderHeader(h) }
        <draggable class="zero-list-body" value={ list } draggable=".zero-list-item" onEnd={ this.onDrop }>
          { this.renderItems(h) }
        </draggable>
        { this.renderFooter(h) }
      </div>
    )
  },
  methods: {
    renderHeader (h) {
      const { columns } = this.definition

      if (columns) {
        const cols = columns.map(column => {
          const classes = classNames({
            'ant-form-item-required': column.required
          })

          return (
            <a-col span={ column.col }>
              <label class={ classes }>{ column.label }</label>
            </a-col>
          )
        })

        return (
          <a-row class="zero-list-header">
            { cols }
          </a-row>
        )
      } else {
        return null
      }
    },
    renderItems (h) {
      const { path, size, definition } = this
      const { columns } = definition
      const childrens = []
      let idx = 0

      while (idx < size) {
        ((idx) => {
          const newPath = path.concat([idx])
          const props = {
            path: newPath,
            definition: definition.items[0]
          }

          const child = columns ? h('zero-list-inline', {
            props: {
              ...props,
              columns
            }
          }) : h('zero-control', {
            props
          })

          childrens.push(
            h('div', {
              attrs: {
                class: 'zero-list-item'
              }
            }, [
              child,
              h('a-icon', {
                attrs: {
                  class: 'btn-delete'
                },
                props: {
                  type: 'minus-circle-o'
                },
                on: {
                  click: () => this.remove(idx)
                }
              })
            ])
          )
        })(idx)

        idx += 1
      }

      return childrens
    },
    renderFooter (h) {
      return (
        <a-row class="zero-list-footer">
          <a-col span="4" offset="20">
            <a-button
              type="dashed"
              style="width: 100%;"
              onClick={ this.add }
            >
              <a-icon type="plus" />添加
            </a-button>
          </a-col>
        </a-row>
      )
    },
    add () {
      this.list.push(this.size)
      this.size += 1
    },
    remove (idx) {
      const { id } = this
      const value = this.form.getFieldValue(id)
      value.splice(idx, 1)

      this.form.setFieldsValue({
        [id]: value
      })
      this.size -= 1
    },
    onDrop (e) {
      const { newIndex, oldIndex } = e
      const { id } = this
      const value = this.form.getFieldValue(id)
      const moveItem = value.splice(oldIndex, 1)
      value.splice(newIndex, 0, moveItem[0])

      this.$nextTick(() => {
        this.form.setFieldsValue({
          [id]: value
        })
      })
    }
  },
  components: {
    draggable
  }
}

export default List
