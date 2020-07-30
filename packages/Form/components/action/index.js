import Action from './Action'

/* istanbul ignore next */
Action.install = function (Vue) {
  Vue.component(Action.name, Action)
}

export default Action
