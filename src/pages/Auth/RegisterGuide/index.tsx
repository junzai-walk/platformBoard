import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'antd'
import { ShopOutlined, ShoppingOutlined } from '@ant-design/icons'
import Layout from '@/components/Layout'
import './index.less'

const RegisterGuide = () => {
  return (
    <Layout>
      <div className="register-guide-page">
        <div className="container">
          <h1>选择注册类型</h1>
          <p className="subtitle">请根据您的业务需求选择合适的注册类型</p>

          <Row gutter={32} justify="center" style={{ marginTop: 60 }}>
            <Col xs={24} md={10}>
              <Link to="/supplier-register">
                <Card hoverable className="register-card supplier-card">
                  <ShopOutlined className="card-icon" />
                  <h2>注册为供应商</h2>
                  <p>在平台上销售您的产品</p>
                  <ul>
                    <li>发布和管理商品</li>
                    <li>接收采购订单</li>
                    <li>拓展销售渠道</li>
                    <li>数据分析工具</li>
                  </ul>
                </Card>
              </Link>
            </Col>

            <Col xs={24} md={10}>
              <Link to="/distributor-register">
                <Card hoverable className="register-card distributor-card">
                  <ShoppingOutlined className="card-icon" />
                  <h2>注册为分销商</h2>
                  <p>发现优质货源，采购商品</p>
                  <ul>
                    <li>浏览海量商品</li>
                    <li>批量采购下单</li>
                    <li>订单管理</li>
                    <li>采购数据分析</li>
                  </ul>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterGuide

