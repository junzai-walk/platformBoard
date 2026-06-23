import { ProductDetailItem } from '../hooks/useProductDetail'

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  unit: string
  spec: { [key: string]: string }
}

export interface Order {
  key: string
  orderNo: string
  supplierId: string
  supplierName: string
  distributorId: string
  distributorName: string
  amount: number
  status: '待付款' | '待发货' | '已发货' | '已完成'
  createTime: string
  shippingDetails?: {
    carrier: string
    trackingNo: string
    shippedTime?: string
  }
  address: string
  contact: string
  phone: string
  items: OrderItem[]
}

export interface Address {
  id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  postalCode?: string
  isDefault: boolean
}

// LocalStorage Keys
const KEYS = {
  PRODUCTS: 'b2b_db_products',
  ORDERS: 'b2b_db_orders',
  ADDRESSES: 'b2b_db_addresses',
  FAVORITES: 'b2b_db_favorites',
  CART: 'b2b_cart_items',
}

// 默认 12 个商品，与原 useProductDetail 库保持一致
const defaultProducts: ProductDetailItem[] = [
  {
    id: '1',
    name: '工业级电子元件批发 高品质芯片模块',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
    ],
    category: '电子元器件 > 芯片 > 处理器芯片',
    brand: '华为',
    model: 'HW-2025-PRO',
    unit: '件',
    stock: 8500,
    sales: 15680,
    rating: 4.9,
    reviews: 1258,
    tags: ['热销', '认证', '包邮'],
    priceLevels: [
      { minQuantity: 1, maxQuantity: 99, price: 50.0 },
      { minQuantity: 100, maxQuantity: 499, price: 45.0 },
      { minQuantity: 500, maxQuantity: 999, price: 40.0 },
      { minQuantity: 1000, maxQuantity: null, price: 35.0 },
    ],
    specs: {
      color: ['智能银', '深空灰'],
      version: ['标准版', '工业增强版'],
    },
    shipping: {
      from: '广东省深圳市',
      deliveryTime: '48小时内发货',
      freight: '满500件包邮',
      estimatedArrival: '3-5天',
    },
    supplier: {
      id: '1',
      name: '深圳市华强电子科技有限公司',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      rating: 4.9,
      productCount: 1580,
      certified: true,
      location: '广东省深圳市',
      responseRate: 98,
      responseTime: '2小时',
    },
    description: `
      <h3>产品特点</h3>
      <ul>
        <li>采用先进的纳米级制造工艺，性能稳定，抗干扰性极佳</li>
        <li>已通过ISO9001/ISO14001环境与质量管理体系认证</li>
        <li>支持原厂深度定制服务，满足工业与商业级不同工况需求</li>
        <li>提供24小时专业技术专家连线指导，售后无忧</li>
      </ul>
    `,
    specifications: [
      { name: '产品型号', value: 'HW-2025-PRO' },
      { name: '工作温度', value: '-40°C ~ 125°C' },
      { name: '接口类型', value: 'GPIO / I2C / SPI' },
      { name: '质保期', value: '3年' },
    ],
    afterSales: ['7天无理由退换', '3年超长原厂质保', '专业工程师远程调试'],
  },
  {
    id: '2',
    name: '高品质办公家具套装 实木会议桌椅组合',
    isLargeItem: true,
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532499016263-f2c3e89df95d?w=600&h=600&fit=crop',
    ],
    category: '家具设备 > 办公家具 > 会议桌椅',
    brand: '木林森',
    model: 'MLS-CONF-08',
    unit: '套',
    stock: 120,
    sales: 8920,
    rating: 4.8,
    reviews: 642,
    tags: ['大件特惠', '工厂直发', '白手套服务'],
    priceLevels: [
      { minQuantity: 1, maxQuantity: 4, price: 1800.0 },
      { minQuantity: 5, maxQuantity: 9, price: 1650.0 },
      { minQuantity: 10, maxQuantity: null, price: 1500.0 },
    ],
    specs: {
      color: ['北美黑胡桃色', '原木淡黄色'],
      size: ['1.8米会议桌+6椅', '2.4米会议桌+8椅', '3.2米会议桌+10椅'],
    },
    shipping: {
      from: '浙江省宁波市',
      deliveryTime: '72小时内发货',
      freight: '运费由大件货代托运计算，多套可享协议价优惠',
      estimatedArrival: '海外仓直发最快3日达，支持尾程空运/卡派',
    },
    supplier: {
      id: '2',
      name: '广州精工办公家具有限公司',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
      rating: 4.8,
      productCount: 890,
      certified: true,
      location: '广东省广州市',
      responseRate: 95,
      responseTime: '3小时',
    },
    description: `
      <h3>精工细作 · 沉稳大气</h3>
      <p>精选北美进口FAS级黑胡桃木，采用传统榫卯工艺制作，绿色环保木蜡油涂装，保留木材天然质感与呼吸感。</p>
      <h3>大件专属保障</h3>
      <ul>
        <li>自营海外仓常备现货，接单立即出库</li>
        <li>支持北美、欧洲等多地“送装一体”白手套尾程派送</li>
      </ul>
    `,
    specifications: [
      { name: '木材产地', value: '美国进口黑胡桃木' },
      { name: '甲醛释放量', value: '符合E0级环保标准' },
      { name: '桌板厚度', value: '45mm实木大板' },
      { name: '质保期', value: '5年结构质保' },
    ],
    afterSales: ['大件专属货运险保障', '5年结构免费维修', '本地化售后团队上门服务'],
  },
  {
    id: '3',
    name: '环保蜂窝纸板包装材料 缓冲抗压快递纸箱',
    images: [
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=600&fit=crop',
    ],
    category: '包装材料 > 纸板包装 > 蜂窝纸板',
    brand: '绿源',
    model: 'LY-ENV-BOX',
    unit: '个',
    stock: 50000,
    sales: 23450,
    rating: 4.9,
    reviews: 2150,
    tags: ['环保可降解', '高韧抗压', '量大从优'],
    priceLevels: [
      { minQuantity: 500, maxQuantity: 1999, price: 3.5 },
      { minQuantity: 2000, maxQuantity: 4999, price: 2.8 },
      { minQuantity: 5000, maxQuantity: null, price: 2.2 },
    ],
    specs: {
      thickness: ['3层加厚加硬', '5层特硬超强'],
      size: ['中号(30*20*15cm)', '大号(45*30*25cm)', '特大号(60*40*35cm)'],
    },
    shipping: {
      from: '江苏省苏州市',
      deliveryTime: '24小时内闪电发货',
      freight: '满2000个全国包邮',
      estimatedArrival: '1-3天',
    },
    supplier: {
      id: '3',
      name: '上海绿源包装材料股份公司',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
      rating: 4.9,
      productCount: 560,
      certified: true,
      location: '上海市奉贤区',
      responseRate: 99,
      responseTime: '1小时',
    },
    description: `
      <h3>绿色包材 · 守护环境</h3>
      <p>100%可回收高强度环保瓦楞纸制造，专利波纹抗震结构，垂直承重可达80kg，有效降低运输破损率。</p>
    `,
    specifications: [
      { name: '纸张材质', value: '美国进口牛皮卡纸' },
      { name: '瓦楞类型', value: 'BC瓦楞/AB瓦楞' },
      { name: '破裂强度', value: '16.5 kgf/cm²' },
    ],
    afterSales: ['破损包退换', '支持大客户账期结款'],
  },
  {
    id: '4',
    name: '智能穿戴健康监测运动手表 24小时心率血氧追踪',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    ],
    category: '智能设备 > 智能穿戴 > 智能手表',
    brand: '智联',
    model: 'ZL-WATCH-05',
    unit: '台',
    stock: 2500,
    sales: 12300,
    rating: 4.7,
    reviews: 986,
    tags: ['智能追踪', '长续航', '正品保证'],
    priceLevels: [
      { minQuantity: 10, maxQuantity: 49, price: 180.0 },
      { minQuantity: 50, maxQuantity: 199, price: 165.0 },
      { minQuantity: 200, maxQuantity: null, price: 150.0 },
    ],
    specs: {
      color: ['曜石黑', '钛金灰', '玫瑰金'],
      strap: ['氟橡胶运动表带', '真皮商务表带'],
    },
    shipping: {
      from: '北京市朝阳区',
      deliveryTime: '48小时内发货',
      freight: '满50台起免邮',
      estimatedArrival: '2-4天',
    },
    supplier: {
      id: '4',
      name: '北京智联物联网技术有限公司',
      logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop',
      rating: 4.7,
      productCount: 720,
      certified: true,
      location: '北京市',
      responseRate: 96,
      responseTime: '2.5小时',
    },
    description: `
      <h3>全天候健康管家</h3>
      <p>配备全新升级的多通道光学传感器，支持心率、血氧、睡眠质量多维度精准监测。1.43英寸AMOLED视网膜屏，强光下依然清晰可见。</p>
    `,
    specifications: [
      { name: '屏幕尺寸', value: '1.43英寸 AMOLED' },
      { name: '续航时间', value: '常规模式下运行14天' },
      { name: '防水等级', value: '5ATM专业级防水' },
    ],
    afterSales: ['全国联保', '一年内质量问题免费换新'],
  },
  {
    id: '5',
    name: '工业级节能防爆LED照明灯具 高棚矿工灯',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
    ],
    category: '照明电器 > 工业照明 > LED高棚灯',
    brand: '佛山照明',
    model: 'FS-LED-150W',
    unit: '盏',
    stock: 3200,
    sales: 9870,
    rating: 4.8,
    reviews: 580,
    tags: ['节能省电', '高光效', '防水防尘'],
    priceLevels: [
      { minQuantity: 20, maxQuantity: 99, price: 95.0 },
      { minQuantity: 100, maxQuantity: 499, price: 85.0 },
      { minQuantity: 500, maxQuantity: null, price: 75.0 },
    ],
    specs: {
      power: ['100W', '150W', '200W'],
      temp: ['正白光(6000K)', '暖白光(4000K)'],
    },
    shipping: {
      from: '广东省佛山市',
      deliveryTime: '48小时内发货',
      freight: '按实际托盘运费计算',
      estimatedArrival: '3-5天',
    },
    supplier: {
      id: '5',
      name: '佛山光明电器有限公司',
      logo: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=100&h=100&fit=crop',
      rating: 4.8,
      productCount: 1200,
      certified: true,
      location: '广东省佛山市',
      responseRate: 94,
      responseTime: '3.5小时',
    },
    description: `
      <h3>高亮度 · 长寿命</h3>
      <p>采用普瑞LED芯片及明纬高品质电源，光通量高达140lm/W。加厚铝材散热鳍片，防尘防爆，专为大型仓库、体育馆、工厂车间设计。</p>
    `,
    specifications: [
      { name: '输入电压', value: 'AC 100-240V' },
      { name: '防护等级', value: 'IP65' },
      { name: '显色指数', value: '>80 Ra' },
    ],
    afterSales: ['5年质保', '专业照明方案免费设计'],
  },
  {
    id: '6',
    name: '精密高硬度五金工具套装 维修装配手工具箱',
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&h=600&fit=crop',
    ],
    category: '五金工具 > 手动工具 > 工具套装',
    brand: '温州精工',
    model: 'WZ-TOOL-128',
    unit: '套',
    stock: 4500,
    sales: 6540,
    rating: 4.9,
    reviews: 1120,
    tags: ['铬钒钢锻造', '终身质保', '高精规格'],
    priceLevels: [
      { minQuantity: 5, maxQuantity: 49, price: 280.0 },
      { minQuantity: 50, maxQuantity: 199, price: 250.0 },
      { minQuantity: 200, maxQuantity: null, price: 220.0 },
    ],
    specs: {
      type: ['128件套豪华版', '82件套实用版'],
    },
    shipping: {
      from: '浙江省温州市',
      deliveryTime: '24小时内发货',
      freight: '满20套免邮费',
      estimatedArrival: '2-3天',
    },
    supplier: {
      id: '6',
      name: '温州精工五金工具有限公司',
      logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=100&h=100&fit=crop',
      rating: 4.8,
      productCount: 1560,
      certified: true,
      location: '浙江省温州市',
      responseRate: 97,
      responseTime: '1.5小时',
    },
    description: `
      <h3>一把好工具，相伴一辈子</h3>
      <p>工具箱精选铬钒钢（CR-V）高韧度锻造，整体经过二次淬火热处理，防锈抗腐蚀，扭矩大，是工业车间生产 and 家装的可靠伙伴。</p>
    `,
    specifications: [
      { name: '硬度级别', value: 'HRC 58-62' },
      { name: '材质说明', value: '铬钒钢锻造' },
    ],
    afterSales: ['金属套筒及硬质扳手终身质保', '7天无理由退换'],
  },
  {
    id: '7',
    name: '高强度热轧建筑钢材 建筑螺纹钢批发',
    isLargeItem: true,
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=600&fit=crop',
    ],
    category: '建筑材料 > 建筑钢材 > 螺纹钢',
    brand: '鞍钢',
    model: 'AG-STEEL-HRB400',
    unit: '吨',
    stock: 5000,
    sales: 4320,
    rating: 4.9,
    reviews: 310,
    tags: ['国家标准', '实力厂家', '大宗货盘'],
    priceLevels: [
      { minQuantity: 10, maxQuantity: 49, price: 3800.0 },
      { minQuantity: 50, maxQuantity: 99, price: 3650.0 },
      { minQuantity: 100, maxQuantity: null, price: 3500.0 },
    ],
    specs: {
      diameter: ['Φ12mm', 'Φ16mm', 'Φ20mm', 'Φ25mm'],
    },
    shipping: {
      from: '辽宁省鞍山市',
      deliveryTime: '发车/装驳时间由合同约定',
      freight: '大宗商品，按实际水运/路运协议费率计算',
      estimatedArrival: '依据航线或铁路线约定',
    },
    supplier: {
      id: '7',
      name: '鞍山钢铁集团有限公司',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      rating: 4.9,
      productCount: 120,
      certified: true,
      location: '辽宁省鞍山市',
      responseRate: 91,
      responseTime: '4小时',
    },
    description: `
      <h3>精工大厂 · 国之重器</h3>
      <p>鞍山钢铁集团原厂出产，HRB400E高强抗震螺纹钢。执行最新GB/T 1499.2-2018国家标准，抗拉强度稳定。</p>
    `,
    specifications: [
      { name: '牌号', value: 'HRB400E (抗震螺纹钢)' },
      { name: '屈服强度', value: '≥400 MPa' },
      { name: '抗拉强度', value: '≥540 MPa' },
    ],
    afterSales: ['原厂质检合格证书同行', '支持分期结算'],
  },
  {
    id: '8',
    name: '医用防护一次性口罩 三层防护含熔喷布',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop',
    ],
    category: '医疗器械 > 防护用品 > 医用口罩',
    brand: '苏医',
    model: 'SY-MED-MASK',
    unit: '盒',
    stock: 10000,
    sales: 18900,
    rating: 4.8,
    reviews: 1540,
    tags: ['医疗级认证', '高效熔喷', '舒适无痛'],
    priceLevels: [
      { minQuantity: 100, maxQuantity: 499, price: 5.5 },
      { minQuantity: 500, maxQuantity: 1999, price: 4.2 },
      { minQuantity: 2000, maxQuantity: null, price: 3.0 },
    ],
    specs: {
      type: ['挂耳式 50只/盒', '绑带式 50只/盒'],
    },
    shipping: {
      from: '江苏省南京市',
      deliveryTime: '24小时内闪电发货',
      freight: '满500盒包邮',
      estimatedArrival: '1-3天',
    },
    supplier: {
      id: '8',
      name: '江苏医疗器械有限公司',
      logo: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=100&h=100&fit=crop',
      rating: 4.8,
      productCount: 780,
      certified: true,
      location: '江苏省南京市',
      responseRate: 98,
      responseTime: '1小时',
    },
    description: `
      <h3>安全呵护 · 自由呼吸</h3>
      <p>执行国家YY/T 0969-2013标准，采用亲肤无纺布与99级超细高密熔喷布制造。</p>
    `,
    specifications: [
      { name: '执行标准', value: 'YY/T 0969-2013' },
      { name: '过滤效率', value: 'BFE ≥95%' },
      { name: '注册证号', value: '苏械注准20202140410' },
    ],
    afterSales: ['医械出厂质检报告', '无条件召回问题批次'],
  },
  {
    id: '9',
    name: '智能安防高清网络监控系统 4路无线免布线套装',
    images: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=600&fit=crop',
    ],
    category: '安防设备 > 监控系统 > 网络摄像头',
    brand: '海康',
    model: 'HK-WIFI-CAM04',
    unit: '套',
    stock: 800,
    sales: 7650,
    rating: 4.9,
    reviews: 420,
    tags: ['400万像素', '免布线无线连接', '红外夜视'],
    priceLevels: [
      { minQuantity: 5, maxQuantity: 19, price: 650.0 },
      { minQuantity: 20, maxQuantity: 99, price: 580.0 },
      { minQuantity: 100, maxQuantity: null, price: 500.0 },
    ],
    specs: {
      capacity: ['4路主机 + 4个摄像头 + 1T硬盘', '8路主机 + 8个摄像头 + 2T硬盘'],
    },
    shipping: {
      from: '浙江省杭州市',
      deliveryTime: '48小时内发货',
      freight: '满20套免邮费',
      estimatedArrival: '2-4天',
    },
    supplier: {
      id: '9',
      name: '杭州安防科技股份公司',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      rating: 4.9,
      productCount: 1100,
      certified: true,
      location: '浙江省杭州市',
      responseRate: 97,
      responseTime: '2小时',
    },
    description: `
      <h3>24小时全景守护，安全尽在掌控</h3>
      <p>400万高清超广角红外镜头，支持智能人形侦测与声光双重报警。</p>
    `,
    specifications: [
      { name: '分辨率', value: '2560 * 1440 (400W像素)' },
      { name: '夜视距离', value: '超远30米红外高清夜视' },
      { name: '硬盘规格', value: 'SATA 3.5英寸监控专用硬盘' },
    ],
    afterSales: ['2年硬件换新保障', '终身云服务器解析'],
  },
  {
    id: '10',
    name: '环保工业级化工原料 有机溶剂基础化工产品',
    images: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop',
    ],
    category: '化工原料 > 有机化工 > 溶剂原料',
    brand: '宁化',
    model: 'NH-SOLVENT-C',
    unit: '桶',
    stock: 12000,
    sales: 5430,
    rating: 4.8,
    reviews: 210,
    tags: ['高纯度99.9%', '安全包装', '危化品资质'],
    priceLevels: [
      { minQuantity: 50, maxQuantity: 199, price: 110.0 },
      { minQuantity: 200, maxQuantity: 499, price: 95.0 },
      { minQuantity: 500, maxQuantity: null, price: 80.0 },
    ],
    specs: {
      packaging: ['200L铁桶包装', 'IBC集装桶包装(1000L)'],
    },
    shipping: {
      from: '浙江省宁波市',
      deliveryTime: '专用危化品货车配货，根据约定承运',
      freight: '运费依化工物流实时费率商定',
      estimatedArrival: '2-4天',
    },
    supplier: {
      id: '10',
      name: '宁波化工集团股份公司',
      logo: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=100&h=100&fit=crop',
      rating: 4.8,
      productCount: 430,
      certified: true,
      location: '浙江省宁波市',
      responseRate: 92,
      responseTime: '3小时',
    },
    description: `
      <h3>高纯精炼 · 稳定基料</h3>
      <p>严格精馏纯化生产，成品纯度稳定控制在99.9%以上。</p>
    `,
    specifications: [
      { name: '纯度指数', value: '≥ 99.95%' },
      { name: '外观状态', value: '无色澄清透明液体' },
      { name: '水分含量', value: '≤ 0.05%' },
    ],
    afterSales: ['随货附带COA化验单及MSDS说明书', '支持第三方复检'],
  },
  {
    id: '11',
    name: '高端高定纯天然防缩印花棉麻面料 纺织面料',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop',
    ],
    category: '纺织服装 > 纺织面料 > 棉麻面料',
    brand: '苏绸',
    model: 'SZ-FABRIC-LINEN',
    unit: '米',
    stock: 20000,
    sales: 11200,
    rating: 4.9,
    reviews: 690,
    tags: ['天然棉麻', '活性印染', '手感柔软'],
    priceLevels: [
      { minQuantity: 100, maxQuantity: 499, price: 45.0 },
      { minQuantity: 500, maxQuantity: 999, price: 38.0 },
      { minQuantity: 1000, maxQuantity: null, price: 30.0 },
    ],
    specs: {
      color: ['极简灰', '森系浅绿', '米白色', '天蓝色'],
    },
    shipping: {
      from: '江苏省苏州市',
      deliveryTime: '48小时内发货',
      freight: '满1000米包邮',
      estimatedArrival: '2-3天',
    },
    supplier: {
      id: '11',
      name: '苏州丝绸集团有限公司',
      logo: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=100&h=100&fit=crop',
      rating: 4.9,
      productCount: 2200,
      certified: true,
      location: '江苏省苏州市',
      responseRate: 98,
      responseTime: '1小时',
    },
    description: `
      <h3>精选好麻 · 亲肤透气</h3>
      <p>55%法国进口亚麻与45%精梳棉混纺，高频活性印染。</p>
    `,
    specifications: [
      { name: '面料成分', value: '55% 亚麻 + 45% 精梳棉' },
      { name: '克重', value: '220 g/㎡' },
      { name: '幅宽规格', value: '145 cm' },
    ],
    afterSales: ['提供免费小样测款', '整卷出厂，保证无接头无跳纱'],
  },
  {
    id: '12',
    name: '重型卡车刹车盘片 汽车制动零配件批发',
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=600&fit=crop',
    ],
    category: '汽车配件 > 制动系统 > 刹车盘',
    brand: '重汽',
    model: 'CQ-BRAKE-D80',
    unit: '对',
    stock: 1500,
    sales: 9340,
    rating: 4.9,
    reviews: 320,
    tags: ['耐高温防锈', '高摩擦系数', '权威质检'],
    priceLevels: [
      { minQuantity: 10, maxQuantity: 49, price: 380.0 },
      { minQuantity: 50, maxQuantity: 99, price: 340.0 },
      { minQuantity: 100, maxQuantity: null, price: 300.0 },
    ],
    specs: {
      type: ['前刹车盘(对)', '后刹车盘(对)'],
    },
    shipping: {
      from: '重庆市九龙坡区',
      deliveryTime: '72小时内发货',
      freight: '运费按吨位托运计费，多件优惠',
      estimatedArrival: '3-5天',
    },
    supplier: {
      id: '12',
      name: '重庆汽配城大件制动股份公司',
      logo: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=100&h=100&fit=crop',
      rating: 4.9,
      productCount: 1400,
      certified: true,
      location: '重庆市',
      responseRate: 96,
      responseTime: '2.5小时',
    },
    description: `
      <h3>强力制动，安全同行</h3>
      <p>采用合金铸铁材质及高精数控机床加工，摩擦表面具备防锈涂层。</p>
    `,
    specifications: [
      { name: '适配车型', value: '主流重卡/牵引车/自卸车' },
      { name: '盘径尺寸', value: '410 mm' },
      { name: '工作极限温度', value: '800°C' },
    ],
    afterSales: ['2万公里质保', '破损及尺寸不符免费换货'],
  },
]

