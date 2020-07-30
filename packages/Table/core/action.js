export default function (actions) {
  const actionsFun = {}

  // TODO: actions 本身就是组件定义的方法，如何处理。应该直接调用。如何判断

  for (const key in actions) {
    const action = actions[key]

    actionsFun[key] = new Function('$event', 'text', 'record', 'index', action)
  }

  return actionsFun
}
