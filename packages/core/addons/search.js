// 搜索模块
import defaultConfig from '../config'

export default function (search = {}) {
  const config = Object.assign({}, search, defaultConfig.search)

  return {
    config
  }
}
