import { Row, Col, Select } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'
import '../../../styles/dashboard-dark.less'

const DistributorAdminIndex = () => {
  // 关键指标数据
  const metrics = [
    {
      label: '本月采购额',
      value: '¥98,560',
      trend: '+18.2%',
      up: true,
      icon: <ShoppingCartOutlined />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadowColor: 'rgba(102, 126, 234, 0.4)',
    },
    {
      label: '待收货订单',
      value: '28',
      trend: '+5',
      up: true,
      icon: <InboxOutlined />,
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      shadowColor: 'rgba(6, 182, 212, 0.4)',
    },
    {
      label: '收藏商品',
      value: '156',
      trend: '+12',
      up: true,
      icon: <HeartOutlined />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      shadowColor: 'rgba(236, 72, 153, 0.4)',
    },
    {
      label: '合作供应商',
      value: '18',
      trend: '+2',
      up: true,
      icon: <TeamOutlined />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
    },
  ]

  // 采购趋势面积图
  const purchaseTrendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
    },
    legend: {
      data: ['采购金额'],
      textStyle: { color: 'rgba(255, 255, 255, 0.65)' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    series: [
      {
        name: '采购金额',
        type: 'line',
        smooth: true,
        data: [65000, 72000, 68000, 85000, 78000, 92000, 88000, 95000, 90000, 98000, 96000, 105000],
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#06b6d4' },
            { offset: 1, color: '#3b82f6' },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(6, 182, 212, 0.5)' },
            { offset: 1, color: 'rgba(6, 182, 212, 0.05)' },
          ]),
        },
        itemStyle: {
          color: '#06b6d4',
          borderWidth: 2,
          borderColor: '#fff',
        },
      },
    ],
  }

  // 供应商采购占比饼图
  const supplierPieOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.65)' },
    },
    series: [
      {
        name: '采购占比',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#0a0e27',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff',
          },
        },
        data: [
          { value: 35000, name: '华强电子', itemStyle: { color: '#667eea' } },
          { value: 28000, name: '天河商贸', itemStyle: { color: '#06b6d4' } },
          { value: 22000, name: '南山科技', itemStyle: { color: '#10b981' } },
          { value: 18000, name: '福田工业', itemStyle: { color: '#ff6600' } },
          { value: 15000, name: '其他', itemStyle: { color: '#a855f7' } },
        ],
      },
    ],
  }

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="dashboard">
      <div className="dashboard-dark">
        <h1 className="dashboard-title">分销商数据看板</h1>

        {/* 关键指标卡片 */}
        <div className="metrics-cards">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card"
              style={{ '--gradient': metric.gradient, '--shadow-color': metric.shadowColor } as any}
            >
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-trend ${metric.up ? 'up' : 'down'}`}>
                {metric.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <span>{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 图表区域 */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">采购趋势分析</div>
                <div className="chart-actions">
                  <Select
                    defaultValue="year"
                    style={{ width: 120 }}
                    options={[
                      { value: 'week', label: '本周' },
                      { value: 'month', label: '本月' },
                      { value: 'year', label: '本年' },
                    ]}
                  />
                </div>
              </div>
              <div className="chart-container">
                <ReactECharts option={purchaseTrendOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>

          <Col xs={24} lg={8}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">供应商采购占比</div>
              </div>
              <div className="chart-container">
                <ReactECharts option={supplierPieOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default DistributorAdminIndex

