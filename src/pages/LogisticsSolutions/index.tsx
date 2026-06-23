import { Row, Col, Card, Table } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLogistics } from '@/hooks/useLogistics'
import './index.less'

const LogisticsSolutions = () => {
  const { solutions, pricingColumns, pricingData, t } = useLogistics()

  return (
    <div className="logistics-solutions-page">
      <Header />
      
      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>{t('logistics.title')}</h1>
            <p>{t('logistics.subtitle')}</p>
          </div>
        </div>

        {/* 痛点与解决方案 */}
        <div className="solutions-section">
          <h2>{t('logistics.painPointsTitle')}</h2>
          <p className="section-subtitle">{t('logistics.painPointsSubtitle')}</p>

          <Row gutter={[24, 24]}>
            {solutions.map((item, index) => (
              <Col xs={24} md={12} key={index}>
                <Card className="solution-card" bordered={false}>
                  <div className="solution-header">
                    <div className="solution-icon" style={{ background: item.color }}>
                      {item.icon}
                    </div>
                    <div className="solution-title">
                      <h3>{t(item.painPointKey)}</h3>
                      <p className="problem">{t(item.problemKey)}</p>
                    </div>
                  </div>

                  <div className="solution-body">
                    <div className="solution-label">{t('logistics.ourSolution')}</div>
                    <h4>{t(item.solutionKey)}</h4>
                    <ul className="solution-details">
                      {item.detailKeys.map((detailKey, idx) => (
                        <li key={idx}>
                          <CheckCircleOutlined style={{ color: item.color }} /> {t(detailKey)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 费用透明化 */}
        <div className="pricing-section">
          <h2>{t('logistics.pricingTitle')}</h2>
          <p className="section-subtitle">{t('logistics.pricingSubtitle')}</p>

          <Card className="pricing-card">
            <Table
              columns={pricingColumns}
              dataSource={pricingData}
              pagination={false}
              bordered
            />
          </Card>

          <div className="pricing-notes">
            <h4>{t('logistics.costSavingTitle')}</h4>
            <ul>
              <li>{t('logistics.costSavingTips.tip1')}</li>
              <li>{t('logistics.costSavingTips.tip2')}</li>
              <li>{t('logistics.costSavingTips.tip3')}</li>
              <li>{t('logistics.costSavingTips.tip4')}</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LogisticsSolutions

