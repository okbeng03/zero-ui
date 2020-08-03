<template>
  <div>
    <zero-table
      ref="zTable"
      :definition="definition"
      :schema="schema"
    >
    </zero-table>
  </div>
</template>

<script>
import './mock'

export default {
  data () {
    return {
      definition: {
        table: {
          rowKey: 'id',
          rowSelection: {
            fixed: false,
            hideDefaultSelections: false,
            type: 'checkbox'
          },
          columns: [
            'id',
            {
              key: 'sellerCode',
              options: {
                options: [
                  {
                    label: '福州航空',
                    value: 'FU'
                  },
                  {
                    label: '祥鹏航空',
                    value: '8L'
                  }
                ]
              },
              filters: [
                {
                  text: '福州航空',
                  value: 'FU'
                },
                {
                  text: '祥鹏航空',
                  value: '8L'
                }
              ]
            },
            {
              key: 'sellerType',
              align: 'center'
            },
            {
              key: 'descp',
              sorter: true,
              customRender: 'text += "aaa"; return `<i>${text}</i>`'
            },
            'status',
            {
              key: 'supplierCode',
              customRender: (h, text, record) => {
                return (
                  <div>{ text } - { record.descp }</div>
                )
              }
            },
            {
              key: 'logo',
              options: {
                width: '100px',
                height: '100px'
              }
            },
            {
              key: 'createTime',
              sorter: true,
              options: {
                format: 'YY-MM-DD'
              }
            },
            {
              dataIndex: 'id',
              key: 'action',
              title: '操作',
              width: '300px',
              align: 'center',
              type: 'operation',
              options: {
                items: [
                  {
                    type: 'link',
                    action: 'onDetail',
                    text: '详情'
                  },
                  {
                    type: 'primary',
                    action: 'onEdit',
                    text: '修改'
                  },
                  {
                    type: 'danger',
                    action: 'onDelete',
                    confirm: {
                      title: '确认删除?'
                    },
                    text: '删除'
                  }
                ]
              }
              // customRender: 'return `<a-button @click="() => addTodo(record, index)">修改</a-button>`'
            }
          ],
          // expandedRowRender: 'const text = record.descp + "aaa"; return `<p>${text}</p>`'
          expandedRowRender: (record) => {
            return (
              <p>{ record.descp + 'aaa' }</p>
            )
          }
        },
        operation: {
          items: [
            {
              type: 'primary',
              action: 'onAdd',
              text: '添加'
            },
            {
              type: 'danger',
              action: 'onBatchDelete',
              text: '删除',
              confirm: {
                title: '确定删除选中产品？'
              }
            }
          ]
        },
        search: {
          api: '/api/mock',
          form: {
            items: [
              {
                key: 'sellerCode',
                input: {
                  options: [
                    {
                      label: '福州航空',
                      value: 'FU'
                    },
                    {
                      label: '祥鹏航空',
                      value: '8L'
                    }
                  ]
                }
              },
              'sellerType',
              'status',
              'createTime',
              'supplierCode'
            ]
          },
          params: {
            sellerCode: '8L'
          }
        },
        actions: {
          // onAdd: `
          //   this.dataSource.splice(0, 0, {
          //     id: 9999,
          //     sellerCode: 'FU',
          //     sellerType: 'C',
          //     supplierCode: 'FU',
          //     status: 'INACTIVE',
          //     descp: 'test',
          //     createTime: '2020-06-01 10:00:00'
          //   })
          // `,
          onAdd: function () {
            this.dataSource.splice(0, 0, {
              id: 9999,
              sellerCode: 'FU',
              sellerType: 'C',
              supplierCode: 'FU',
              status: 'INACTIVE',
              descp: 'test',
              createTime: '2020-06-01 10:00:00'
            })
          },
          onBatchDelete: `
            const { selectedRowKeys } = this

            if (!selectedRowKeys.length) {
              this.$message.error('未选择任何产品！')
              return
            }

            console.log('batch delete', selectedRowKeys, $event)
          `,
          // onDetail: `
          //   console.log(111, $event)
          // `,
          onDetail: function (e, text, record, index) {
            console.log('detail', e, text, record, index)
          },
          onEdit: `
            console.log('edit', record, index)
            this.dataSource.splice(index, 1, {
              ...record,
              sellerType: 'B'
            })
          `,
          // onDelete: `
          //   this.dataSource.splice(index, 1)
          // `,
          onDelete: this.onDelete
        }
      },
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            title: '序号'
          },
          sellerCode: {
            type: 'string',
            title: '销售商编码',
            enum: [
              'FU',              
              '8L',
              'JD'
            ]
          },
          sellerType: {
            type: 'string',
            title: '销售商类别'
          },
          descp: {
            type: 'string',
            title: '类别说明'
          },
          status: {
            type: 'string',
            title: '状态'
          },
          supplierCode: {
            type: 'string',
            title: '供应商编码'
          },
          logo: {
            type: 'string',
            title: 'Logo',
            format: 'image'
          },
          createTime: {
            type: 'string',
            title: '创建时间',
            format: 'date-time'
          }
        },
        required: [
          'id',
          'sellerCode',
          'sellerType',
          'descp',
          'status',
          'supplierCode',
          'createTime'
        ]
      }
    }
  },
  methods: {
    onDelete: function (e, text, record, index) {
      console.log(this.$refs.zTable, text, record, index)
      this.$refs.zTable.dataSource.splice(index, 1)
    }
  }
}
</script>
