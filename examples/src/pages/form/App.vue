<template>
  <div>
    <zero-form
      :definition="definition"
      :schema="schema"
      :default-value="model"
    >
    </zero-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      definition: {
        form: {
          items: [
            {
              key: 'navs',
              type: 'array',
              items: [
                {
                  key: 'navs[]',
                  type: 'fieldset',
                  items: [
                    'navs[].title',
                    '*'
                  ]
                }
              ]
            },
            '*',
            {
              key: 'icp',
              type: 'filedset',
              items: [
                '*'
              ]
            }
          ]
        }
      },
      schema: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "http://example.com/root.json",
        "type": "object",
        "title": "The Root Schema",
        "required": [
          "navs",
          "friendLinks"
        ],
        "properties": {
          "navs": {
            "$id": "#/properties/navs",
            "type": "array",
            "title": "左侧导航",
            "maxItems": 3,
            "minItems": 3,
            "items": {
              "$id": "#/properties/navs/items",
              "type": "object",
              "title": "",
              "required": [
                "title",
                "list"
              ],
              "properties": {
                "title": {
                  "$id": "#/properties/navs/items/properties/title",
                  "type": "string",
                  "title": "一级菜单"
                },
                "list": {
                  "$id": "#/properties/navs/items/properties/list",
                  "type": "array",
                  "title": "二级菜单",
                  "maxItems": 8,
                  "items": {
                    "$id": "#/properties/navs/items/properties/list/items",
                    "type": "object",
                    "title": "",
                    "required": [
                      "url",
                      "target",
                      "title"
                    ],
                    "properties": {
                      "title": {
                        "$id": "#/properties/navs/items/properties/list/items/properties/title",
                        "type": "string",
                        "title": "标题"
                      },
                      "url": {
                        "$id": "#/properties/navs/items/properties/list/items/properties/url",
                        "type": "string",
                        "title": "链接"
                      },
                      "target": {
                        "$id": "#/properties/navs/items/properties/list/items/properties/target",
                        "type": "string",
                        "title": "打开方式",
                        "default": "_self",
                        "enum": [
                          "_self",
                          "_blank"
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          "friendLinks": {
            "$id": "#/properties/friendLinks",
            "type": "array",
            "title": "友情链接",
            "items": {
              "$id": "#/properties/friendLinks/items",
              "type": "object",
              "title": "",
              "required": [
                "url",
                "title"
              ],
              "properties": {
                "url": {
                  "$id": "#/properties/friendLinks/items/properties/url",
                  "type": "string",
                  "title": "链接"
                },
                "title": {
                  "$id": "#/properties/friendLinks/items/properties/title",
                  "type": "string",
                  "title": "标题"
                }
              }
            }
          },
          "qrcodes": {
            "$id": "#/properties/qrcodes",
            "type": "array",
            "title": "二维码",
            "maxItems": 2,
            "items": {
              "$id": "#/properties/qrcodes/items",
              "type": "object",
              "title": "",
              "required": [
                "image",
                "title"
              ],
              "properties": {
                "image": {
                  "$id": "#/properties/qrcodes/items/properties/image",
                  "type": "string",
                  "title": "二维码图片",
                  "format": "image"
                },
                "title": {
                  "$id": "#/properties/qrcodes/items/properties/title",
                  "type": "string",
                  "title": "标题"
                }
              }
            }
          },
          "copyright": {
            "$id": "#/properties/copyright",
            "type": "string",
            "title": "版权信息"
          },
          "icp": {
            "$id": "#/properties/icp",
            "type": "object",
            "title": "ICP备案",
            "required": [
              "text",
              "href"
            ],
            "properties": {
              "text": {
                "$id": "#/properties/icp/text",
                "type": "string",
                "title": "备案名"
              },
              "href": {
                "$id": "#/properties/icp/href",
                "type": "string",
                "title": "备案链接"
              }
            }
          }
        }
      },
      model: {
        navs: [
          {
            title: '旅行须知',
            list: [
              {
                title: '旅客须知',
                url: '/help.html?id=5d09ec31cddc4136748d92fe',
                target: '_self'
              },
              {
                title: '行李须知',
                url: 'http://www.luckyair.net/help.html?id=5d770d667cb9705325e1eb1c',
                target: '_self'
              },
              {
                title: '出行准备',
                url: 'http://www.luckyair.net/help.html?id=5d1b23151771a46b9410ec7a',
                target: '_self'
              },
              {
                title: '特殊关怀',
                url: 'http://www.luckyair.net/help.html?id=5d77401791c6dd531559d9bf',
                target: '_self'
              },
              {
                title: '隐私条款',
                url: 'http://www.luckyair.net/help.html?id=5d1b236817ca9f6ba06bd3d7',
                target: '_self'
              },
              {
                title: 'cookie政策',
                url: 'http://www.luckyair.net/help.html?id=5d1b238b26d6d96b7d5e4a9d',
                target: '_self'
              }
            ]
          },
          {
            title: '关于我们',
            list: [
              {
                title: '公司简介',
                url: '/aboutus.html?id=5d1b06fc26d6d96b7d5e4a91',
                target: '_self'
              },
              {
                title: '办公地址',
                url: '/aboutus.html?id=5d1b0c5bc7c1236b8948bf81',
                target: '_self'
              },
              {
                title: '航线网络',
                url: '/aboutus.html?id=5d1b0c81ce9f066b834fd9e6',
                target: '_self'
              },
              {
                title: '招聘信息',
                url: 'http://www.luckyair.net/news/5d7762d468a1fc531a66aac4.html',
                target: '_self'
              },
              {
                title: '满意度调查问卷',
                url: 'https://luckyaircrm.wjx.com/jq/34852713.aspx',
                target: '_self'
              }
            ]
          },
          {
            title: '联系我们',
            list: [
              {
                title: '官方服务热线',
                url: '/contactus.html?id=5d09f8e39351fd368bdc2e67',
                target: '_self'
              },
              {
                title: '投诉建议',
                url: '/contactus.html?id=5d1b13ea8f41f66b9aa8f4c5',
                target: '_self'
              },
              {
                title: '媒体专线',
                url: '/contactus.html?id=5d1b1b4726d6d96b7d5e4a97',
                target: '_self'
              },
              {
                title: '营业柜台',
                url: '/contactus.html?id=5d1b1b7b8f41f66b9aa8f4c7',
                target: '_self'
              },
              {
                title: '货运业务',
                url: '/contactus.html?id=5d1b1bd4618d536b8e5ddbc6',
                target: '_self'
              },
              {
                title: '航机媒体广告',
                url: '/contactus.html?id=5d1b1c34c7c1236b8948bf83',
                target: '_self'
              }
            ]
          }
        ],
        friendLinks: [
          {
            url: 'http://www.hnair.com',
            title: '海南航空'
          },
          {
            url: 'http://www.westair.cn',
            title: '西部航空'
          },
          {
            url: 'http://www.tianjin-air.com',
            title: '天津航空'
          },
          {
            url: 'http://www.jdair.net',
            title: '首都航空'
          },
          {
            url: 'http://www.fuzhou-air.cn',
            title: '福州航空'
          },
          {
            url: 'http://ffp.hnair.com/FFPClub/cn/hqjf/hklj/gszl/jpcy/1155.shtml',
            title: '金鹏俱乐部'
          }
        ],
        copyright: '©2012-2020 luckyair.net 云南祥鹏航空有限责任公司 版权所有 技术支持：易航科技股份有限公司',
        icp: {
          text: '滇ICP备11002836号',
          href: 'http://beian.miit.gov.cn/'
        }
      }
    }
  }
}
</script>
