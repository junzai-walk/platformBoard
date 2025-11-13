import { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, ShoppingOutlined, DollarOutlined, TeamOutlined, RiseOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'
import './index.less'

const DistributorAdminAnalytics = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 美国各州销售数据
  const usaStateData = [
    { name: 'California', value: 45680, coords: [-119.4179, 36.7783] },
    { name: 'Texas', value: 38920, coords: [-99.9018, 31.9686] },
    { name: 'New York', value: 42150, coords: [-74.0060, 40.7128] },
    { name: 'Florida', value: 35400, coords: [-81.5158, 27.6648] },
    { name: 'Illinois', value: 28900, coords: [-89.3985, 40.6331] },
    { name: 'Pennsylvania', value: 26700, coords: [-77.1945, 41.2033] },
    { name: 'Ohio', value: 24500, coords: [-82.9071, 40.4173] },
    { name: 'Georgia', value: 22800, coords: [-83.5007, 32.1656] },
    { name: 'North Carolina', value: 21300, coords: [-79.0193, 35.7596] },
    { name: 'Michigan', value: 19800, coords: [-84.5555, 42.7325] },
    { name: 'Washington', value: 18600, coords: [-120.7401, 47.7511] },
    { name: 'Massachusetts', value: 17200, coords: [-71.0589, 42.3601] },
    { name: 'Arizona', value: 16500, coords: [-111.0937, 34.0489] },
    { name: 'Virginia', value: 15800, coords: [-78.6569, 37.4316] },
    { name: 'Colorado', value: 14900, coords: [-105.7821, 39.5501] },
  ]

  // 地图配置
  const mapOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Sales Distribution Across USA',
      subtext: 'Real-time Regional Performance',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
      },
      subtextStyle: {
        color: '#00d4ff',
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00d4ff',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
      },
      formatter: (params: any) => {
        if (params.data) {
          return `
            <div style="padding: 8px;">
              <div style="font-size: 16px; font-weight: bold; color: #00d4ff; margin-bottom: 8px;">
                ${params.data.name}
              </div>
              <div style="font-size: 14px;">
                Sales: <span style="color: #00ff88; font-weight: bold;">$${params.data.value.toLocaleString()}</span>
              </div>
            </div>
          `
        }
        return ''
      },
    },
    geo: {
      map: 'USA',
      roam: true,
      zoom: 1.2,
      center: [-98, 38],
      itemStyle: {
        areaColor: '#0a1e3e',
        borderColor: '#00d4ff',
        borderWidth: 1,
        shadowColor: 'rgba(0, 212, 255, 0.5)',
        shadowBlur: 10,
      },
      emphasis: {
        itemStyle: {
          areaColor: '#1a3e6e',
          borderColor: '#00ff88',
          borderWidth: 2,
          shadowColor: 'rgba(0, 255, 136, 0.8)',
          shadowBlur: 20,
        },
      },
      label: {
        show: false,
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: usaStateData.map(item => ({
          name: item.name,
          value: [...item.coords, item.value],
        })),
        symbolSize: (val: number[]) => {
          return Math.sqrt(val[2]) / 15
        },
        itemStyle: {
          color: '#00ff88',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 255, 136, 0.8)',
        },
        emphasis: {
          itemStyle: {
            color: '#00d4ff',
            shadowBlur: 20,
            shadowColor: 'rgba(0, 212, 255, 1)',
          },
        },
        label: {
          show: false,
        },
      },
      {
        name: 'Ripple',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: usaStateData.slice(0, 5).map(item => ({
          name: item.name,
          value: [...item.coords, item.value],
        })),
        symbolSize: (val: number[]) => {
          return Math.sqrt(val[2]) / 15
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 4,
        },
        itemStyle: {
          color: '#ff6600',
          shadowBlur: 10,
          shadowColor: 'rgba(255, 102, 0, 0.8)',
        },
        zlevel: 1,
      },
    ],
  }

  // 销售趋势图
  const trendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00d4ff',
      borderWidth: 1,
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: { lineStyle: { color: '#00d4ff' } },
      axisLabel: { color: '#fff' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#00d4ff' } },
      axisLabel: { color: '#fff', formatter: '${value}K' },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } },
    },
    series: [
      {
        name: 'Sales',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 255, 136, 0.5)' },
            { offset: 1, color: 'rgba(0, 255, 136, 0.05)' },
          ]),
        },
        lineStyle: { color: '#00ff88', width: 3 },
        itemStyle: { color: '#00ff88' },
      },
    ],
  }

  // 品类分布环形图
  const categoryOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00d4ff',
      borderWidth: 1,
      textStyle: { color: '#fff' },
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      textStyle: { color: '#fff' },
    },
    series: [
      {
        name: 'Category',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#0a0e27',
          borderWidth: 2,
        },
        label: {
          show: true,
          color: '#fff',
          formatter: '{b}: {d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#00ff88',
          },
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 255, 136, 0.8)',
          },
        },
        data: [
          { value: 45680, name: 'Electronics', itemStyle: { color: '#00d4ff' } },
          { value: 38920, name: 'Hardware', itemStyle: { color: '#00ff88' } },
          { value: 35400, name: 'Office Supplies', itemStyle: { color: '#ff6600' } },
          { value: 28900, name: 'Textiles', itemStyle: { color: '#faad14' } },
          { value: 22800, name: 'Others', itemStyle: { color: '#eb2f96' } },
        ],
      },
    ],
  }

  // 供应商排名柱状图
  const supplierOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00d4ff',
      borderWidth: 1,
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#00d4ff' } },
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } },
    },
    yAxis: {
      type: 'category',
      data: ['TechCorp', 'GlobalParts', 'IndustrialHub', 'OfficeMax', 'SupplyChain'],
      axisLine: { lineStyle: { color: '#00d4ff' } },
      axisLabel: { color: '#fff' },
    },
    series: [
      {
        name: 'Purchase Amount',
        type: 'bar',
        data: [45680, 38920, 35400, 28900, 22800],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: '#00ff88' },
          ]),
          borderRadius: [0, 10, 10, 0],
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          formatter: '${c}',
        },
      },
    ],
  }

  // 注册美国地图（使用简化的GeoJSON）
  useEffect(() => {
    // 简化的美国地图GeoJSON
    const usaGeoJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'USA' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-125, 50], [-125, 25], [-65, 25], [-65, 50], [-125, 50]
            ]]
          }
        }
      ]
    }
    echarts.registerMap('USA', usaGeoJson as any)
  }, [])

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="analytics">
      <div className="analytics-dashboard-dark">
        {/* 顶部标题栏 */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">
              <RiseOutlined /> Distributor Analytics Dashboard
            </h1>
            <p className="dashboard-subtitle">Real-time Business Intelligence & Performance Metrics</p>
          </div>
          <div className="header-right">
            <div className="current-time">
              {currentTime.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
        </div>

        {/* 关键指标卡片 */}
        <Row gutter={[16, 16]} className="metrics-row">
          <Col xs={24} sm={12} lg={6}>
            <div className="metric-card metric-card-1">
              <div className="metric-icon">
                <DollarOutlined />
              </div>
              <div className="metric-content">
                <div className="metric-label">Total Purchases</div>
                <div className="metric-value">$425,680</div>
                <div className="metric-trend trend-up">
                  <ArrowUpOutlined /> 12.5% vs last month
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="metric-card metric-card-2">
              <div className="metric-icon">
                <ShoppingOutlined />
              </div>
              <div className="metric-content">
                <div className="metric-label">Total Orders</div>
                <div className="metric-value">1,284</div>
                <div className="metric-trend trend-up">
                  <ArrowUpOutlined /> 8.3% vs last month
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="metric-card metric-card-3">
              <div className="metric-icon">
                <TeamOutlined />
              </div>
              <div className="metric-content">
                <div className="metric-label">Active Suppliers</div>
                <div className="metric-value">48</div>
                <div className="metric-trend trend-down">
                  <ArrowDownOutlined /> 2.1% vs last month
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="metric-card metric-card-4">
              <div className="metric-icon">
                <RiseOutlined />
              </div>
              <div className="metric-content">
                <div className="metric-label">Avg Order Value</div>
                <div className="metric-value">$331</div>
                <div className="metric-trend trend-up">
                  <ArrowUpOutlined /> 5.7% vs last month
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* 地图和图表 */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* 美国地图 - 销售区域分布 */}
          <Col xs={24} lg={16}>
            <div className="chart-card map-card">
              <ReactECharts option={mapOption} style={{ height: 500 }} />
            </div>
          </Col>

          {/* 品类分布 */}
          <Col xs={24} lg={8}>
            <div className="chart-card">
              <div className="chart-title">Category Distribution</div>
              <ReactECharts option={categoryOption} style={{ height: 500 }} />
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* 销售趋势 */}
          <Col xs={24} lg={12}>
            <div className="chart-card">
              <div className="chart-title">Monthly Sales Trend</div>
              <ReactECharts option={trendOption} style={{ height: 350 }} />
            </div>
          </Col>

          {/* 供应商排名 */}
          <Col xs={24} lg={12}>
            <div className="chart-card">
              <div className="chart-title">Top Suppliers by Purchase Amount</div>
              <ReactECharts option={supplierOption} style={{ height: 350 }} />
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default DistributorAdminAnalytics
