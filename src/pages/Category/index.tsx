import Layout from '@/components/Layout'
import { Row, Col, Card, Select, Checkbox, Slider } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.less'

const { Meta } = Card

const CategoryPage = () => {
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
    name: `商品名称 ${i + 1}`,
    image: productImages[i],
    price: '¥10.00 - ¥50.00',
    moq: '100件',
    sales: 5000,
  }))

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
                  <AppstoreOutlined />
                  <BarsOutlined />
                </div>
              </div>
              <Row gutter={[16, 16]}>
                {products.map((product) => (
                  <Col key={product.id} xs={24} sm={12} md={8}>
                    <Link to={`/product/${product.id}`}>
                      <Card hoverable cover={<img alt={product.name} src={product.image} />}>
                        <Meta title={product.name} description={
                          <div>
                            <div className="price">{product.price}</div>
                            <div>起订: {product.moq}</div>
                            <div>已售: {product.sales}</div>
                          </div>
                        } />
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryPage

