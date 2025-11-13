import { Row, Col, Card, Collapse, Table } from 'antd'
import { CheckCircleOutlined, DollarOutlined, RocketOutlined, SafetyOutlined, ToolOutlined } from '@ant-design/icons'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './index.less'

const { Panel } = Collapse

const LogisticsSolutions = () => {
  // 痛点与解决方案
  const solutions = [
    {
      icon: <DollarOutlined />,
      painPoint: 'High Shipping Costs',
      problem: 'Individual shipping of large items results in extremely high freight costs',
      solution: 'Consolidated Container Shipping',
      details: [
        'Combine multiple orders into full container loads (FCL)',
        'Reduce per-unit ocean freight by up to 60%',
        'Optimize container space utilization',
        'Negotiate better rates with carriers',
      ],
      color: '#ff6600',
    },
    {
      icon: <RocketOutlined />,
      painPoint: 'Slow Delivery Speed',
      problem: 'Cross-border shipping takes 30-60 days, losing competitive advantage',
      solution: 'Pre-positioned Overseas Warehouses',
      details: [
        'Stock inventory in destination countries',
        'Local delivery in 3-5 business days',
        'Same-day dispatch for in-stock items',
        'Real-time inventory visibility',
      ],
      color: '#1890ff',
    },
    {
      icon: <SafetyOutlined />,
      painPoint: 'Damage & Breakage',
      problem: 'Large items are fragile and easily damaged during long-distance transport',
      solution: 'Professional Packaging & Handling',
      details: [
        'Custom packaging for furniture and large items',
        'Reinforced corner protection and cushioning',
        'Standardized loading/unloading procedures',
        'Insurance coverage for high-value items',
      ],
      color: '#52c41a',
    },
    {
      icon: <ToolOutlined />,
      painPoint: 'Installation Challenges',
      problem: 'Customers struggle with assembly of complex furniture and equipment',
      solution: 'White Glove Delivery Service',
      details: [
        'Professional installation team available',
        'Room-of-choice delivery',
        'Assembly and setup included',
        'Packaging removal and disposal',
      ],
      color: '#faad14',
    },
  ]

  // 费用透明化表格
  const pricingColumns = [
    {
      title: 'Service Type',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Pricing Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Example Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  const pricingData = [
    {
      key: '1',
      service: 'Ocean Freight (FCL)',
      model: 'Per Container',
      rate: '$2,500 - $4,500',
      notes: '20ft or 40ft container, port-to-port',
    },
    {
      key: '2',
      service: 'Ocean Freight (LCL)',
      model: 'Per CBM',
      rate: '$45 - $85 / CBM',
      notes: 'Less than container load',
    },
    {
      key: '3',
      service: 'Warehouse Storage',
      model: 'Per Pallet/Month',
      rate: '$15 - $30',
      notes: 'First 90 days free for active sellers',
    },
    {
      key: '4',
      service: 'Local Delivery',
      model: 'Per Shipment',
      rate: '$50 - $200',
      notes: 'Based on distance and item size',
    },
    {
      key: '5',
      service: 'White Glove Service',
      model: 'Per Item',
      rate: '$80 - $300',
      notes: 'Includes assembly and installation',
    },
  ]

  return (
    <div className="logistics-solutions-page">
      <Header />
      
      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Large Item Logistics Solutions</h1>
            <p>Making cross-border shipping of furniture, appliances, and equipment as easy as small parcels</p>
          </div>
        </div>

        {/* 痛点与解决方案 */}
        <div className="solutions-section">
          <h2>Pain Points & Solutions</h2>
          <p className="section-subtitle">We solve the core challenges of large item cross-border trade</p>
          
          <Row gutter={[24, 24]}>
            {solutions.map((item, index) => (
              <Col xs={24} md={12} key={index}>
                <Card className="solution-card" bordered={false}>
                  <div className="solution-header">
                    <div className="solution-icon" style={{ background: item.color }}>
                      {item.icon}
                    </div>
                    <div className="solution-title">
                      <h3>{item.painPoint}</h3>
                      <p className="problem">{item.problem}</p>
                    </div>
                  </div>
                  
                  <div className="solution-body">
                    <div className="solution-label">Our Solution:</div>
                    <h4>{item.solution}</h4>
                    <ul className="solution-details">
                      {item.details.map((detail, idx) => (
                        <li key={idx}>
                          <CheckCircleOutlined style={{ color: item.color }} /> {detail}
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
          <h2>Transparent Pricing</h2>
          <p className="section-subtitle">No hidden fees - know exactly what you'll pay</p>
          
          <Card className="pricing-card">
            <Table
              columns={pricingColumns}
              dataSource={pricingData}
              pagination={false}
              bordered
            />
          </Card>

          <div className="pricing-notes">
            <h4>💡 Cost-Saving Tips:</h4>
            <ul>
              <li>Combine multiple orders to fill a full container and save up to 60% on freight</li>
              <li>Use our overseas warehouses to avoid rush shipping fees</li>
              <li>Plan ahead - sea freight is 5-10x cheaper than air freight</li>
              <li>Optimize packaging to reduce dimensional weight charges</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LogisticsSolutions

