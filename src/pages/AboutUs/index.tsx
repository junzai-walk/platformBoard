import Layout from '@/components/Layout'
import { Card } from 'antd'

const AboutUs = () => {
  return (
    <Layout>
      <div className="container" style={{ padding: '40px 0' }}>
        <Card>
          <h1>关于我们</h1>
          <p>跨境电商平台致力于连接优质供应商与分销商，打造高效、透明的B2B交易生态。</p>
          <h2>我们的使命</h2>
          <p>为企业提供最优质的采购和销售服务，助力企业成长。</p>
          <h2>我们的优势</h2>
          <ul>
            <li>海量优质供应商资源</li>
            <li>严格的商家认证体系</li>
            <li>完善的交易保障机制</li>
            <li>专业的客户服务团队</li>
          </ul>
        </Card>
      </div>
    </Layout>
  )
}

export default AboutUs

