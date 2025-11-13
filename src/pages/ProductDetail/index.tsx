import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Button,
  InputNumber,
  Tabs,
  Image,
  Card,
  Table,
  Tag,
  Space,
  Rate,
  Avatar,
  Divider,
  message,
  Breadcrumb,
} from 'antd'
import {
  ShoppingCartOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  HeartOutlined,
  ShareAltOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import Layout from '@/components/Layout'
import './index.less'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(100)
  const [selectedSpec, setSelectedSpec] = useState<any>({})
  const [currentImage, setCurrentImage] = useState(0)

  // 模拟商品数据
  const product = {
    id: id || '1',
    name: '工业级电子元件批发 高品质芯片模块',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=600&fit=crop',
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
    // 价格阶梯
    priceLevels: [
      { minQuantity: 1, maxQuantity: 99, price: 50.0 },
      { minQuantity: 100, maxQuantity: 499, price: 45.0 },
      { minQuantity: 500, maxQuantity: 999, price: 40.0 },
      { minQuantity: 1000, maxQuantity: null, price: 35.0 },
    ],
    // 规格选项
    specs: {
      color: ['黑色', '银色', '金色'],
      capacity: ['16GB', '32GB', '64GB'],
    },
    // 物流信息
    shipping: {
      from: '广东省深圳市南山区',
      deliveryTime: '48小时内发货',
      freight: '满500件包邮',
      estimatedArrival: '3-5天',
    },
    // 供应商信息
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
    // 商品详情
    description: `
      <h3>产品特点</h3>
      <ul>
        <li>采用先进的制造工艺，性能稳定可靠</li>
        <li>通过ISO9001质量体系认证</li>
        <li>支持定制化服务，满足不同需求</li>
        <li>提供完善的售后服务和技术支持</li>
      </ul>
      <h3>应用领域</h3>
      <p>广泛应用于通信设备、工业控制、汽车电子、消费电子等领域。</p>
    `,
    // 规格参数
    specifications: [
      { name: '产品型号', value: 'HW-2025-PRO' },
      { name: '品牌', value: '华为' },
      { name: '尺寸', value: '10 x 10 x 5 cm' },
      { name: '重量', value: '500g' },
      { name: '材质', value: 'ABS塑料 + 金属' },
      { name: '工作温度', value: '-20°C ~ 85°C' },
      { name: '认证', value: 'CE, FCC, RoHS' },
      { name: '质保期', value: '1年' },
    ],
    // 售后保障
    afterSales: [
      '7天无理由退换货',
      '质保期内免费维修',
      '全国联保',
      '终身技术支持',
    ],
  }

  // 计算当前价格
  const getCurrentPrice = () => {
    const level = product.priceLevels.find(
      (l) => quantity >= l.minQuantity && (l.maxQuantity === null || quantity <= l.maxQuantity)
    )
    return level ? level.price : product.priceLevels[0].price
  }

  // 价格阶梯表格列
  const priceLevelColumns = [
    {
      title: '起订量',
      dataIndex: 'minQuantity',
      key: 'minQuantity',
      render: (min: number, record: any) =>
        record.maxQuantity
          ? `${min} - ${record.maxQuantity} 件`
          : `${min} 件以上`,
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span style={{ color: '#ff6600', fontWeight: 600, fontSize: 16 }}>
          ¥{price.toFixed(2)}
        </span>
      ),
    },
  ]

  const handleAddToCart = () => {
    message.success('已加入购物车')
  }

  const handleBuyNow = () => {
    message.success('立即购买')
    navigate('/checkout')
  }

  const handleContactSupplier = () => {
    message.info('正在连接客服...')
  }

  return (
    <Layout>
      <div className="product-detail-page">
        <div className="container">
          {/* 面包屑导航 */}
          <Breadcrumb
            style={{ marginBottom: 24 }}
            items={[
              { title: '首页', href: '/' },
              { title: '电子元器件', href: '/category/1' },
              { title: '芯片', href: '/category/1' },
              { title: product.name },
            ]}
          />

          {/* 商品主要信息 */}
          <Row gutter={24}>
            {/* 左侧：商品图片 */}
            <Col xs={24} md={10}>
              <Card className="image-gallery">
                <Image.PreviewGroup>
                  <Image
                    src={product.images[currentImage]}
                    alt={product.name}
                    style={{ borderRadius: 12 }}
                  />
                </Image.PreviewGroup>
                <div className="image-thumbnails">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${index === currentImage ? 'active' : ''}`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 右侧：商品信息 */}
            <Col xs={24} md={14}>
              <Card>
                <div className="product-header">
                  <h1 className="product-title">{product.name}</h1>
                  <Space>
                    {product.tags.map((tag) => (
                      <Tag key={tag} color="orange">
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </div>

                <div className="product-meta">
                  <Space size="large">
                    <div>
                      <Rate disabled defaultValue={product.rating} allowHalf />
                      <span style={{ marginLeft: 8 }}>{product.rating}</span>
                    </div>
                    <Divider type="vertical" />
                    <span>销量: {product.sales}</span>
                    <Divider type="vertical" />
                    <span>评价: {product.reviews}</span>
                  </Space>
                </div>

                <Divider />

                {/* 价格信息 */}
                <div className="price-section">
                  <div className="current-price">
                    <span className="label">当前单价:</span>
                    <span className="price">¥{getCurrentPrice().toFixed(2)}</span>
                    <span className="unit">/{product.unit}</span>
                  </div>
                  <div className="total-price">
                    <span className="label">总价:</span>
                    <span className="price">
                      ¥{(getCurrentPrice() * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 价格阶梯 */}
                <div className="price-levels">
                  <h4>价格阶梯</h4>
                  <Table
                    columns={priceLevelColumns}
                    dataSource={product.priceLevels}
                    pagination={false}
                    size="small"
                    rowKey="minQuantity"
                  />
                </div>

                <Divider />

                {/* 库存信息 */}
                <div className="stock-info">
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="info-item">
                        <span className="label">库存:</span>
                        <span className="value" style={{ color: '#52c41a' }}>
                          {product.stock} {product.unit}
                        </span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="info-item">
                        <span className="label">品牌:</span>
                        <span className="value">{product.brand}</span>
                      </div>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* 规格选择 */}
                {Object.keys(product.specs).length > 0 && (
                  <>
                    <div className="spec-selection">
                      {Object.entries(product.specs).map(([key, values]) => (
                        <div key={key} className="spec-group">
                          <span className="spec-label">
                            {key === 'color' ? '颜色' : '容量'}:
                          </span>
                          <Space>
                            {(values as string[]).map((value) => (
                              <Button
                                key={value}
                                type={selectedSpec[key] === value ? 'primary' : 'default'}
                                onClick={() =>
                                  setSelectedSpec({ ...selectedSpec, [key]: value })
                                }
                              >
                                {value}
                              </Button>
                            ))}
                          </Space>
                        </div>
                      ))}
                    </div>
                    <Divider />
                  </>
                )}

                {/* 采购数量 */}
                <div className="quantity-section">
                  <span className="label">采购数量:</span>
                  <InputNumber
                    min={product.priceLevels[0].minQuantity}
                    max={product.stock}
                    value={quantity}
                    onChange={(val) => setQuantity(val || 1)}
                    addonAfter={product.unit}
                    size="large"
                    style={{ width: 200 }}
                  />
                  <span style={{ marginLeft: 16, color: '#999' }}>
                    起订量: {product.priceLevels[0].minQuantity} {product.unit}
                  </span>
                </div>

                <Divider />

                {/* 操作按钮 */}
                <div className="action-buttons">
                  <Space size="middle" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      style={{ flex: 1 }}
                    >
                      加入购物车
                    </Button>
                    <Button size="large" onClick={handleBuyNow} style={{ flex: 1 }}>
                      立即采购
                    </Button>
                    <Button icon={<HeartOutlined />} size="large">
                      收藏
                    </Button>
                    <Button icon={<ShareAltOutlined />} size="large">
                      分享
                    </Button>
                  </Space>
                </div>

                <Divider />

                {/* 物流信息 */}
                <div className="shipping-info">
                  <h4>
                    <TruckOutlined /> 物流信息
                  </h4>
                  <Row gutter={[16, 8]}>
                    <Col span={12}>
                      <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                      发货地: {product.shipping.from}
                    </Col>
                    <Col span={12}>
                      <TruckOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                      {product.shipping.deliveryTime}
                    </Col>
                    <Col span={12}>运费: {product.shipping.freight}</Col>
                    <Col span={12}>预计到达: {product.shipping.estimatedArrival}</Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>

          {/* 供应商信息卡片 */}
          <Card style={{ marginTop: 24 }} className="supplier-card">
            <Row gutter={24} align="middle">
              <Col>
                <Avatar src={product.supplier.logo} size={80} shape="square" />
              </Col>
              <Col flex="auto">
                <div className="supplier-name">
                  <h3>{product.supplier.name}</h3>
                  {product.supplier.certified && (
                    <Tag icon={<SafetyCertificateOutlined />} color="orange">
                      官方认证
                    </Tag>
                  )}
                </div>
                <Space size="large" style={{ marginTop: 8 }}>
                  <div>
                    <Rate disabled defaultValue={product.supplier.rating} allowHalf />
                    <span style={{ marginLeft: 8 }}>{product.supplier.rating}</span>
                  </div>
                  <Divider type="vertical" />
                  <span>商品数: {product.supplier.productCount}</span>
                  <Divider type="vertical" />
                  <span>
                    <EnvironmentOutlined /> {product.supplier.location}
                  </span>
                </Space>
                <div style={{ marginTop: 8, color: '#666' }}>
                  <Space size="large">
                    <span>响应率: {product.supplier.responseRate}%</span>
                    <span>响应时间: {product.supplier.responseTime}</span>
                  </Space>
                </div>
              </Col>
              <Col>
                <Space direction="vertical">
                  <Button
                    type="primary"
                    icon={<ShopOutlined />}
                    onClick={() => navigate(`/supplier-shop/${product.supplier.id}`)}
                    block
                  >
                    进入店铺
                  </Button>
                  <Button icon={<PhoneOutlined />} onClick={handleContactSupplier} block>
                    联系供应商
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* 商品详情Tabs */}
          <Card style={{ marginTop: 24 }}>
            <Tabs
              defaultActiveKey="detail"
              items={[
                {
                  key: 'detail',
                  label: '商品详情',
                  children: (
                    <div
                      className="product-description"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ),
                },
                {
                  key: 'specs',
                  label: '规格参数',
                  children: (
                    <Table
                      columns={[
                        { title: '参数名称', dataIndex: 'name', key: 'name', width: 200 },
                        { title: '参数值', dataIndex: 'value', key: 'value' },
                      ]}
                      dataSource={product.specifications}
                      pagination={false}
                      rowKey="name"
                      bordered
                    />
                  ),
                },
                {
                  key: 'afterSales',
                  label: '售后保障',
                  children: (
                    <div className="after-sales">
                      <h3>售后服务</h3>
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {product.afterSales.map((item, index) => (
                          <div key={index} className="service-item">
                            <SafetyCertificateOutlined
                              style={{ color: '#52c41a', marginRight: 12, fontSize: 18 }}
                            />
                            <span style={{ fontSize: 16 }}>{item}</span>
                          </div>
                        ))}
                      </Space>
                      <Divider />
                      <h3>退换货政策</h3>
                      <p style={{ lineHeight: 1.8, color: '#666' }}>
                        1. 商品签收后7天内，如有质量问题可申请退换货；
                        <br />
                        2. 退换货商品必须保持原包装完整，不影响二次销售；
                        <br />
                        3. 定制商品不支持退换货；
                        <br />
                        4. 退换货运费由责任方承担。
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </Card>

          {/* 推荐商品 */}
          <Card title="该供应商的其他商品" style={{ marginTop: 24 }}>
            <Row gutter={[16, 16]}>
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Col key={i} xs={24} sm={12} md={6}>
                    <Card
                      hoverable
                      className="recommend-product"
                      cover={
                        <img
                          src={`https://images.unsplash.com/photo-${
                            [
                              '1518770660439-4636190af475',
                              '1581092160562-40aa08e78837',
                              '1572635196237-14b3f281503f',
                              '1484480974693-6ca0a78fb36b',
                            ][i]
                          }?w=300&h=300&fit=crop`}
                          alt={`推荐商品 ${i + 1}`}
                        />
                      }
                      onClick={() => navigate(`/product/${i + 1}`)}
                    >
                      <div className="product-name">
                        工业级{['电子元件', '芯片模块', '传感器', '电阻电容'][i]}
                      </div>
                      <div className="product-price">
                        ¥{(Math.random() * 100 + 10).toFixed(2)}
                      </div>
                      <div className="product-sales">销量: {Math.floor(Math.random() * 5000)}</div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail

