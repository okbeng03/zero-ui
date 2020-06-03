export default function (actions) {
  const actionsFun = {}

  for (const key in actions) {
    const action = actions[key]

    actionsFun[key] = new Function('$event', 'text', 'record', 'index', action)
  }

  return actionsFun
}
