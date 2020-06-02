<template>
  <div>
    <zero-table
      row-key="id"
      :definition="definition"
      :schema="schema"
      :data-source="data"
    >
    </zero-table>

    <!-- <a-table
      row-key="id"
      :columns="columns"
      :data-source="data"
    >
      <a-button slot="action" slot-scope="text, record, index" @click="() => onEdit(record, index)">修改</a-button>
    </a-table> -->
  </div>
</template>

<script>
import Mock from 'mockjs'

// const columns = [
//   {
//     dataIndex: 'id',
//     title: '序号'
//   },
//   {
//     dataIndex: 'sellerCode',
//     title: '销售商编码'
//   },
//   {
//     dataIndex: 'sellerType',
//     title: '销售商类别'
//   },
//   {
//     dataIndex: 'descp',
//     title: '类别说明'
//   },
//   {
//     dataIndex: 'status',
//     title: '状态'
//   },
//   {
//     dataIndex: 'supplierCode',
//     title: '供应商编码'
//   },
//   {
//     dataIndex: 'createTime',
//     title: '创建时间'
//   }
// ]
const data = Mock.mock({
  'list|10-50': [
    {
      'id|+1': 1,
      sellerCode: function () {
        return ['FU', 'JD', '8L'][Math.floor(Math.random() * 3)]
      },
      descp: '12',
      sellerType: 'A',
      status: function () {
        return ['INACTIVE', 'ACTIVE'][Math.round(Math.random())]
      },
      supplierCode: 'FU',
      logo: '@image',
      createTime: '@DateTime'
    }
  ]
}).list

export default {
  data () {
    return {
      data,
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
                    text: '福州航空',
                    value: 'FU'
                  },
                  {
                    text: '祥鹏航空',
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
            'supplierCode',
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
          expandedRowRender: 'const text = record.descp + "aaa"; return `<p>${text}</p>`'
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
        actions: {
          onAdd: `
            this.dataSource.splice(0, 0, {
              id: 9999,
              sellerCode: 'FU',
              sellerType: 'C',
              supplierCode: 'FU',
              status: 'INACTIVE',
              descp: 'test',
              createTime: '2020-06-01 10:00:00'
            })
          `,
          onBatchDelete: `
            const { selectedRowKeys } = this

            if (!selectedRowKeys.length) {
              this.$message.error('未选择任何产品！')
              return
            }

            console.log(selectedRowKeys, $event)
          `,
          onDetail: `
            console.log(111, $event)
          `,
          onEdit: `
            console.log(222, record, index)
            this.dataSource.splice(index, 1, {
              ...record,
              sellerType: 'B'
            })
          `,
          onDelete: `
            this.dataSource.splice(index, 1)
          `
        }
      },
      schema: {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            title: '序号'
          },
          sellerCode: {
            type: 'string',
            title: '销售商编码',
            enums: [
              'FU',
              'JD',
              '8L'
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
      // columns: [
      //   {
      //     title: '序号',
      //     dataIndex: 'id'
      //   },
      //   {
      //     title: '销售商编码',
      //     dataIndex: 'sellerCode'
      //   },
      //   {
      //     title: '销售商类别',
      //     dataIndex: 'sellerType'
      //   },
      //   {
      //     title: '类别说明',
      //     dataIndex: 'descp'
      //   },
      //   {
      //     title: '状态',
      //     dataIndex: 'status'
      //   },
      //   {
      //     title: '供应商编码',
      //     dataIndex: 'supplierCode'
      //   },
      //   {
      //     title: '创建时间',
      //     dataIndex: 'createTime',
      //     customRender: this.test
      //   },
      //   {
      //     title: '操作',
      //     dataIndex: 'action',
      //     scopedSlots: { customRender: 'action' }
      //   }
      // ]
    }
  }
}
</script>
