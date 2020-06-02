// 通用默认规则

export default function (key, schema) {
  return {
    title: schema.title || '',
    dataIndex: key
  }
}
