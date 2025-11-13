import { Row, Col, Card, Statistic } from 'antd'
import ReactECharts from 'echarts-for-react'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'

const DistributorAdminIndex = () => {
  const purchaseTrendOption = {
    title: { text: '近半年采购成本趋势' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [8000, 9200, 8500, 10200, 11000, 9800],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#1890ff' },
      },
    ],
  }

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="dashboard">
      <div>
        <h1>数据看板</h1>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="本月采购额" value={9800} precision={2} prefix="¥" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="待收货订单" value={15} suffix="单" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="收藏商品数" value={48} suffix="个" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="常用供应商数" value={8} suffix="家" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24}>
            <Card>
              <ReactECharts option={purchaseTrendOption} style={{ height: 400 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default DistributorAdminIndex

