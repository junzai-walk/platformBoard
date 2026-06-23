import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Row, Col, Card, Select, Checkbox, Slider } from 'antd'
import { AppstoreOutlined, BarsOutlined, BuildOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.less'

const { Meta } = Card

const CategoryPage = () => {
  const [viewMode, setViewMode] = useState<'masonry' | 'grid' | 'list'>('masonry')

  const productImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1593642532400-2682810df593?w=300&h=300&fit=crop',
  ]

  const products = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    name: `高端优质 B2B 商品 ${i + 1}`,
    image: productImages[i],
    price: `¥${((i + 1) * 15).toFixed(2)} - ¥${((i + 1) * 45).toFixed(2)}`,
    moq: `${(i + 1) * 50}件`,
    sales: 1200 + i * 350,
    description: i % 2 === 0 
      ? '该产品支持大批量采购，由实力厂家直接发货，品质层层把关，售后有保障。'
      : '精选优质原材料，融合现代工艺制作，符合多项国际标准，是您采购的最佳选择。',
    tags: i % 3 === 0 ? ['实力商家', '免邮送达'] : (i % 3 === 1 ? ['极速发货'] : ['海外仓直邮', '限时特惠'])
  }))

  const getImageHeight = (id: number) => {
    const heights = [200, 270, 190, 310, 230, 260]
    return heights[id % heights.length]
  }

  // Detect responsive columns for products
  const [columnsCount, setColumnsCount] = useState(3)
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width > 992) setColumnsCount(3)
      else if (width > 576) setColumnsCount(2)
      else setColumnsCount(1)
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Distribute items to columns left-to-right (round-robin)
  const columns = Array.from({ length: columnsCount }, (): any[] => [])
  products.forEach((product, index) => {
    columns[index % columnsCount].push(product)
  })

  return (
    <Layout>
      <div className="category-page">
        <div className="container">
          <Row gutter={24}>
            <Col xs={24} md={6}>
              <div className="filter-sidebar">
                <h3>筛选条件</h3>
                <div className="filter-section">
                  <h4>价格区间</h4>
                  <Slider range defaultValue={[0, 100]} />
                </div>
                <div className="filter-section">
                  <h4>最小起订量</h4>
                  <Checkbox.Group>
                    <Checkbox value="1">1-100件</Checkbox>
                    <Checkbox value="2">100-500件</Checkbox>
                    <Checkbox value="3">500+件</Checkbox>
                  </Checkbox.Group>
                </div>
                <div className="filter-section">
                  <h4>供应商等级</h4>
                  <Checkbox.Group>
                    <Checkbox value="1">实力商家</Checkbox>
                    <Checkbox value="2">诚信通</Checkbox>
                  </Checkbox.Group>
                </div>
              </div>
            </Col>
            <Col xs={24} md={18}>
              <div className="product-list-header">
                <div className="sort-options">
                  <Select defaultValue="default" style={{ width: 120 }}>
                    <Select.Option value="default">综合排序</Select.Option>
                    <Select.Option value="sales">销量优先</Select.Option>
                    <Select.Option value="price-asc">价格从低到高</Select.Option>
                    <Select.Option value="price-desc">价格从高到低</Select.Option>
                  </Select>
                </div>
                <div className="view-toggle">
                  <span 
                    className={`toggle-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                    onClick={() => setViewMode('masonry')}
                    title="瀑布流视图"
                  >
                    <BuildOutlined />
                  </span>
                  <span 
                    className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="网格视图"
                  >
                    <AppstoreOutlined />
                  </span>
                  <span 
                    className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="列表视图"
                  >
                    <BarsOutlined />
                  </span>
                </div>
              </div>

              {viewMode === 'masonry' && (
                <div className="products-masonry">
                  {columns.map((columnItems, colIdx) => (
                    <div key={colIdx} className="products-masonry-col">
                      {columnItems.map((product, index) => {
                        const imageHeight = getImageHeight(product.id)
                        return (
                          <div 
                            key={product.id} 
                            className="product-masonry-item animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <Link to={`/product/${product.id}`}>
                              <Card hoverable className="premium-product-card">
                                <div className="product-image-container" style={{ height: imageHeight }}>
                                  <img alt={product.name} src={product.image} className="product-image" />
                                  <div className="product-image-overlay"></div>
                                </div>
                                <div className="product-card-content">
                                  <h4 className="product-title">{product.name}</h4>
                                  <p className="product-desc">{product.description}</p>
                                  <div className="product-price">{product.price}</div>
                                  <div className="product-meta-row">
                                    <span className="moq">起订: {product.moq}</span>
                                    <span className="sales">已售: {product.sales.toLocaleString()}</span>
                                  </div>
                                  <div className="product-tags">
                                    {product.tags.map((tag: string, idx: number) => (
                                      <span key={idx} className="product-tag">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </Card>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'grid' && (
                <Row gutter={[16, 16]}>
                  {products.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8}>
                      <Link to={`/product/${product.id}`}>
                        <Card hoverable cover={<img alt={product.name} src={product.image} />}>
                          <Meta title={product.name} description={
                            <div>
                              <div className="price">{product.price}</div>
                              <div>起订: {product.moq}</div>
                              <div>已售: {product.sales.toLocaleString()}</div>
                            </div>
                          } />
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              )}

              {viewMode === 'list' && (
                <div className="products-list-view">
                  {products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="list-product-item-link">
                      <Card hoverable className="list-product-card">
                        <div className="list-card-inner">
                          <div className="list-image-container">
                            <img alt={product.name} src={product.image} />
                          </div>
                          <div className="list-info-container">
                            <h4 className="list-product-title">{product.name}</h4>
                            <p className="list-product-desc">{product.description}</p>
                            <div className="list-price">{product.price}</div>
                            <div className="list-meta-row">
                              <span>最小起订: {product.moq}</span>
                              <span>销量: {product.sales.toLocaleString()}</span>
                            </div>
                            <div className="product-tags">
                              {product.tags.map((tag: string, idx: number) => (
                                <span key={idx} className="product-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage

