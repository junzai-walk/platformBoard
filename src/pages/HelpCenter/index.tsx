import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, Collapse, Tabs, Input, Row, Col } from 'antd'
import { 
  SearchOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  MessageOutlined,
  BookOutlined,
  CrownOutlined,
  FileProtectOutlined,
  CarOutlined
} from '@ant-design/icons'
import './index.less'

const HelpCenter = () => {
  const [searchText, setSearchText] = useState('')

  const faqData = [
    {
      category: 'getting-started',
      label: '新手指南',
      icon: <BookOutlined />,
      items: [
        {
          key: 'gs-1',
          question: '如何注册成为分销商进行采购？',
          answer: '非常简单！您只需点击网页右上角的【注册】按钮，选择注册类型为“分销商”，填写您的采购企业资质与主营品类即可。我们提供完全免费的账号注册服务，注册成功后系统将为您自动指派一位专属的采购对接经理，帮您开启全球货源直采通道。'
        },
        {
          key: 'gs-2',
          question: '下单采购的具体流程是什么样的？',
          answer: '您可以直接浏览商品分类，将心仪的商品规格及对应采购量选择后，点击“加入采购车”或“立即采购”进入结算。如需批量起订或者对运费有异议，建议您点击商品页右侧的“联系商家”或“发起询价(RFQ)”，向供应商提交您的目标价格，获取大宗批发专属的折扣方案。'
        }
      ]
    },
    {
      category: 'merchant-entry',
      label: '商家入驻',
      icon: <CrownOutlined />,
      items: [
        {
          key: 'me-1',
          question: '如何入驻成为平台供应商？',
          answer: '准备好您合法的企业营业执照、以及相关的行业资质证书（如大件产品或工业品所必需的检验合格证），点击页面右上方的【供应商入驻】入口填写申请。提交后，我们的招商服务代表会在 1 个工作日内进行资质终审并致电联系您，协助开通店铺、完成首批商品的发布上架。入驻全程平台均不加收任何隐藏中介费用。'
        },
        {
          key: 'me-2',
          question: '入驻供应商需要交纳保证金吗？',
          answer: '为了降低企业商户的启动门槛，目前平台采用“零保证金，按交易佣金抽成”的招商政策。仅当平台线上交易成交并确认收货后，系统才会按照对应的品类比例扣取少量交易佣金。有关年费优惠及各类服务费返还政策，您可以联系您的招商经理获取详细说明手册。'
        }
      ]
    },
    {
      category: 'payment',
      label: '交易与支付',
      icon: <FileProtectOutlined />,
      items: [
        {
          key: 'pay-1',
          question: '平台如何保证大额跨境交易的资金安全？',
          answer: '平台引入了独创的“数字信用交易担保服务”。分销商下单支付的款项将首先进入平台设立的第三方专用监管账户进行隔离托管。当国内发货出海、港口装卸或分销商确认收到货品妥投后，系统才会分批次给商家结算。该机制完全防范了跨国贸易中“付款不发货，收货不付款”的信任难题。'
        },
        {
          key: 'pay-2',
          question: '目前支持哪些主流的收付款方式？',
          answer: '为了方便全球B2B结算，我们支持全渠道的多元支付：包括网联跨境转账、外贸信用卡、银行电汇(T/T)、信用证(L/C)，以及支付宝和微信支付等便捷支付手段。分销商也可以在额度评级合格后，向平台申请“延期结汇账期（O/A）”，缓解短期流动资金占用压力。'
        }
      ]
    },
    {
      category: 'logistics',
      label: '仓储与物流',
      icon: <CarOutlined />,
      items: [
        {
          key: 'log-1',
          question: '海外仓派送和国内直发有什么区别？时效有多快？',
          answer: '凡是带有“海外仓直寄”标识的商品，皆已由供应商提前备货在对应的本地海外仓（如美国新泽西仓、洛杉矶仓、德国汉堡仓等）。分销商下单后，海外仓会在24小时内闪发出库，本地快递派送一般仅需 3-5 天即可安全妥投；而由国内生产基地直发的大宗货物，则支持整箱/拼箱海运多式联运，整体海运专线时效大约为 15-25 天。'
        },
        {
          key: 'log-2',
          question: '如果大宗货物在海运或妥投时发生破损，该如何退款或售后？',
          answer: '大宗跨境货运路途遥远，我们强烈建议分销商在海外仓快递送达或到港提货时，当场开箱查验并拍摄核验视频。如发现严重货损、少件或不符，请立即在 7 天内登录“分销商后台 - 售后管理”提交退款/补发申请。我们专属的售后团队会为您启动平台保理先行赔付通道，由海外自营仓为您最快速度补发新品，并同步向承运物流商追究索赔。'
        }
      ]
    }
  ]

  const getFilteredItems = (items: typeof faqData[0]['items']) => {
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchText.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  const tabItems = faqData.map((category) => {
    const filteredList = getFilteredItems(category.items)
    
    return {
      key: category.category,
      label: (
        <span>
          {category.icon}
          <span style={{ marginLeft: 8 }}>{category.label}</span>
        </span>
      ),
      children: filteredList.length > 0 ? (
        <Collapse
          accordion
          ghost={false}
          items={filteredList.map((item) => ({
            key: item.key,
            label: item.question,
            children: <p>{item.answer}</p>
          }))}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#a0aec0' }}>
          未找到与“{searchText}”相关的常见问题解答。请尝试更换关键词，或者在下方直接联系客服。
        </div>
      )
    }
  })

  return (
    <Layout>
      <div className="help-center-page">
        <div className="container">
          {/* Header & Search */}
          <div className="help-hero">
            <h1>帮助中心</h1>
            <p>我们在跨境供应链的每一个节点，都为您准备了贴心的避坑解答</p>
            <Input
              className="help-search-input"
              placeholder="请输入您遇到的问题，如：入驻、海外仓、担保交易..."
              allowClear
              prefix={<SearchOutlined style={{ color: '#a0aec0' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Collapsible FAQ Panels */}
          <Card className="help-tabs-card" bordered={false}>
            <Tabs defaultActiveKey="getting-started" items={tabItems} />
          </Card>

          {/* Contact Support Center */}
          <div className="contact-section">
            <div className="contact-card">
              <h2>仍有疑问？您专属的客户经理一直在身边</h2>
              <p>
                大宗跨境交易流程繁琐，我们的全球客服团队支持多语言对接，为您提供全方位的清关、物流与退税协调支持。
              </p>
              <div className="contact-methods">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8}>
                    <div className="method-item">
                      <PhoneOutlined className="icon" />
                      <h4>客服专线</h4>
                      <span>400-666-8888</span>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="method-item">
                      <MailOutlined className="icon" />
                      <h4>电子信箱</h4>
                      <span>support@platform.com</span>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="method-item">
                      <MessageOutlined className="icon" />
                      <h4>在线直联</h4>
                      <span>工作日 9:00 - 18:00</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HelpCenter
