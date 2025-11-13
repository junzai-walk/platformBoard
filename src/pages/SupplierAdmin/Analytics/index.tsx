import { Row, Col, Select, DatePicker } from 'antd'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'
import '../../../styles/dashboard-dark.less'

const { RangePicker } = DatePicker

const SupplierAdminAnalytics = () => {
  // 雷达图 - 商品评价维度
  const radarOption = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
    },
    legend: {
      data: ['本月', '上月'],
      textStyle: { color: 'rgba(255, 255, 255, 0.65)' },
    },
    radar: {
      indicator: [
        { name: '商品质量', max: 100 },
        { name: '物流速度', max: 100 },
        { name: '服务态度', max: 100 },
        { name: '价格优势', max: 100 },
        { name: '售后服务', max: 100 },
      ],
      splitArea: {
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'],
        },
      },
      axisLine: {
        lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
      },
      splitLine: {
        lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
      },
      name: {
        textStyle: { color: 'rgba(255, 255, 255, 0.65)' },
      },
    },
    series: [
      {
        name: '评价维度',
        type: 'radar',
        data: [
          {
            value: [92, 88, 95, 85, 90],
            name: '本月',
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: 'rgba(102, 126, 234, 0.5)' },
                { offset: 1, color: 'rgba(102, 126, 234, 0.1)' },
              ]),
            },
            lineStyle: { color: '#667eea', width: 2 },
            itemStyle: { color: '#667eea' },
          },
          {
            value: [85, 82, 88, 80, 85],
            name: '上月',
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: 'rgba(6, 182, 212, 0.5)' },
                { offset: 1, color: 'rgba(6, 182, 212, 0.1)' },
              ]),
            },
            lineStyle: { color: '#06b6d4', width: 2 },
            itemStyle: { color: '#06b6d4' },
          },
        ],
      },
    ],
  }

  // 散点图 - 价格与销量关系
  const scatterOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        return `商品: ${params.value[2]}<br/>价格: ¥${params.value[0]}<br/>销量: ${params.value[1]}件`
      },
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: '价格(元)',
      nameTextStyle: { color: 'rgba(255, 255, 255, 0.65)' },
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    yAxis: {
      type: 'value',
      name: '销量(件)',
      nameTextStyle: { color: 'rgba(255, 255, 255, 0.65)' },
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
    series: [
      {
        type: 'scatter',
        symbolSize: (data: any) => Math.sqrt(data[1]) * 2,
        data: [
          [50, 1200, '商品A'],
          [120, 800, '商品B'],
          [200, 500, '商品C'],
          [80, 1000, '商品D'],
          [150, 600, '商品E'],
          [90, 950, '商品F'],
          [180, 550, '商品G'],
          [60, 1100, '商品H'],
          [140, 700, '商品I'],
          [100, 900, '商品J'],
        ],
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
            { offset: 0, color: '#a855f7' },
            { offset: 1, color: '#ec4899' },
          ]),
          shadowBlur: 10,
          shadowColor: 'rgba(168, 85, 247, 0.5)',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(168, 85, 247, 0.8)',
          },
        },
      },
    ],
  }

  // 漏斗图 - 销售转化漏斗
  const funnelOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      textStyle: { color: '#fff' },
      formatter: '{b}: {c}人 ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.65)' },
    },
    series: [
      {
        name: '销售漏斗',
        type: 'funnel',
        left: '10%',
        width: '60%',
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 14,
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderColor: '#0a0e27',
          borderWidth: 2,
        },
        emphasis: {
          label: {
            fontSize: 16,
          },
        },
        data: [
          { value: 10000, name: '访问', itemStyle: { color: '#667eea' } },
          { value: 6000, name: '浏览商品', itemStyle: { color: '#06b6d4' } },
          { value: 3000, name: '加入购物车', itemStyle: { color: '#10b981' } },
          { value: 1500, name: '提交订单', itemStyle: { color: '#ff6600' } },
          { value: 1200, name: '完成支付', itemStyle: { color: '#a855f7' } },
        ],
      },
    ],
  }

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="analytics">
      <div className="dashboard-dark">
        <h1 className="dashboard-title">数据分析</h1>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">商品评价维度分析</div>
                <div className="chart-actions">
                  <Select
                    defaultValue="month"
                    style={{ width: 120 }}
                    options={[
                      { value: 'week', label: '本周' },
                      { value: 'month', label: '本月' },
                      { value: 'quarter', label: '本季度' },
                    ]}
                  />
                </div>
              </div>
              <div className="chart-container">
                <ReactECharts option={radarOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">价格与销量关系分析</div>
              </div>
              <div className="chart-container">
                <ReactECharts option={scatterOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">销售转化漏斗</div>
                <div className="chart-actions">
                  <RangePicker />
                </div>
              </div>
              <div className="chart-container">
                <ReactECharts option={funnelOption} style={{ height: '100%' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default SupplierAdminAnalytics

