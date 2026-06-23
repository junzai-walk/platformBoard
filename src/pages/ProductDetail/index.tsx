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
  Breadcrumb,
} from 'antd'
import {
  ShoppingCartOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  PhoneOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import Layout from '@/components/Layout'
import { useProductDetail, PriceLevel } from '@/hooks/useProductDetail'
import './index.less'

const ProductDetail = () => {
  const {
    product,
    quantity,
    setQuantity,
    selectedSpec,
    setSelectedSpec,
    currentImage,
    setCurrentImage,
    getCurrentPrice,
    handleAddToCart,
    handleBuyNow,
    handleContactSupplier,
    isFav,
    handleToggleFavorite,
    navigate,
  } = useProductDetail()

  // 价格阶梯表格列
  const priceLevelColumns = [
    {
      title: '起订量',
      dataIndex: 'minQuantity',
      key: 'minQuantity',
      render: (min: number, record: PriceLevel) =>
        record.maxQuantity
          ? `${min} - ${record.maxQuantity} ${product.unit}`
          : `${min} ${product.unit}以上`,
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

  // 动态解析多段面包屑
  const categoryItems = product.category.split(' > ').map((catName) => ({
    title: catName,
  }))

  const breadcrumbItems = [
    { title: '首页', href: '/' },
    ...categoryItems,
    { title: product.name },
  ]

  return (
    <Layout>
      <div className="product-detail-page">
        <div className="container">
          {/* 面包屑导航 - 跟随商品动态匹配 */}
          <Breadcrumb style={{ marginBottom: 24 }} items={breadcrumbItems} />

          {/* 商品主要信息 */}
          <Row gutter={24}>
            {/* 左侧：商品图片轮播组 */}
            <Col xs={24} md={10}>
              <Card className="image-gallery">
                <Image.PreviewGroup>
                  <Image
                    src={product.images[currentImage]}
                    alt={product.name}
                    style={{ borderRadius: 12, width: '100%', objectFit: 'cover' }}
                  />
                </Image.PreviewGroup>
                <div className="image-thumbnails">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${index === currentImage ? 'active' : ''}`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <img src={img} alt={`${product.name} 缩略图 ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 右侧：商品下单交易与规格面板 */}
            <Col xs={24} md={14}>
              <Card>
                <div className="product-header">
                  <h1 className="product-title">{product.name}</h1>
                  <Space wrap>
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
                    <span>销量: {product.sales.toLocaleString()}</span>
                    <Divider type="vertical" />
                    <span>评价: {product.reviews.toLocaleString()}</span>
                  </Space>
                </div>

                <Divider />

                {/* 价格与总额估算看板 */}
                <div className="price-section">
                  <div className="current-price">
                    <span className="label">当前单价:</span>
                    <span className="price">¥{getCurrentPrice().toFixed(2)}</span>
                    <span className="unit">/{product.unit}</span>
                  </div>
                  <div className="total-price">
                    <span className="label">预计货款总额:</span>
                    <span className="price">
                      ¥{(getCurrentPrice() * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 阶梯优惠定价 */}
                <div className="price-levels">
                  <h4>批发梯度定价</h4>
                  <Table
                    columns={priceLevelColumns}
                    dataSource={product.priceLevels}
                    pagination={false}
                    size="small"
                    rowKey="minQuantity"
                  />
                </div>

                <Divider />

                {/* 品牌与库存基础状态 */}
                <div className="stock-info">
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="info-item">
                        <span className="label">现货库存:</span>
                        <span className="value" style={{ color: '#52c41a' }}>
                          {product.stock.toLocaleString()} {product.unit}
                        </span>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="info-item">
                        <span className="label">品牌/厂标:</span>
                        <span className="value">{product.brand}</span>
                      </div>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* 动态规格选择 */}
                {Object.keys(product.specs).length > 0 && (
                  <>
                    <div className="spec-selection">
                      {Object.entries(product.specs).map(([key, values]) => (
                        <div key={key} className="spec-group" style={{ marginBottom: 12 }}>
                          <span className="spec-label" style={{ fontWeight: 500 }}>
                            {key === 'color' ? '颜色款式' : (key === 'size' ? '规格尺寸' : (key === 'thickness' ? '纸张厚度' : key))}:
                          </span>
                          <Space wrap>
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

                {/* 采购起订量与数量控制 */}
                <div className="quantity-section">
                  <span className="label">采购数量:</span>
                  <InputNumber
                    min={product.priceLevels[0].minQuantity}
                    max={product.stock}
                    value={quantity}
                    onChange={(val) => setQuantity(val || product.priceLevels[0].minQuantity)}
                    addonAfter={product.unit}
                    size="large"
                    style={{ width: 220 }}
                  />
                  <span style={{ marginLeft: 16, color: '#999' }}>
                    本款最低起订: {product.priceLevels[0].minQuantity} {product.unit}
                  </span>
                </div>

                <Divider />

                {/* B2B 核心行动点 */}
                <div className="action-buttons">
                  <Space size="middle" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      style={{ flex: 1 }}
                    >
                      加入采购清单
                    </Button>
                    <Button size="large" onClick={handleBuyNow} style={{ flex: 1 }}>
                      立即订购
                    </Button>
                    <Button 
                      icon={isFav ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />} 
                      size="large"
                      onClick={handleToggleFavorite}
                    >
                      {isFav ? '已收藏' : '收藏'}
                    </Button>
                    <Button icon={<ShareAltOutlined />} size="large">
                      分享
                    </Button>
                  </Space>
                </div>

                <Divider />

                {/* 基础物流保障信息 */}
                <div className="shipping-info">
                  <h4>
                    <TruckOutlined /> 交付与尾程物流
                  </h4>
                  <Row gutter={[16, 12]}>
                    <Col span={12}>
                      <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                      起运发货地: {product.shipping.from}
                    </Col>
                    <Col span={12}>
                      <TruckOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                      预计时效: {product.shipping.deliveryTime}
                    </Col>
                    <Col span={24}>
                      <strong>头程/尾程运费:</strong> {product.shipping.freight}
                    </Col>
                    <Col span={24}>
                      <strong>交货预计送达:</strong> {product.shipping.estimatedArrival}
                    </Col>
                  </Row>

                  {/* 大件商品增值白手套送装服务高亮 Banner */}
                  {product.isLargeItem && (
                    <div className="large-item-service-banner">
                      <div className="banner-title">
                        <GiftOutlined /> 大件专享「送装一体白手套服务」
                      </div>
                      <p>
                        本件为大规格商品，支持我们自营的前置海外仓本地发货。尾程提供：<strong>送货上楼 + 入户拆包 + 专业组装 + 包装废弃物清理</strong>的一站式全链路尊享交付服务，免除买家自行拼装难题。
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          {/* 供应商信用与实力卡片 */}
          <Card style={{ marginTop: 24 }} className="supplier-card">
            <Row gutter={24} align="middle" justify="space-between">
              <Col xs={24} md={18}>
                <Row gutter={24} align="middle">
                  <Col>
                    <Avatar src={product.supplier.logo} size={80} shape="square" />
                  </Col>
                  <Col>
                    <div className="supplier-name" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <h3 style={{ margin: 0 }}>{product.supplier.name}</h3>
                      {product.supplier.certified && (
                        <Tag icon={<SafetyCertificateOutlined />} color="orange">
                          源头验真企业
                        </Tag>
                      )}
                    </div>
                    <Space size="large" style={{ marginTop: 8 }} wrap>
                      <div>
                        供应商评分: <Rate disabled defaultValue={product.supplier.rating} allowHalf />
                        <span style={{ marginLeft: 8 }}>{product.supplier.rating}</span>
                      </div>
                      <Divider type="vertical" />
                      <span>在售商品: {product.supplier.productCount}款</span>
                      <Divider type="vertical" />
                      <span>
                        <EnvironmentOutlined /> {product.supplier.location}
                      </span>
                    </Space>
                    <div style={{ marginTop: 8, color: '#666' }}>
                      <Space size="large">
                        <span>平均询盘响应率: {product.supplier.responseRate}%</span>
                        <span>平均响应时效: {product.supplier.responseTime}</span>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={6} style={{ textAlign: 'right', marginTop: 12 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    icon={<ShopOutlined />}
                    onClick={() => navigate(`/supplier-shop/${product.supplier.id}`)}
                    block
                  >
                    进入商家店铺
                  </Button>
                  <Button icon={<PhoneOutlined />} onClick={handleContactSupplier} block>
                    联系在线客服/代表
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* 详情与参数折叠选项卡 */}
          <Card style={{ marginTop: 24 }}>
            <Tabs
              defaultActiveKey="detail"
              items={[
                {
                  key: 'detail',
                  label: '图文详情说明',
                  children: (
                    <div
                      className="product-description"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  ),
                },
                {
                  key: 'specs',
                  label: '规格性能参数',
                  children: (
                    <Table
                      columns={[
                        { title: '参数名称', dataIndex: 'name', key: 'name', width: 250 },
                        { title: '测量参数值/执行标准', dataIndex: 'value', key: 'value' },
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
                  label: '平台售后保障',
                  children: (
                    <div className="after-sales">
                      <h3>售后承诺</h3>
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
                      <h3>大宗/大件特殊退换货政策说明</h3>
                      <p style={{ lineHeight: 1.8, color: '#666' }}>
                        1. <strong>常规包装商品</strong>：签收后7天内，如因质量问题可支持无理由退换货，运费由发货方承担。<br />
                        2. <strong>大件定制或打木架商品</strong>：除非运输发生破损导致不可用（已投保全程货运破损险），否则一旦起运不支持中途截回或无故退货。如发生破损，平台将协助大件海外仓快速换新或上门修缮。<br />
                        3. <strong>非质量退货</strong>：买家需自行联系大件托运渠道，并承担退回到对应大件前置海外仓的全部双程运费与包装恢复费。
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </Card>

          {/* 关联商品推荐 */}
          <Card title="该供应商的其它精选货源推荐" style={{ marginTop: 24 }}>
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
                          alt={`推荐商品图片 ${i + 1}`}
                        />
                      }
                      onClick={() => navigate(`/product/${i + 1}`)}
                    >
                      <div className="product-name">
                        B2B供货{['智能电控核心', '精工耐磨传动', '原厂级传感器', '专业耗材组件'][i]}
                      </div>
                      <div className="product-price">
                        ¥{(Math.random() * 150 + 45).toFixed(2)}
                      </div>
                      <div className="product-sales">近期出货量: {Math.floor(Math.random() * 3000 + 500)}</div>
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
