export default function (key, schema) {
  return {
    title: schema.title || '',
    dataIndex: key
  }
}
