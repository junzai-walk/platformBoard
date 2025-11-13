import { Row, Col, Card, Table } from 'antd'
import { CheckCircleOutlined, DollarOutlined, RocketOutlined, SafetyOutlined, ToolOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './index.less'

const LogisticsSolutions = () => {
  const { t } = useTranslation()
  // 痛点与解决方案
  const solutions = [
    {
      icon: <DollarOutlined />,
      painPointKey: 'logistics.painPoints.highCost',
      problemKey: 'logistics.problems.highCost',
      solutionKey: 'logistics.solutions.consolidation',
      detailKeys: [
        'logistics.solutionDetails.consolidation1',
        'logistics.solutionDetails.consolidation2',
        'logistics.solutionDetails.consolidation3',
        'logistics.solutionDetails.consolidation4',
      ],
      color: '#ff6600',
    },
    {
      icon: <RocketOutlined />,
      painPointKey: 'logistics.painPoints.slowSpeed',
      problemKey: 'logistics.problems.slowSpeed',
      solutionKey: 'logistics.solutions.warehouse',
      detailKeys: [
        'logistics.solutionDetails.warehouse1',
        'logistics.solutionDetails.warehouse2',
        'logistics.solutionDetails.warehouse3',
        'logistics.solutionDetails.warehouse4',
      ],
      color: '#1890ff',
    },
    {
      icon: <SafetyOutlined />,
      painPointKey: 'logistics.painPoints.damage',
      problemKey: 'logistics.problems.damage',
      solutionKey: 'logistics.solutions.packaging',
      detailKeys: [
        'logistics.solutionDetails.packaging1',
        'logistics.solutionDetails.packaging2',
        'logistics.solutionDetails.packaging3',
        'logistics.solutionDetails.packaging4',
      ],
      color: '#52c41a',
    },
    {
      icon: <ToolOutlined />,
      painPointKey: 'logistics.painPoints.installation',
      problemKey: 'logistics.problems.installation',
      solutionKey: 'logistics.solutions.whiteGlove',
      detailKeys: [
        'logistics.solutionDetails.whiteGlove1',
        'logistics.solutionDetails.whiteGlove2',
        'logistics.solutionDetails.whiteGlove3',
        'logistics.solutionDetails.whiteGlove4',
      ],
      color: '#faad14',
    },
  ]

  // 费用透明化表格
  const pricingColumns = [
    {
      title: t('logistics.pricingTable.serviceType'),
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: t('logistics.pricingTable.pricingModel'),
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: t('logistics.pricingTable.exampleRate'),
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: t('logistics.pricingTable.notes'),
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  const pricingData = [
    {
      key: '1',
      service: t('logistics.pricingTable.oceanFCL'),
      model: t('logistics.pricingTable.perContainer'),
      rate: '$2,500 - $4,500',
      notes: t('logistics.pricingTable.fclNote'),
    },
    {
      key: '2',
      service: t('logistics.pricingTable.oceanLCL'),
      model: t('logistics.pricingTable.perCBM'),
      rate: '$45 - $85 / CBM',
      notes: t('logistics.pricingTable.lclNote'),
    },
    {
      key: '3',
      service: t('logistics.pricingTable.storage'),
      model: t('logistics.pricingTable.perPallet'),
      rate: '$15 - $30',
      notes: t('logistics.pricingTable.storageNote'),
    },
    {
      key: '4',
      service: t('logistics.pricingTable.delivery'),
      model: t('logistics.pricingTable.perShipment'),
      rate: '$50 - $200',
      notes: t('logistics.pricingTable.deliveryNote'),
    },
    {
      key: '5',
      service: t('logistics.pricingTable.whiteGlove'),
      model: t('logistics.pricingTable.perItem'),
      rate: '$80 - $300',
      notes: t('logistics.pricingTable.whiteGloveNote'),
    },
  ]

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

