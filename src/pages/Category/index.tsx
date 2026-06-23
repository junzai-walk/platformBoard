import Layout from '@/components/Layout'
import { Row, Col, Card, Select, Checkbox, Slider } from 'antd'
import { AppstoreOutlined, BarsOutlined, BuildOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'
import './index.less'

const { Meta } = Card

const CategoryPage = () => {
  const {
    viewMode,
    setViewMode,
    products,
    columns,
    getImageHeight
  } = useCategoryProducts()

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
