import { Row, Col, Card, Statistic } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'
import './index.less'

const SupplierAdminIndex = () => {
  const salesTrendOption = {
    title: { text: '近30天销售趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: Array(30).fill(0).map((_, i) => `${i + 1}日`),
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: Array(30).fill(0).map(() => Math.floor(Math.random() * 10000)),
        type: 'line',
        smooth: true,
        itemStyle: { color: '#ff6600' },
      },
    ],
  }

  const categoryPieOption = {
    title: { text: '热销商品类别占比' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '电子产品' },
          { value: 735, name: '家居用品' },
          { value: 580, name: '服装鞋帽' },
          { value: 484, name: '食品饮料' },
        ],
      },
    ],
  }

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="dashboard">
      <div className="supplier-dashboard">
        <h1>数据看板</h1>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="今日销售额"
                value={11280}
                precision={2}
                prefix="¥"
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="订单数" value={93} suffix="单" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="新增客户数" value={12} suffix="个" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="商品浏览量" value={5280} suffix="次" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={12}>
            <Card>
              <ReactECharts option={salesTrendOption} style={{ height: 400 }} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card>
              <ReactECharts option={categoryPieOption} style={{ height: 400 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default SupplierAdminIndex

