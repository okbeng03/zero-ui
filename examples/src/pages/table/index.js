import Vue from 'vue'
import App from './App'
import ZeroUI from '@/packages'
import { Table, Tag, Upload, Button, Icon } from 'ant-design-vue'
import { tableRules } from '@/packages'
import '@/packages/Table/style'

Vue.config.productionTip = false

// 新增插件
tableRules.addons.unshift({
  name: 'test',
  parse: function () {
    const render = function (h) {
      return h('div', {
        attrs: {
          style: 'padding: 20px 0; text-align: center; background-color: #f0f0f0;'
        }
      }, [
        'addon test'
      ])
    }
  
    return {
      config: {},
      render
    }
  }
})

// 新增schema解析
tableRules.schemaRules.push({
  name: 'boolean',
  parse: function (key, schema, parentSchema, definition = {}) {
    return {
      render (h, text) {
        return <div>{ text ? 'ACTIVE' : 'INACTIVE' }</div>
      }
    }
  }
})

const typeMap = {
  A: '#f50',
  B: '#2db7f5',
  C: '#87d068'
}

// 新增definition解析
tableRules.definitionRules.push({
  name: 'tag',
  parse: function (key, schema, parentSchema, definition = {}) {
    return {
      render: function (h, text) {
        return h('a-tag', {
          props: {
            color: typeMap[text]
          }
        }, [text])
      }
    }
  }
})

tableRules.operationAddonRules.push({
  name: 'upload',
  parse: function (options) {
    return {
      render: function (h) {
        return h('a-upload', {
          on: {
            change: 'onUpload'
          }
        }, [
          h('a-button', {}, [
            h('a-icon', {
              props: {
                type: 'upload'
              }
            }),
            '上传'
          ])
        ])
      }
    }
  }
})

Vue.use(ZeroUI)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Icon)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
