import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Rate,
  Tag,
  Statistic,
  Space,
  Image,
  Divider,
  Avatar,
} from 'antd'
import {
  StarOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import Layout from '@/components/Layout'
import './index.less'

const SupplierShop = () => {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const [followed, setFollowed] = useState(false)

  // 模拟店铺数据
  const shopData = {
    id: supplierId || '1',
    name: '深圳市华强电子科技有限公司',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    slogan: '专业电子元器件供应商，品质保证，价格优惠',
    rating: 4.9,
    productCount: 1580,
    followers: 12580,
    sales: 58600,
    goodRate: 99.5,
    certified: true,
    mainCategories: ['电子元器件', '芯片', '传感器', '电阻电容'],
    description:
      '深圳市华强电子科技有限公司成立于2010年，是一家专业从事电子元器件研发、生产、销售的高新技术企业。公司拥有完善的质量管理体系和专业的技术团队，产品广泛应用于通信、汽车、工业控制等领域。我们秉承"品质第一、客户至上"的经营理念，为客户提供优质的产品和服务。',
    servicePromises: ['7天无理由退换货', '正品保证', '48小时发货', '全国包邮'],
    contact: {
      phone: '400-888-8888',
      address: '广东省深圳市南山区科技园南区深南大道10000号',
      businessHours: '周一至周日 09:00-18:00',
    },
  }

  // 模拟商品数据
  const products = Array(12)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      name: `工业级${['电子元件', '芯片模块', '传感器', '电阻电容'][i % 4]} ${i + 1}`,
      image: `https://images.unsplash.com/photo-${
        [
          '1518770660439-4636190af475',
          '1581092160562-40aa08e78837',
          '1572635196237-14b3f281503f',
          '1484480974693-6ca0a78fb36b',
        ][i % 4]
      }?w=300&h=300&fit=crop`,
      price: (Math.random() * 100 + 10).toFixed(2),
      moq: [100, 200, 500, 1000][i % 4],
      sales: Math.floor(Math.random() * 5000) + 1000,
      tags: [
        ['热销', '认证'],
        ['新品'],
        ['包邮', '热销'],
        ['认证'],
      ][i % 4],
    }))

  const handleFollow = () => {
    setFollowed(!followed)
  }

  return (
    <Layout>
      <div className="supplier-shop">
        {/* 店铺头部 */}
        <div className="shop-header">
          <div
            className="shop-banner"
            style={{ backgroundImage: `url(${shopData.banner})` }}
          >
            <div className="banner-overlay" />
          </div>

          <div className="container">
            <div className="shop-info-card">
              <Row gutter={24} align="middle">
                <Col>
                  <Avatar src={shopData.logo} size={120} shape="square" />
                </Col>
                <Col flex="auto">
                  <div className="shop-name">
                    <h1>{shopData.name}</h1>
                    {shopData.certified && (
                      <Tag icon={<SafetyCertificateOutlined />} color="orange">
                        官方认证
                      </Tag>
                    )}
                  </div>
                  <p className="shop-slogan">{shopData.slogan}</p>
                  <Space size="large" className="shop-meta">
                    <div>
                      <Rate disabled defaultValue={shopData.rating} allowHalf />
                      <span style={{ marginLeft: 8, color: '#ff6600', fontWeight: 600 }}>
                        {shopData.rating}
                      </span>
                    </div>
                    <Divider type="vertical" />
                    <Space size="middle">
                      {shopData.mainCategories.slice(0, 3).map((cat) => (
                        <Tag key={cat}>{cat}</Tag>
                      ))}
                    </Space>
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical" size="middle">
                    <Button
                      type={followed ? 'default' : 'primary'}
                      size="large"
                      icon={followed ? <StarOutlined /> : <HeartOutlined />}
                      onClick={handleFollow}
                      block
                    >
                      {followed ? '已关注' : '关注店铺'}
                    </Button>
                    <Button size="large" icon={<MessageOutlined />} block>
                      联系客服
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>

            {/* 店铺统计 */}
            <Row gutter={16} className="shop-stats">
              <Col span={6}>
                <Card className="stat-card">
                  <Statistic
                    title="商品数量"
                    value={shopData.productCount}
                    suffix="个"
                    valueStyle={{ color: '#ff6600' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card">
                  <Statistic
                    title="粉丝数"
                    value={shopData.followers}
                    suffix="人"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card">
                  <Statistic
                    title="成交量"
                    value={shopData.sales}
                    suffix="笔"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card className="stat-card">
                  <Statistic
                    title="好评率"
                    value={shopData.goodRate}
                    suffix="%"
                    precision={1}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* 店铺内容 */}
        <div className="container" style={{ marginTop: 24 }}>
          <Row gutter={24}>
            {/* 左侧：商品列表 */}
            <Col span={18}>
              <Card>
                <Tabs
                  defaultActiveKey="all"
                  items={[
                    { key: 'all', label: '全部商品' },
                    { key: 'hot', label: '热销商品' },
                    { key: 'new', label: '新品推荐' },
                  ]}
                />

                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  {products.map((product) => (
                    <Col key={product.id} span={6}>
                      <Card
                        hoverable
                        className="product-card"
                        cover={
                          <div className="product-image-wrapper">
                            <Image
                              src={product.image}
                              alt={product.name}
                              preview={false}
                              onClick={() => navigate(`/product/${product.id}`)}
                            />
                            {product.tags.length > 0 && (
                              <div className="product-tags">
                                {product.tags.map((tag) => (
                                  <Tag key={tag} color="orange">
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                            )}
                          </div>
                        }
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">¥{product.price}</div>
                        <div className="product-meta">
                          <span>起订: {product.moq}件</span>
                          <span>销量: {product.sales}</span>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            {/* 右侧：店铺信息 */}
            <Col span={6}>
              {/* 店铺介绍 */}
              <Card title="店铺介绍" style={{ marginBottom: 16 }}>
                <p style={{ color: '#666', lineHeight: 1.8 }}>{shopData.description}</p>
              </Card>

              {/* 服务承诺 */}
              <Card title="服务承诺" style={{ marginBottom: 16 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {shopData.servicePromises.map((promise, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <SafetyCertificateOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      <span>{promise}</span>
                    </div>
                  ))}
                </Space>
              </Card>

              {/* 联系方式 */}
              <Card title="联系方式">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <PhoneOutlined style={{ marginRight: 8, color: '#ff6600' }} />
                    <span>{shopData.contact.phone}</span>
                  </div>
                  <div>
                    <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    <span>{shopData.contact.address}</span>
                  </div>
                  <div>
                    <CustomerServiceOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                    <span>{shopData.contact.businessHours}</span>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default SupplierShop

