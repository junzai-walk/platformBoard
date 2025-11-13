import Layout from '@/components/Layout'
import { Card, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

const SearchResults = () => {
  const productImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
  ]

  return (
    <Layout>
      <div className="container" style={{ padding: '24px 0' }}>
        <h2>搜索结果</h2>
        <Row gutter={[16, 16]}>
          {Array(8).fill(null).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={6}>
              <Link to={`/product/${i + 1}`}>
                <Card hoverable cover={<img alt="product" src={productImages[i]} />}>
                  <Card.Meta title={`商品 ${i + 1}`} description="¥10.00 - ¥50.00" />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  )
}

export default SearchResults

