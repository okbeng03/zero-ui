## 开发流程
```
# 安装依赖
npm install

# demo
npm run serve
```

# zero-ui
前端中后台配置化UI

## 特性
* 基于ant-design-vue
* 配置化生成 Form、Table
* 更少的编码
* 统一化UI

## 要求
- [x] 保持和ant-design使用方式一致，支持按需加载，打包输出一致
- [ ] 文档化，友好的文档和例子（输出editor）
- [ ] Test，核心模块测试覆盖，保证健壮性
- [ ] 输出一个模块，支持异步加载
- [x] 优秀的抽象设计，支持自定义规则和物料

## 开发
### 安装依赖
npm install

### demo
npm run serve

## 目录结构
```
|-- build 	# 编译、构建脚本
|-- es	    # 构建目标目录，es-module
|-- lib     # 构建目标目录
|-- examples # Demo 简单示例，验证配置化功能
|-- packages # 源代码
|	|-- Form   # 表单方案
|		|-- components # 内置组件
|		|-- core       # 配置化解析规则
|			|-- addons   # 模块插件
|			|-- definition # dsl 规则解析
|			|-- schema     # schema 规则解析
|			|-- config.js  # table 默认配置
|			|-- index.js   # exports
|		|-- mixins     # vue 混入，包含表单元素通用功能
|		|-- validate   # 校验规则
|		|-- Form.jsx   # 根组件
|		|-- index.js   # exports
|	|-- Table	 # 列表方案
|		|-- components # 内置组件
|		|-- core       # 配置化解析规则
|			|-- addons   # 模块插件
|			|-- definition # dsl 规则解析
|			|-- schema     # schema 规则解析
|			|-- action.js  # 方法转换
|			|-- config.js  # table 默认配置
|			|-- index.js   # exports
|		|-- style      # Themes
|		|-- Table.jsx  # 根组件
|		|-- index.js   # exports
|	|-- util   # 工具函数
|		|-- schemaPath.js # 生成 schema ObjectPath 映射，更快得检索指定路径 schema
|		|-- util.js       # 其他通用工具函数
|	|-- index.js # exports
|-- babel.config.js # babel配置
|-- .editorconfig	  # 编码风格配置
|-- .eslintrc.js	  # 代码扫描配置
|-- package.json
|-- README.md		    # 项目开发文档
|-- vue.config.js
```

## 文档
* 组件介绍
* 配置props
* demo
	* demo可以通过更改配置，实时看到效果
