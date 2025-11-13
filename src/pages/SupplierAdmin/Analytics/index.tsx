import { Card, Row, Col } from 'antd'
import ReactECharts from 'echarts-for-react'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'

const SupplierAdminAnalytics = () => {
  const barOption = {
    title: { text: '各分销商采购金额排名' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['分销商A', '分销商B', '分销商C', '分销商D', '分销商E'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [12000, 9800, 8500, 7200, 6500],
        type: 'bar',
        itemStyle: { color: '#ff6600' },
      },
    ],
  }

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="analytics">
      <div>
        <h1>营销与数据</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card>
              <ReactECharts option={barOption} style={{ height: 400 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default SupplierAdminAnalytics

