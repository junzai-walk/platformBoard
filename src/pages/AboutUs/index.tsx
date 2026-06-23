import Layout from '@/components/Layout'
import { Card, Row, Col, Statistic, Timeline } from 'antd'
import {
  GlobalOutlined,
  SafetyCertificateOutlined,
  DollarCircleOutlined,
  CustomerServiceOutlined,
  CrownOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import './index.less'

const AboutUs = () => {
  const stats = [
    { title: '自营海外仓仓储', value: 600000, suffix: ' sq ft', color: '#ff6600' },
    { title: '全球入驻商户', value: 50000, suffix: ' 家 +', color: '#1890ff' },
    { title: '累计保驾交易额', value: 10, suffix: ' 亿元 +', color: '#52c41a' },
    { title: '全周期售后保障', value: 365, suffix: ' 天', color: '#722ed1' },
  ]

  const advantages = [
    {
      icon: <SafetyCertificateOutlined />,
      title: '源头工厂直货验真',
      desc: '资深贸易专家驻点各地核心产业带，实施严苛的实地厂检与三证合规审查，从根源上保障货源的真实可靠与稳定供应。',
      color: '#ff6600',
    },
    {
      icon: <GlobalOutlined />,
      title: '全球仓配一揽解决',
      desc: '深度集成欧、美、日等多国本地清关网络与自营海外仓，提供从国内头程收货、双清到港、一站发货的全链路仓配闭环。',
      color: '#1890ff',
    },
    {
      icon: <DollarCircleOutlined />,
      title: '数字款项双向担保',
      desc: '专设大额国际交易安全隔离账户，全程根据“发货出仓-海上运输-港口妥投”等履约节点按比例结算，消除跨国贸易信任鸿沟。',
      color: '#52c41a',
    },
    {
      icon: <CustomerServiceOutlined />,
      title: '365天管家级服务',
      desc: '特设大客户专线，全周期协助解决大宗货件的海关查验、境外税务合规申报、跨境结汇退税等后勤保障难题，免除后顾之忧。',
      color: '#722ed1',
    },
  ]

  return (
    <Layout>
      <div className="about-us-page">
        {/* Banner Section */}
        <section className="about-hero">
          <div className="container">
            <h1 className="hero-title animate-fade-in-up">关于我们</h1>
            <p className="hero-subtitle animate-fade-in-up delay-1">
              链接源头中国制造与全球零售网络，为大件商品与工业品搭建极速出海的高效通道
            </p>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="about-story section">
          <div className="container">
            <Row gutter={[48, 24]} align="middle">
              <Col xs={24} lg={12}>
                <div className="story-content">
                  <div className="section-header">
                    <span className="section-tag">我们的起源</span>
                    <h2 className="section-title">打破跨国交易的信任壁垒</h2>
                  </div>
                  <p className="story-p">
                    我们创立于对跨境产业互联网的深刻观察：中国拥有世界上最完整且高品质的工业品、大件家居源头生产基地，而海外无数中小分销商、零售商对这类货源的需求日益剧增。
                  </p>
                  <p className="story-p">
                    然而，因物理距离、结算安全和末端物流壁垒，跨国大宗交易的信息鸿沟难以逾越。我们致力于通过纯数字化的撮合网络、严格的工厂实勘体系以及全球分布的智能海外仓网，彻底打通物流、合规与资金保障，真正让跨境批发像本地采购一样简单透明。
                  </p>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="story-image">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                    alt="Our team working together"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Milestone Statistics Section */}
        <section className="about-stats section">
          <div className="container">
            <Row gutter={[24, 24]}>
              {stats.map((stat, idx) => (
                <Col xs={12} md={6} key={idx}>
                  <Card className="stat-card" bordered={false}>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{ color: stat.color, fontWeight: 800, fontSize: 28 }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Core Advantages Section */}
        <section className="about-advantages section">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">核心保障</span>
              <h2 className="section-title">大额跨境采购的坚实后盾</h2>
              <p className="section-subtitle">
                我们不仅仅是撮合交易的平台，更是深耕跨境物流、品控和交易结算的供应链解决方案商
              </p>
            </div>

            <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
              {advantages.map((adv, idx) => (
                <Col xs={24} sm={24} md={12} key={idx}>
                  <Card className="advantage-card-about" bordered={false}>
                    <div className="adv-icon" style={{ color: adv.color, background: `${adv.color}10` }}>
                      {adv.icon}
                    </div>
                    <div className="adv-content">
                      <h3>{adv.title}</h3>
                      <p>{adv.desc}</p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Journey/Timeline Section */}
        <section className="about-timeline section">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">发展历程</span>
              <h2 className="section-title">我们的成长足迹</h2>
            </div>
            
            <div className="timeline-container" style={{ marginTop: 50 }}>
              <Timeline mode="alternate">
                <Timeline.Item dot={<RocketOutlined style={{ fontSize: 18 }} />} color="#ff6600">
                  <div className="timeline-card">
                    <h4>2026 年（全面智能升级）</h4>
                    <p>平台完成 3.0 系统重构，首创极速响应的动态瀑布流布局与 hooks 微服务架构体系，全面降本提速交易交互流程。</p>
                  </div>
                </Timeline.Item>
                <Timeline.Item>
                  <div className="timeline-card">
                    <h4>2025 年（自营仓储网扩张）</h4>
                    <p>自营美国西海岸仓、东海岸仓以及欧洲汉堡仓全面投入运行，总存储容积突破 60 万平方英尺，配送时效提速至 3-5 天。</p>
                  </div>
                </Timeline.Item>
                <Timeline.Item>
                  <div className="timeline-card">
                    <h4>2024 年（交易保障落地）</h4>
                    <p>联合国际金融机构推出数字化一站式采购担保系统，平台年担保交易总额正式跨过 10 亿元大关。</p>
                  </div>
                </Timeline.Item>
                <Timeline.Item dot={<CrownOutlined style={{ fontSize: 18 }} />} color="#2f54eb">
                  <div className="timeline-card">
                    <h4>2023 年（平台扬帆起航）</h4>
                    <p>跨境B2B撮合平台 1.0 正式上线，首批吸引全国各大产业带源头 2000 家实力工厂进驻开店。</p>
                  </div>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutUs
