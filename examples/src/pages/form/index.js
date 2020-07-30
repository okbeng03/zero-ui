import Vue from 'vue'
import App from './App'
import ZeroUI from '@/packages'
import { formRules } from '@/packages'
import { Form, Slider, Rate } from 'ant-design-vue'
// import '@/packages/Form/style'

Vue.config.productionTip = false

// 新增插件
formRules.addons.unshift({
  name: 'test',
  parse: function () {
    const render = function (h) {
      return h('div', {
        attrs: {
          style: 'padding: 20px 0; text-align: center;'
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

// 新增规则
formRules.schemaRules[1].rules.unshift(function (schema) {
  const { type } = schema

  if (type === 'number' || type === 'integer') {
    const definition = {
      type: 'a-rate',
      decorator: {},
      input: {}
    }

    return definition
  }
})

Vue.use(ZeroUI)
Vue.use(Form)
Vue.use(Slider)
Vue.use(Rate)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
