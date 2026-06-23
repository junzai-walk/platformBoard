import { Link } from 'react-router-dom'
import { Carousel, Row, Col, Card, Tag, Statistic, Avatar, Rate, Button } from 'antd'
import {
  FireOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  RocketOutlined,
  StarOutlined,
  CrownOutlined,
} from '@ant-design/icons'
import Layout from '@/components/Layout'
import { useHome } from '@/hooks/useHome'
import './index.less'

const Home = () => {
  const {
    largeItemCategories,
    warehouseAdvantages,
    banners,
    categories,
    platformStats,
    features,
    topSuppliers,
    testimonials,
    hotProducts,
    t,
  } = useHome()

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
                  <div className="category-image-container">
                    <img src={cat.image} alt={cat.name} className="category-image" />
                    <div className="category-overlay" style={{ background: `linear-gradient(135deg, ${cat.color}dd, ${cat.color}99)` }}></div>
                  </div>
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
                    <Card.Meta
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

