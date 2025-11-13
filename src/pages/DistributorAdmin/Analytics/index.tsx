import { Card, Row, Col } from 'antd'
import ReactECharts from 'echarts-for-react'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'

const DistributorAdminAnalytics = () => {
  const pieOption = {
    title: { text: '采购品类支出分布' },
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 3500, name: '电子产品' },
          { value: 2800, name: '家居用品' },
          { value: 2200, name: '办公用品' },
          { value: 1500, name: '其他' },
        ],
      },
    ],
  }

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="analytics">
      <div>
        <h1>数据分析</h1>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card>
              <ReactECharts option={pieOption} style={{ height: 400 }} />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default DistributorAdminAnalytics

