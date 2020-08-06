<template>
  <div>
    <zero-form
      :definition="definition"
      :schema="schema"
      :default-value="model"
      @submit="onSubmit"
    >
    </zero-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      definition: {
        form: {
          items: [
            {
              key: 'name'
            },
            {
              key: 'age',
              type: 'a-slider',
              decorator: {
                rules: [
                  {
                    validator: function (rule, value, callback) {
                      if (value < 18) {
                        callback('必须是成人')
                      }

                      callback()
                    }
                  }
                ]
              }
            },
            'workYear',
            'single',
            {
              key: 'sex',
              input: {
                options: [
                  {
                    label: '男',
                    value: '0'
                  },
                  {
                    label: '女',
                    value: '1'
                  }
                ]
              }
            },
            'hobby',
            {
              key: 'other',
              type: 'textarea'
            },
            {
              key: 'birthday'
            },
            '*'
          ]
        }
      },
      schema: {
        title: 'basic',
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            maxLength: 4
          },
          age: {
            type: 'number',
            title: '年龄',
            minimum: 20,
            maximum: 120
          },
          workYear: {
            type: 'number',
            title: '工作年限'
          },
          single: {
            type: 'boolean',
            title: '是否单身'
          },
          sex: {
            type: 'string',
            title: '性别',
            enum: ['0', '1'],
            default: '0'
          },
          hobby: {
            title: '爱好',
            type: 'array',
            items: {
              type: 'string',
              title: '爱好',
              enum: ['乒乓球', '足球', '篮球']
            }
          },
          other: {
            'title': '其他',
            'type': 'string',
            'maxlength': 100
          },
          birthday: {
            title: '出生日期',
            type: 'string',
            format: 'date-time'
          },
          group: {
            title: '分组',
            type: 'array',
            maxItems: 2,
            items: {
              type: 'string',
              title: '爱好'
            }
          }
        },
        'required': ['name', 'age', 'single', 'sex', 'hobby', 'birthday']
      },
      model: {
        name: '王昌彬',
        age: 20,
        single: false,
        sex: '0',
        hobby: ['足球'],
        other: '111',
        birthday: '2020-07-30 12:00:00'
      }
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
