import Group from './Group'

/* istanbul ignore next */
Group.install = function (Vue) {
  Vue.component(Group.name, Group)
}

export default Group
