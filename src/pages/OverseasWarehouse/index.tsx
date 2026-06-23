import { Row, Col, Card, Statistic } from 'antd'
import ReactECharts from 'echarts-for-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useOverseasWarehouse } from '@/hooks/useOverseasWarehouse'
import './index.less'

const OverseasWarehouse = () => {
  const { warehouseData, mapOption, t } = useOverseasWarehouse()

  return (
    <div className="overseas-warehouse-page">
      <Header />
      
      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>{t('warehouse.title')}</h1>
            <p>{t('warehouse.subtitle')}</p>
          </div>
        </div>

        {/* 核心数据看板 */}
        <div className="stats-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.countriesCovered')}
                  value={6}
                  valueStyle={{ color: '#ff6600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.totalArea')}
                  value="610,000"
                  suffix="sq ft"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.dailyOrders')}
                  value="10,600"
                  suffix="+"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.avgDelivery')}
                  value="3-5"
                  suffix={t('warehouse.days')}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* 全球仓储网络地图 */}
        <div className="map-section">
          <h2>{t('warehouse.mapTitle')}</h2>
          <p className="section-subtitle">{t('warehouse.mapSubtitle')}</p>
          <Card className="map-card">
            <ReactECharts option={mapOption} style={{ height: 500 }} />
          </Card>
        </div>

        {/* 仓库详情列表 */}
        <div className="warehouse-list-section">
          <h2>{t('warehouse.warehouseDetails')}</h2>
          <Row gutter={[24, 24]}>
            {warehouseData.map((warehouse) => (
              <Col xs={24} md={12} lg={8} key={warehouse.id}>
                <Card
                  hoverable
                  className="warehouse-card"
                  cover={
                    <div className="warehouse-image">
                      <img alt={t(warehouse.nameKey)} src={warehouse.image} />
                      <div className="warehouse-badge">{warehouse.dailyOrders} {t('warehouse.dailyOrdersBadge')}</div>
                    </div>
                  }
                >
                  <Card.Meta
                    title={t(warehouse.nameKey)}
                    description={
                      <div className="warehouse-info">
                        <p className="location"><strong>Location:</strong> {t(warehouse.locationKey)}</p>
                        <div className="specs">
                          <span><strong>Area:</strong> {warehouse.area}</span>
                          <span><strong>Capacity:</strong> {warehouse.capacity}</span>
                        </div>
                        <div className="services">
                          <strong>{t('warehouse.services')}:</strong>
                          <ul>
                            {warehouse.serviceKeys.map((serviceKey, idx) => (
                              <li key={idx}>{t(serviceKey)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 入驻流程 */}
        <div className="onboarding-section">
          <h2>{t('warehouse.onboardingTitle')}</h2>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">1</div>
                <h3>{t('warehouse.step1Title')}</h3>
                <p>{t('warehouse.step1Desc')}</p>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">2</div>
                <h3>{t('warehouse.step2Title')}</h3>
                <p>{t('warehouse.step2Desc')}</p>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">3</div>
                <h3>{t('warehouse.step3Title')}</h3>
                <p>{t('warehouse.step3Desc')}</p>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">4</div>
                <h3>{t('warehouse.step4Title')}</h3>
                <p>{t('warehouse.step4Desc')}</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OverseasWarehouse

