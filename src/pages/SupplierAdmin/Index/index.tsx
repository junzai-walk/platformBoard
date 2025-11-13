import { Row, Col, Select } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'
import '../../../styles/dashboard-dark.less'
import './index.less'

const SupplierAdminIndex = () => {
  // 关键指标数据
  const metrics = [
    {
      label: '今日销售额',
      value: '¥128,560',
      trend: '+12.5%',
      up: true,
      icon: <DollarOutlined />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadowColor: 'rgba(102, 126, 234, 0.4)',
    },
    {
      label: '今日订单数',
      value: '1,258',
      trend: '+8.3%',
      up: true,
      icon: <ShoppingOutlined />,
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      shadowColor: 'rgba(6, 182, 212, 0.4)',
    },
    {
      label: '新增客户',
      value: '326',
      trend: '+15.2%',
      up: true,
      icon: <UserOutlined />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
    },
    {
      label: '转化率',
      value: '68.5%',
      trend: '-2.1%',
      up: false,
      icon: <RiseOutlined />,
      gradient: 'linear-gradient(135deg, #ff6600 0%, #ff8c42 100%)',
      shadowColor: 'rgba(255, 102, 0, 0.4)',
    },
  ]

  // 销售趋势折线图
  const salesTrendOption = {
    backgroundColor: 'transparent',
    title: {
      text: '',
      textStyle: { color: '#fff' },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
    },
    legend: {
      data: ['销售额', '订单数'],
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
        name: '销售额',
        type: 'line',
        smooth: true,
        data: [12000, 13200, 10100, 13400, 9000, 23000, 21000, 26000, 25000, 34000, 32000, 38000],
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(102, 126, 234, 0.5)' },
            { offset: 1, color: 'rgba(102, 126, 234, 0.05)' },
          ]),
        },
        itemStyle: {
          color: '#667eea',
          borderWidth: 2,
          borderColor: '#fff',
        },
      },
      {
        name: '订单数',
        type: 'line',
        smooth: true,
        data: [2200, 1820, 1910, 2340, 2900, 3300, 3100, 3600, 3500, 4200, 4000, 4800],
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

  // 商品分类销售柱状图
  const categoryBarOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
    },
    legend: {
      data: ['销售额', '销量'],
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
      data: ['电子元器件', '机械设备', '五金工具', '化工原料', '建筑材料', '办公用品'],
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.65)', rotate: 30 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [32000, 28000, 25000, 22000, 20000, 18000],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a855f7' },
            { offset: 1, color: '#ec4899' },
          ]),
          borderRadius: [8, 8, 0, 0],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(168, 85, 247, 0.5)',
          },
        },
      },
      {
        name: '销量',
        type: 'bar',
        data: [1200, 980, 850, 720, 650, 580],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#10b981' },
            { offset: 1, color: '#34d399' },
          ]),
          borderRadius: [8, 8, 0, 0],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(16, 185, 129, 0.5)',
          },
        },
      },
    ],
  }

  // 订单状态饼图
  const orderStatusPieOption = {
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
        name: '订单状态',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#0a0e27',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '待发货', itemStyle: { color: '#667eea' } },
          { value: 735, name: '已发货', itemStyle: { color: '#06b6d4' } },
          { value: 580, name: '已完成', itemStyle: { color: '#10b981' } },
          { value: 484, name: '已取消', itemStyle: { color: '#ef4444' } },
        ],
      },
    ],
  }

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="dashboard">
      <div className="dashboard-dark">
        <h1 className="dashboard-title">供应商数据看板</h1>

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
                <div className="chart-title">销售趋势分析</div>
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
                <ReactECharts option={salesTrendOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>

          <Col xs={24} lg={8}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">订单状态分布</div>
              </div>
              <div className="chart-container">
                <ReactECharts option={orderStatusPieOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>

          <Col xs={24}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">商品分类销售对比</div>
              </div>
              <div className="chart-container">
                <ReactECharts option={categoryBarOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default SupplierAdminIndex

