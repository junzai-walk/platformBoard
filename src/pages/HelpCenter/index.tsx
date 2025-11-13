import Layout from '@/components/Layout'
import { Card, Collapse } from 'antd'

const HelpCenter = () => {
  const items = [
    {
      key: '1',
      label: '如何注册成为供应商？',
      children: <p>点击"供应商入驻"按钮，填写相关信息即可注册。</p>,
    },
    {
      key: '2',
      label: '如何发布商品？',
      children: <p>登录供应商后台，进入商品管理页面，点击"发布新商品"。</p>,
    },
    {
      key: '3',
      label: '如何下单采购？',
      children: <p>浏览商品，选择需要的商品加入购物车，然后进行结算。</p>,
    },
    {
      key: '4',
      label: '支付方式有哪些？',
      children: <p>支持支付宝、微信支付、银行转账等多种支付方式。</p>,
    },
  ]

  return (
    <Layout>
      <div className="container" style={{ padding: '40px 0' }}>
        <Card>
          <h1>帮助中心</h1>
          <p>常见问题解答</p>
          <Collapse items={items} style={{ marginTop: 24 }} />
        </Card>
      </div>
    </Layout>
  )
}

export default HelpCenter

