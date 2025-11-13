import { Link } from 'react-router-dom'
import { Carousel, Row, Col, Card, Tag, Statistic, Avatar, Rate, Button } from 'antd'
import {
  TrophyOutlined,
  RocketOutlined,
  FireOutlined,
  GlobalOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  ShoppingOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  StarOutlined,
  CrownOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Layout from '@/components/Layout'
import './index.less'

const { Meta } = Card

const Home = () => {
  const { t } = useTranslation()
  // 大件商品分类（新增）
  const largeItemCategories = [
    {
      id: 'furniture',
      nameZh: '家具家居',
      nameEn: 'Furniture & Home',
      icon: '🛋️',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      count: 28500,
      color: '#ff6600',
    },
    {
      id: 'appliances',
      nameZh: '家用电器',
      nameEn: 'Home Appliances',
      icon: '🔌',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop',
      count: 15600,
      color: '#1890ff',
    },
    {
      id: 'fitness',
      nameZh: '健身器材',
      nameEn: 'Fitness Equipment',
      icon: '💪',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      count: 8900,
      color: '#52c41a',
    },
    {
      id: 'outdoor',
      nameZh: '户外设施',
      nameEn: 'Outdoor Facilities',
      icon: '🏕️',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
      count: 6700,
      color: '#722ed1',
    },
  ]

  // 海外仓优势（新增）
  const warehouseAdvantages = [
    {
      icon: <GlobalOutlined />,
      titleKey: 'home.advantage1Title',
      descKey: 'home.advantage1Desc',
      color: '#ff6600',
    },
    {
      icon: <RocketOutlined />,
      titleKey: 'home.advantage2Title',
      descKey: 'home.advantage2Desc',
      color: '#1890ff',
    },
    {
      icon: <DollarOutlined />,
      titleKey: 'home.advantage3Title',
      descKey: 'home.advantage3Desc',
      color: '#52c41a',
    },
    {
      icon: <HomeOutlined />,
      titleKey: 'home.advantage4Title',
      descKey: 'home.advantage4Desc',
      color: '#722ed1',
    },
  ]

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
      title: '优质供应商入驻',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=400&fit=crop',
      title: '大型采购活动',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: '新品上线',
    },
  ]

  // 扩展到16个分类
  const categories = [
    { id: 1, name: '电子元器件', icon: '📱', count: 12580, color: '#ff6600' },
    { id: 2, name: '机械设备', icon: '⚙️', count: 8920, color: '#1890ff' },
    { id: 3, name: '五金工具', icon: '🔧', count: 15600, color: '#52c41a' },
    { id: 4, name: '化工原料', icon: '🧪', count: 6780, color: '#722ed1' },
    { id: 5, name: '建筑材料', icon: '🏗️', count: 9450, color: '#fa8c16' },
    { id: 6, name: '办公用品', icon: '📝', count: 11200, color: '#13c2c2' },
    { id: 7, name: '包装材料', icon: '📦', count: 7890, color: '#eb2f96' },
    { id: 8, name: '纺织服装', icon: '👔', count: 18500, color: '#faad14' },
    { id: 9, name: '家居用品', icon: '🏠', count: 13400, color: '#f5222d' },
    { id: 10, name: '食品饮料', icon: '🍔', count: 8600, color: '#fa541c' },
    { id: 11, name: '医疗器械', icon: '💊', count: 4320, color: '#2f54eb' },
    { id: 12, name: '汽车配件', icon: '🚗', count: 10800, color: '#1890ff' },
    { id: 13, name: '照明电器', icon: '💡', count: 6540, color: '#faad14' },
    { id: 14, name: '安防设备', icon: '📹', count: 5670, color: '#722ed1' },
    { id: 15, name: '环保设备', icon: '♻️', count: 3890, color: '#52c41a' },
    { id: 16, name: '农业用品', icon: '🌾', count: 7120, color: '#13c2c2' },
  ]

  // 平台数据统计
  const platformStats = [
    { title: '入驻商家', value: 58600, suffix: '+', icon: <TeamOutlined />, color: '#ff6600' },
    { title: '在售商品', value: 1280000, suffix: '+', icon: <ShoppingOutlined />, color: '#1890ff' },
    { title: '累计交易额', value: 3.8, suffix: '亿', prefix: '¥', icon: <DollarOutlined />, color: '#52c41a' },
    { title: '服务企业', value: 126000, suffix: '+', icon: <GlobalOutlined />, color: '#722ed1' },
  ]

  const features = [
    { icon: <SafetyOutlined />, title: '实名认证', desc: '企业资质严格审核', color: '#ff6600' },
    { icon: <ThunderboltOutlined />, title: '极速发货', desc: '48小时快速响应', color: '#1890ff' },
    { icon: <TrophyOutlined />, title: '品质保障', desc: '100%正品保证', color: '#52c41a' },
    { icon: <GlobalOutlined />, title: '全球货源', desc: '海内外优质供应', color: '#722ed1' },
    { icon: <CheckCircleOutlined />, title: '交易保障', desc: '平台担保交易', color: '#fa8c16' },
    { icon: <RocketOutlined />, title: '一站服务', desc: '采购到物流全程', color: '#13c2c2' },
  ]

  // 热门供应商
  const topSuppliers = [
    {
      id: 1,
      name: '深圳市华强电子科技有限公司',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      category: '电子元器件',
      rating: 4.9,
      products: 1580,
      certified: true,
    },
    {
      id: 2,
      name: '广州精工机械制造有限公司',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
      category: '机械设备',
      rating: 4.8,
      products: 890,
      certified: true,
    },
    {
      id: 3,
      name: '上海绿源环保科技股份公司',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
      category: '环保设备',
      rating: 4.9,
      products: 560,
      certified: true,
    },
    {
      id: 4,
      name: '北京智联物联网技术有限公司',
      logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop',
      category: '智能设备',
      rating: 4.7,
      products: 720,
      certified: true,
    },
  ]

  // 客户评价
  const testimonials = [
    {
      id: 1,
      company: '某大型连锁超市',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop',
      content: '通过平台找到了稳定的供应商，产品质量好，价格实惠，合作非常愉快！',
      rating: 5,
      name: '采购经理 张先生',
    },
    {
      id: 2,
      company: '某制造企业',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop',
      content: '平台服务专业，交易流程规范，大大提高了我们的采购效率。',
      rating: 5,
      name: '采购总监 李女士',
    },
    {
      id: 3,
      company: '某电商平台',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
      content: '商品种类丰富，供应商响应快速，是我们长期合作的首选平台。',
      rating: 5,
      name: '运营主管 王先生',
    },
  ]

  // 扩展到12个热门商品
  const hotProducts = [
    {
      id: 1,
      name: '工业级电子元件批发',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop',
      price: '¥10.00 - ¥50.00',
      moq: '100件',
      sales: 15680,
      supplier: '深圳华强电子',
      certified: true,
      tags: ['热销', '认证'],
    },
    {
      id: 2,
      name: '高品质办公家具套装',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=300&fit=crop',
      price: '¥500.00 - ¥2000.00',
      moq: '10套',
      sales: 8920,
      supplier: '广州精工家具',
      certified: true,
      tags: ['新品', '认证'],
    },
    {
      id: 3,
      name: '环保包装材料',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=300&fit=crop',
      price: '¥2.00 - ¥8.00',
      moq: '1000个',
      sales: 23450,
      supplier: '上海绿源包装',
      certified: true,
      tags: ['热销', '环保'],
    },
    {
      id: 4,
      name: '智能穿戴设备',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      price: '¥80.00 - ¥300.00',
      moq: '50件',
      sales: 12300,
      supplier: '北京智联科技',
      certified: true,
      tags: ['新品', '智能'],
    },
    {
      id: 5,
      name: '工业级LED照明灯具',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop',
      price: '¥35.00 - ¥120.00',
      moq: '200件',
      sales: 9870,
      supplier: '佛山光明电器',
      certified: true,
      tags: ['节能', '认证'],
    },
    {
      id: 6,
      name: '精密五金工具套装',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop',
      price: '¥150.00 - ¥680.00',
      moq: '20套',
      sales: 6540,
      supplier: '温州精工五金',
      certified: true,
      tags: ['热销', '精品'],
    },
    {
      id: 7,
      name: '高强度建筑钢材',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop',
      price: '¥3500.00 - ¥4200.00',
      moq: '10吨',
      sales: 4320,
      supplier: '鞍山钢铁集团',
      certified: true,
      tags: ['认证', '质保'],
    },
    {
      id: 8,
      name: '医用防护用品',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
      price: '¥1.50 - ¥8.00',
      moq: '5000件',
      sales: 18900,
      supplier: '江苏医疗器械',
      certified: true,
      tags: ['医用', '认证'],
    },
    {
      id: 9,
      name: '智能安防监控系统',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&h=300&fit=crop',
      price: '¥280.00 - ¥1200.00',
      moq: '10套',
      sales: 7650,
      supplier: '杭州安防科技',
      certified: true,
      tags: ['智能', '新品'],
    },
    {
      id: 10,
      name: '环保化工原料',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop',
      price: '¥45.00 - ¥180.00',
      moq: '500kg',
      sales: 5430,
      supplier: '宁波化工集团',
      certified: true,
      tags: ['环保', '认证'],
    },
    {
      id: 11,
      name: '高端纺织面料',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=300&h=300&fit=crop',
      price: '¥25.00 - ¥95.00',
      moq: '1000米',
      sales: 11200,
      supplier: '苏州丝绸集团',
      certified: true,
      tags: ['精品', '热销'],
    },
    {
      id: 12,
      name: '汽车配件批发',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
      price: '¥120.00 - ¥850.00',
      moq: '50件',
      sales: 9340,
      supplier: '重庆汽配城',
      certified: true,
      tags: ['认证', '质保'],
    },
  ]

  return (
    <Layout>
      <div className="home-page">
        {/* Hero Section - 大件商品定位 */}
        <section className="hero-section-large-items">
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <h1 className="hero-title">{t('home.heroTitle')}</h1>
            <p className="hero-subtitle">{t('home.heroSubtitle')}</p>
            <p className="hero-desc">{t('home.heroDesc')}</p>
            <div className="hero-actions">
              <Link to="/categories">
                <Button type="primary" size="large" icon={<ShoppingOutlined />}>
                  {t('home.exploreProducts')}
                </Button>
              </Link>
              <Link to="/overseas-warehouse">
                <Button size="large" icon={<GlobalOutlined />} style={{ marginLeft: 16 }}>
                  {t('home.viewWarehouse')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 大件商品分类展示 */}
        <section className="large-item-categories-section">
          <div className="container">
            <h2 className="section-title">
              <span className="text-gradient">{t('home.largeItemCategories')}</span>
            </h2>
            <p className="section-subtitle">{t('home.largeItemCategoriesDesc')}</p>
            <Row gutter={[24, 24]}>
              {largeItemCategories.map((category, index) => (
                <Col key={category.id} xs={24} sm={12} md={6}>
                  <Link to={`/categories?filter=${category.id}`}>
                    <Card
                      hoverable
                      className="large-item-category-card animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      cover={
                        <div className="category-image-wrapper">
                          <img alt={category.nameZh} src={category.image} />
                          <div className="category-overlay">
                            <span className="category-icon">{category.icon}</span>
                          </div>
                        </div>
                      }
                    >
                      <Card.Meta
                        title={
                          <div className="category-title">
                            <span>{t('common.lng') === 'zh-CN' ? category.nameZh : category.nameEn}</span>
                          </div>
                        }
                        description={
                          <div className="category-count" style={{ color: category.color }}>
                            {category.count.toLocaleString()}+ {t('home.products')}
                          </div>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 海外仓优势 */}
        <section className="warehouse-advantages-section">
          <div className="container">
            <h2 className="section-title">
              <span className="text-gradient">{t('home.warehouseAdvantages')}</span>
            </h2>
            <p className="section-subtitle">{t('home.warehouseAdvantagesDesc')}</p>
            <Row gutter={[24, 24]}>
              {warehouseAdvantages.map((advantage, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                  <Card className="advantage-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="advantage-icon" style={{ color: advantage.color }}>
                      {advantage.icon}
                    </div>
                    <h3>{t(advantage.titleKey)}</h3>
                    <p>{t(advantage.descKey)}</p>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="section-action" style={{ marginTop: 32, textAlign: 'center' }}>
              <Link to="/logistics-solutions">
                <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                  {t('common.logisticsSolutions')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Banner轮播 */}
        <section className="banner-section">
          <div className="wide-container">
            <Row gutter={24}>
              <Col xs={24} md={18}>
                <Carousel autoplay className="main-carousel">
                  {banners.map((banner) => (
                    <div key={banner.id}>
                      <img src={banner.image} alt={banner.title} />
                    </div>
                  ))}
                </Carousel>
              </Col>
              <Col xs={24} md={6}>
                <div className="side-panel">
                  <h3>快捷入口</h3>
                  <Link to="/supplier-register" className="quick-link">
                    <RocketOutlined /> 供应商入驻
                  </Link>
                  <Link to="/distributor-register" className="quick-link">
                    <ShoppingOutlined /> 分销商注册
                  </Link>
                  <Link to="/help-center" className="quick-link">
                    <GlobalOutlined /> 帮助中心
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* 平台数据统计 */}
        <section className="stats-section">
          <div className="container">
            <Row gutter={[24, 24]}>
              {platformStats.map((stat, index) => (
                <Col key={index} xs={12} sm={12} md={6}>
                  <div className="stat-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="stat-icon" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      valueStyle={{ color: stat.color, fontWeight: 600 }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 商品分类 */}
        <section className="category-section">
          <div className="wide-container">
            <h2 className="section-title">
              <span className="text-gradient">商品分类</span>
            </h2>
            <Row gutter={[16, 16]}>
              {categories.map((cat, index) => (
                <Col key={cat.id} xs={12} sm={8} md={6} lg={3}>
                  <Link to={`/category/${cat.id}`} className="category-card animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="category-icon" style={{ color: cat.color }}>{cat.icon}</div>
                    <div className="category-name">{cat.name}</div>
                    <div className="category-count">{cat.count.toLocaleString()}+</div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 平台优势 */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">
              <span className="text-gradient">平台优势</span>
            </h2>
            <Row gutter={[24, 24]}>
              {features.map((feature, index) => (
                <Col key={index} xs={12} sm={8} md={4}>
                  <div className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="icon-wrapper" style={{ background: `${feature.color}15`, color: feature.color }}>
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 爆品推荐 */}
        <section className="products-section">
          <div className="wide-container">
            <h2 className="section-title">
              <FireOutlined style={{ marginRight: 8, color: '#ff6600' }} />
              <span className="text-gradient">爆品推荐</span>
            </h2>
            <Row gutter={[20, 20]}>
              {hotProducts.map((product, index) => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                  <Link to={`/product/${product.id}`}>
                    <Card
                      hoverable
                      className="product-card animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      cover={
                        <div className="product-image-wrapper">
                          <img alt={product.name} src={product.image} />
                          {product.tags && (
                            <div className="product-tags">
                              {product.tags.map((tag, i) => (
                                <Tag key={i} color={i === 0 ? 'red' : 'orange'}>
                                  {tag}
                                </Tag>
                              ))}
                            </div>
                          )}
                        </div>
                      }
                    >
                      <Meta
                        title={<div className="product-name">{product.name}</div>}
                        description={
                          <div className="product-info">
                            <div className="price">{product.price}</div>
                            <div className="meta-row">
                              <span className="moq">起订: {product.moq}</span>
                              <span className="sales">已售: {product.sales.toLocaleString()}</span>
                            </div>
                            <div className="supplier">
                              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />
                              {product.supplier}
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 热门供应商 */}
        <section className="suppliers-section">
          <div className="container">
            <h2 className="section-title">
              <CrownOutlined style={{ marginRight: 8, color: '#faad14' }} />
              <span className="text-gradient">优质供应商</span>
            </h2>
            <Row gutter={[24, 24]}>
              {topSuppliers.map((supplier, index) => (
                <Col key={supplier.id} xs={24} sm={12} md={6}>
                  <Card className="supplier-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="supplier-header">
                      <Avatar size={64} src={supplier.logo} />
                      {supplier.certified && (
                        <div className="certified-badge">
                          <CheckCircleOutlined />
                        </div>
                      )}
                    </div>
                    <h3 className="supplier-name">{supplier.name}</h3>
                    <div className="supplier-category">
                      <Tag color="blue">{supplier.category}</Tag>
                    </div>
                    <div className="supplier-stats">
                      <div className="stat-item">
                        <Rate disabled defaultValue={supplier.rating} style={{ fontSize: 14 }} />
                        <span className="rating-value">{supplier.rating}</span>
                      </div>
                      <div className="stat-item">
                        <ShoppingOutlined style={{ marginRight: 4 }} />
                        {supplier.products} 商品
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 客户评价 */}
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">
              <StarOutlined style={{ marginRight: 8, color: '#faad14' }} />
              <span className="text-gradient">客户评价</span>
            </h2>
            <Row gutter={[24, 24]}>
              {testimonials.map((item, index) => (
                <Col key={item.id} xs={24} md={8}>
                  <Card className="testimonial-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="testimonial-header">
                      <Avatar size={56} src={item.avatar} />
                      <div className="testimonial-info">
                        <h4>{item.name}</h4>
                        <p>{item.company}</p>
                      </div>
                    </div>
                    <Rate disabled defaultValue={item.rating} style={{ marginBottom: 12 }} />
                    <p className="testimonial-content">{item.content}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home

