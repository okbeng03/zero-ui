## DSL
```javascript
{
  // 表格相关配置
  table: {
    // table 样式
    tableLayout: 'fixed',
    bordered: false,
    locale: {
      filterConfirm: '确定',
      filterReset: '重置',
      emptyText: '暂无数据'
    },
    size: 'default',
    title: '',

    // 分页
    pagination: {
      current: 1,
      pageSize: 20,
      showQuickJumper: false,
      showSizeChanger: false,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      total: 100,
      size: 'default' // 默认继承table
    },
    
    // columns
    columns: [
      'key', // 跟jsonSchema结合
      // more
      {
        title: '',
        key: '',
        type: 'text', // 根据type来设置部分默认属性
        
        // 筛选配置
        // enums的，考虑自动生成（怎么配置开启）
        filters: [
          {
            text: '',
            value: ''
          }
        ],
        onFilter: function (value, record) {}, // 默认走search

        // 排序设置
        sorter: true, // 交给服务端处理
        sortOrder: false,
        sortDirections: ['ascend', 'descend'],
        
        // 自定义渲染相关
        slots: {},
        scopedSlots: {
          customRender: '' // 自定义内容渲染slot，跟customRender有点重复
        },
        // enums的，考虑自动format
        // 根据jsonschema format 自动生成格式的
        customRender: function (value, row, index) {
          return {
            children: 'template',
            attrs: {} // column属性
          }
        },
        // 特有配置
        options: {},

        // filter: function () {}, // 过滤器

        // 表头分组
        children: [

        ],

        // 列样式
        align: 'left',
        width: '',
        ellipsis: false,
        colSpan: 1,
        fixed: 'left'
      },
      {
        title: '操作',
        key: '',
        type: 'operation',
        options: {
          items: [
            {
              type: ''
            }
          ]
        }
      }
    ],

    // 展开内容渲染
    expandedRowRender: function (record, index, indent, expended) {
      return 'jsx'
    },

    // 选择处理
    rowKey: '',
    rowSelection: {
      columnTitle: '',
      fixed: false,
      hideDefaultSelections: false,
      type: 'checkbox',
      onChange: function (selectedRowKeys, selectedRows) {}
    }
  },

  // 搜索模块配置： filter、sort、search 全部走服务端
  search: {
    items: [
      
    ],
    // 查询API
    api: '',
    // 参数map
    queryMap: function () {},
    // 数据map
    dataMap: function () {},
  },

  // 操作模块配置
  operation: {
    items: [
      {
        type: 'upload',
        action: 'upload',
        confirm: {
          title: '',
          icon: ''
        },
        options: {
          template: ''
        }
      },
      {
        type: 'download',
        action: 'download'
      },
      {
        type: 'primary',
        action: 'add'
      },
      {
        type: 'warning',
        action: 'batchDelete'
      }
    ]
  },

  // actions
  actions: {
    add: function () {},
    xxx: function () {}
  }
}
```

### 解析规则
* ~~Boolean: status 是/否~~
* ~~object: 展示对象的某个key，expand展示详情~~
* ~~array: 自定义展示~~
* ~~Number、integer: text~~
* string: text
  * format
    * Date: moment format
    * date-time: moment format
    * time: moment format
    * email: email
    * hostname: text
    * IPv4: text
    * IPv6: text
    * Image: image
    * uri: 一般不会出现，如果是想配合rowTitle，应该也是rowTitle的key设置为type=uri
  * enums


#### DSL Type
* text
  * 过滤器
* link
  * URL
  * 过滤器
* operation（超过4个，就下拉）
  * expand 全部展开
  * items
    * action
    * type
    * show 什么时候展示
* tag 主要跟status这种使用
  * color？
* Image
  * URL
  * preview
