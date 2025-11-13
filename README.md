# 跨境电商平台 - 供应商与分销商交易平台

一个面向企业（Business-to-Business）的综合性电商交易平台，连接供应商（卖家）和分销商（买家），促成大宗商品交易。

## ✨ 最新优化亮点（2025）

- 🎨 **全新视觉设计** - 现代化UI设计语言，优雅的渐变和阴影系统
- 📱 **完美滚动体验** - 修复滚动问题，确保流畅浏览体验
- 🏪 **16个商品分类** - 从8个扩展到16个，覆盖更多B2B行业
- 📊 **7个内容板块** - 数据统计、平台优势、优质供应商、客户评价等
- 🎯 **12个爆品展示** - 商品数量从4个扩展到12个，信息更丰富
- ✨ **精美动画效果** - 淡入、滑入等多种CSS动画，提升交互体验
- 🎨 **完整设计系统** - 统一的配色、间距、阴影规范（8px Grid）
- 🖼️ **33张真实图片** - 来自Unsplash的高质量商业图片

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Vite 5** - 极速构建工具
- **Ant Design 5** - UI组件库
- **Pro Components** - 高级组件
- **React Router 6** - 路由管理
- **i18next** - 国际化（中英文切换）
- **ECharts 5** - 数据可视化
- **Less** - CSS预处理器

## 项目特点

- ✅ 完整的B2B电商业务流程（26个页面）
- ✅ 供应商和分销商双角色系统
- ✅ 中英文双语支持
- ✅ 响应式设计，支持多端适配
- ✅ 数据可视化看板
- ✅ 现代化的专业B2B设计风格
- ✅ 完整的设计系统和动画效果

## 功能模块

### 前台功能
- 🏠 **首页** - Banner轮播、16个商品分类、12个爆品推荐、数据统计、优质供应商、客户评价
- 🔍 **商品搜索** - 多条件筛选、排序
- 📦 **商品详情** - 详细信息、规格参数、供应商信息
- 🛒 **购物车** - 批量管理、结算
- 💳 **订单结算** - 地址管理、支付方式选择

### 供应商后台
- 📊 **数据看板** - 销售趋势、订单统计、客户分析
- 📦 **商品管理** - 发布、编辑、上下架
- 📋 **订单管理** - 订单处理、发货管理
- 👥 **客户管理** - 分销商管理、客户等级
- 📈 **营销与数据** - 数据分析、营销工具

### 分销商后台
- 📊 **数据看板** - 采购统计、订单概览
- 🛍️ **我的采购** - 订单管理、物流跟踪
- ❤️ **商品收藏** - 收藏管理
- 📍 **地址管理** - 收货地址维护
- 📈 **数据分析** - 采购数据分析

### 用户认证
- 🔐 供应商登录/注册
- 🔐 分销商登录/注册
- 🔑 忘记密码
- 🎯 注册引导页

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 项目结构

```
platformBoard/
├── src/
│   ├── components/          # 通用组件
│   │   ├── Header/         # 头部导航
│   │   ├── Footer/         # 页脚
│   │   ├── Layout/         # 页面布局
│   │   └── AdminLayout/    # 后台布局
│   ├── pages/              # 页面组件
│   │   ├── Home/           # 首页
│   │   ├── Auth/           # 认证相关页面
│   │   ├── Category/       # 分类页
│   │   ├── ProductDetail/  # 商品详情
│   │   ├── Cart/           # 购物车
│   │   ├── SupplierAdmin/  # 供应商后台
│   │   └── DistributorAdmin/ # 分销商后台
│   ├── i18n/               # 国际化配置
│   │   ├── config.ts       # i18n配置
│   │   └── locales/        # 语言文件
│   ├── styles/             # 全局样式
│   ├── App.tsx             # 应用入口
│   └── main.tsx            # 主入口
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 页面路由

### 前台路由
- `/` - 首页
- `/category/:id` - 商品分类
- `/search` - 搜索结果
- `/product/:id` - 商品详情
- `/cart` - 购物车
- `/checkout` - 结算页

### 认证路由
- `/supplier-login` - 供应商登录
- `/distributor-login` - 分销商登录
- `/register-guide` - 注册引导
- `/supplier-register` - 供应商注册
- `/distributor-register` - 分销商注册

### 供应商后台路由
- `/supplier-admin` - 数据看板
- `/supplier-admin/products` - 商品管理
- `/supplier-admin/orders` - 订单管理
- `/supplier-admin/customers` - 客户管理
- `/supplier-admin/analytics` - 营销与数据

### 分销商后台路由
- `/distributor-admin` - 数据看板
- `/distributor-admin/orders` - 我的采购
- `/distributor-admin/favorites` - 商品收藏
- `/distributor-admin/addresses` - 地址管理
- `/distributor-admin/analytics` - 数据分析

## 设计参考

本项目设计风格参考了大健云仓和1688.com，特点包括：
- 专业、稳重的视觉风格
- 高信息密度的布局
- 突出商品与价格信息
- 强调企业信用和认证

## 开发说明

这是一个静态页面演示版本，主要用于：
- 产品原型展示
- 需求确认
- 用户测试
- 前端开发基础

后续可以基于此项目进行后端接口对接和动态功能开发。

## License

MIT

