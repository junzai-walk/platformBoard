import { Card, Row, Col } from 'antd'
import { ShopOutlined, TeamOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import './index.less'

const LoginGuide = () => {
  return (
    <Layout>
      <div className="login-guide-page">
        <div className="guide-container">
          <h1 className="guide-title">选择登录方式</h1>
          <p className="guide-subtitle">请选择您的账户类型进行登录</p>

          <Row gutter={[32, 32]} justify="center" style={{ marginTop: 60 }}>
            <Col xs={24} sm={12} md={10} lg={8}>
              <Link to="/supplier-login">
                <Card
                  hoverable
                  className="role-card supplier-card"
                  cover={
                    <div className="card-icon">
                      <ShopOutlined />
                    </div>
                  }
                >
                  <Card.Meta
                    title={<h2>供应商登录</h2>}
                    description={
                      <div className="card-description">
                        <p>我是供应商，提供商品和服务</p>
                        <ul>
                          <li>发布商品信息</li>
                          <li>管理订单和库存</li>
                          <li>查看销售数据</li>
                          <li>店铺运营管理</li>
                        </ul>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} md={10} lg={8}>
              <Link to="/distributor-login">
                <Card
                  hoverable
                  className="role-card distributor-card"
                  cover={
                    <div className="card-icon">
                      <TeamOutlined />
                    </div>
                  }
                >
                  <Card.Meta
                    title={<h2>分销商登录</h2>}
                    description={
                      <div className="card-description">
                        <p>我是分销商，采购商品进行销售</p>
                        <ul>
                          <li>浏览采购商品</li>
                          <li>管理采购订单</li>
                          <li>查看采购数据</li>
                          <li>供应商管理</li>
                        </ul>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </Col>
          </Row>

          <div className="guide-footer">
            <p>
              还没有账号？
              <Link to="/register-guide" className="link-primary">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginGuide

