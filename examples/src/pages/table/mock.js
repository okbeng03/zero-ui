import Mock from 'mockjs'

Mock.mock('/api/mock', {
  'list|10-50': [
    {
      'id|+1': 1,
      sellerCode: function () {
        return ['FU', 'JD', '8L'][Math.floor(Math.random() * 3)]
      },
      descp: '12',
      sellerType: function () {
        return ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
      },
      status: '@boolean',
      supplierCode: 'FU',
      logo: '@image',
      createTime: '@DateTime'
    }
  ],
  'total|1-100': 1
})