const defaultAddresses: Address[] = [
  {
    id: 1,
    name: '张三 (演示分销商)',
    phone: '13800138000',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区深南大道10000号腾讯大厦',
    postalCode: '518000',
    isDefault: true,
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '陆家嘴环路1000号恒生银行大厦',
    postalCode: '200120',
    isDefault: false,
  },
]

const defaultOrders: Order[] = [
  {
    key: '1',
    orderNo: 'O202606230001',
    supplierId: '1',
    supplierName: '深圳市华强电子科技有限公司',
    distributorId: 'distributor_demo',
    distributorName: '张三 (演示分销商)',
    amount: 4500.0,
    status: '已发货',
    createTime: '2026-06-23 10:15:30',
    shippingDetails: {
      carrier: '顺丰速运',
      trackingNo: 'SF14285796300',
      shippedTime: '2026-06-23 14:22:10',
    },
    address: '广东省 深圳市 南山区 科技园南区深南大道10000号腾讯大厦',
    contact: '张三 (演示分销商)',
    phone: '13800138000',
    items: [
      {
        productId: '1',
        name: '工业级电子元件批发 高品质芯片模块',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop',
        price: 45.0,
        quantity: 100,
        unit: '件',
        spec: { color: '深空灰', version: '工业增强版' },
      },
    ],
  },
  {
    key: '2',
    orderNo: 'O202606230002',
    supplierId: '2',
    supplierName: '广州精工办公家具有限公司',
    distributorId: 'distributor_demo',
    distributorName: '张三 (演示分销商)',
    amount: 1800.0,
    status: '待发货',
    createTime: '2026-06-23 11:30:15',
    address: '广东省 深圳市 南山区 科技园南区深南大道10000号腾讯大厦',
    contact: '张三 (演示分销商)',
    phone: '13800138000',
    items: [
      {
        productId: '2',
        name: '高品质办公家具套装 实木会议桌椅组合',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop',
        price: 1800.0,
        quantity: 1,
        unit: '套',
        spec: { color: '北美黑胡桃色', size: '1.8米会议桌+6椅' },
      },
    ],
  },
]

