import { isFunction } from 'lodash'

export default function (actions) {
  const actionsFun = {}

  for (const key in actions) {
    const action = actions[key]

    actionsFun[key] = isFunction(action) ? action : new Function('$event', 'text', 'record', 'index', action)
  }

  return actionsFun
}