// 初始化数据
export const initMockDb = () => {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(defaultProducts))
  }
  if (!localStorage.getItem(KEYS.ADDRESSES)) {
    localStorage.setItem(KEYS.ADDRESSES, JSON.stringify(defaultAddresses))
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(defaultOrders))
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify([]))
  }
}

// 统一数据通知机制
const notifyCartUpdated = () => {
  window.dispatchEvent(new Event('cart_updated'))
}

const notifyDbUpdated = () => {
  window.dispatchEvent(new Event('b2b_db_updated'))
}

// --- API 实现 ---

export const mockDb = {
  // --- 商品 Products ---
  getProducts: (): ProductDetailItem[] => {
    initMockDb()
    return JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]')
  },

  getProductById: (id: string): ProductDetailItem | null => {
    const list = mockDb.getProducts()
    return list.find((p) => p.id === id) || null
  },

  saveProduct: (product: ProductDetailItem) => {
    const list = mockDb.getProducts()
    const index = list.findIndex((p) => p.id === product.id)
    if (index > -1) {
      list[index] = product
    } else {
      list.unshift(product)
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(list))
    notifyDbUpdated()
  },

  deleteProduct: (id: string) => {
    const list = mockDb.getProducts()
    const filtered = list.filter((p) => p.id !== id)
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered))
    notifyDbUpdated()
  },

  // --- 订单 Orders ---
  getOrders: (): Order[] => {
    initMockDb()
    return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]')
  },

  saveOrder: (order: Order) => {
    const list = mockDb.getOrders()
    const index = list.findIndex((o) => o.orderNo === order.orderNo)
    if (index > -1) {
      list[index] = order
    } else {
      list.unshift(order)
    }
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(list))
    notifyDbUpdated()
  },

  updateOrderStatus: (orderNo: string, status: Order['status'], shippingDetails?: Order['shippingDetails']) => {
    const list = mockDb.getOrders()
    const index = list.findIndex((o) => o.orderNo === orderNo)
    if (index > -1) {
      list[index].status = status
      if (shippingDetails) {
        list[index].shippingDetails = {
          ...list[index].shippingDetails,
          ...shippingDetails,
        }
      }
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(list))
      notifyDbUpdated()
      return true
    }
    return false
  },

  // --- 收货地址 Addresses ---
  getAddresses: (): Address[] => {
    initMockDb()
    return JSON.parse(localStorage.getItem(KEYS.ADDRESSES) || '[]')
  },

  saveAddress: (address: Address) => {
    const list = mockDb.getAddresses()
    // 如果设置为默认，先把其它地址的默认标志去掉
    if (address.isDefault) {
      list.forEach((addr) => {
        addr.isDefault = false
      })
    }
    const index = list.findIndex((addr) => addr.id === address.id)
    if (index > -1) {
      list[index] = address
    } else {
      list.push(address)
    }
    localStorage.setItem(KEYS.ADDRESSES, JSON.stringify(list))
    notifyDbUpdated()
  },

  deleteAddress: (id: number) => {
    const list = mockDb.getAddresses()
    const filtered = list.filter((addr) => addr.id !== id)
    // 如果删除了默认地址，把第一个地址设为默认
    if (filtered.length > 0 && !filtered.some((addr) => addr.isDefault)) {
      filtered[0].isDefault = true
    }
    localStorage.setItem(KEYS.ADDRESSES, JSON.stringify(filtered))
    notifyDbUpdated()
  },

  setDefaultAddress: (id: number) => {
    const list = mockDb.getAddresses()
    list.forEach((addr) => {
      addr.isDefault = addr.id === id
    })
    localStorage.setItem(KEYS.ADDRESSES, JSON.stringify(list))
    notifyDbUpdated()
  },

  // --- 收藏夹 Favorites ---
  getFavorites: (): string[] => {
    initMockDb()
    return JSON.parse(localStorage.getItem(KEYS.FAVORITES) || '[]')
  },

  isFavorite: (productId: string): boolean => {
    const list = mockDb.getFavorites()
    return list.includes(productId)
  },

  toggleFavorite: (productId: string): boolean => {
    const list = mockDb.getFavorites()
    const index = list.indexOf(productId)
    let added = false
    if (index > -1) {
      list.splice(index, 1)
    } else {
      list.push(productId)
      added = true
    }
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(list))
    notifyDbUpdated()
    return added
  },

  // --- 购物车 Cart ---
  getCart: () => {
    return JSON.parse(localStorage.getItem(KEYS.CART) || '[]')
  },

  clearCart: () => {
    localStorage.setItem(KEYS.CART, JSON.stringify([]))
    notifyCartUpdated()
  },

  updateCartItems: (items: any[]) => {
    localStorage.setItem(KEYS.CART, JSON.stringify(items))
    notifyCartUpdated()
  }
}
