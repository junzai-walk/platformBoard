import { useEffect } from 'react'
import { Row, Col, Card, Statistic } from 'antd'
import { GlobalOutlined, HomeOutlined, RocketOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './index.less'

const OverseasWarehouse = () => {
  const { t } = useTranslation()
  // const [ setSelectedWarehouse] = useState<string | null>(null)

  // 注册简化的世界地图
  useEffect(() => {
    const worldGeoJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'World' },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-180, 85], [180, 85], [180, -85], [-180, -85], [-180, 85]
            ]]
          }
        }
      ]
    }
    echarts.registerMap('world', worldGeoJson as any)
  }, [])

  // 全球仓储网络数据
  const warehouseData = [
    {
      id: 'us-east',
      nameKey: 'warehouse.warehouses.usEast',
      locationKey: 'warehouse.locations.newJersey',
      coords: [-74.4057, 40.0583],
      area: '150,000 sq ft',
      capacity: '50,000 units',
      dailyOrders: '2,500+',
      serviceKeys: ['warehouse.serviceItems.tempControl', 'warehouse.serviceItems.largeStorage', 'warehouse.serviceItems.assembly'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    },
    {
      id: 'us-west',
      nameKey: 'warehouse.warehouses.usWest',
      locationKey: 'warehouse.locations.losAngeles',
      coords: [-118.2437, 34.0522],
      area: '120,000 sq ft',
      capacity: '40,000 units',
      dailyOrders: '2,000+',
      serviceKeys: ['warehouse.serviceItems.tempControl', 'warehouse.serviceItems.largeStorage', 'warehouse.serviceItems.whiteGlove'],
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    },
    {
      id: 'eu-germany',
      nameKey: 'warehouse.warehouses.euGermany',
      locationKey: 'warehouse.locations.hamburg',
      coords: [9.9937, 53.5511],
      area: '100,000 sq ft',
      capacity: '35,000 units',
      dailyOrders: '1,800+',
      serviceKeys: ['warehouse.serviceItems.tempControl', 'warehouse.serviceItems.largeStorage', 'warehouse.serviceItems.customs'],
      image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800',
    },
    {
      id: 'eu-uk',
      nameKey: 'warehouse.warehouses.euUk',
      locationKey: 'warehouse.locations.london',
      coords: [-0.1276, 51.5074],
      area: '80,000 sq ft',
      capacity: '28,000 units',
      dailyOrders: '1,500+',
      serviceKeys: ['warehouse.serviceItems.tempControl', 'warehouse.serviceItems.largeStorage', 'warehouse.serviceItems.nextDay'],
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800',
    },
    {
      id: 'japan',
      nameKey: 'warehouse.warehouses.japan',
      locationKey: 'warehouse.locations.tokyo',
      coords: [139.6917, 35.6895],
      area: '90,000 sq ft',
      capacity: '30,000 units',
      dailyOrders: '1,600+',
      serviceKeys: ['warehouse.serviceItems.tempControl', 'warehouse.serviceItems.largeStorage', 'warehouse.serviceItems.jit'],
      image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800',
    },
    {
      id: 'australia',
      nameKey: 'warehouse.warehouses.australia',
      locationKey: 'warehouse.locations.sydney',
      coords: [151.2093, -33.8688],
      area: '70,000 sq ft',
      capacity: '25,000 units',
      dailyOrders: '1,200+',
      serviceKeys: ['warehouse.serviceItems.tempControl', 'warehouse.serviceItems.largeStorage', 'warehouse.serviceItems.installation'],
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
    },
  ]

  // 地图配置
  const mapOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (params.componentSubType === 'scatter') {
          const warehouse = warehouseData[params.dataIndex]
          return `
            <div style="padding: 8px;">
              <strong style="font-size: 14px; color: #ff6600;">${t(warehouse.nameKey)}</strong><br/>
              <span style="color: #666;">📍 ${t(warehouse.locationKey)}</span><br/>
              <span style="color: #666;">📦 ${t('warehouse.area')}: ${warehouse.area}</span><br/>
              <span style="color: #666;">📊 ${t('warehouse.dailyOrdersBadge')}: ${warehouse.dailyOrders}</span>
            </div>
          `
        }
        return params.name
      },
    },
    geo: {
      map: 'world',
      roam: true,
      zoom: 1.2,
      itemStyle: {
        areaColor: '#f0f2f5',
        borderColor: '#d9d9d9',
      },
      emphasis: {
        itemStyle: {
          areaColor: '#e6f7ff',
        },
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: warehouseData.map((w) => ({
          name: t(w.nameKey),
          value: [...w.coords, 100],
        })),
        symbolSize: 20,
        itemStyle: {
          color: '#ff6600',
          shadowBlur: 10,
          shadowColor: 'rgba(255, 102, 0, 0.5)',
        },
        emphasis: {
          itemStyle: {
            color: '#ff8533',
            shadowBlur: 20,
          },
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: warehouseData.slice(0, 3).map((w) => ({
          name: t(w.nameKey),
          value: [...w.coords, 100],
        })),
        symbolSize: 15,
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 4,
        },
        itemStyle: {
          color: '#ff6600',
          shadowBlur: 10,
          shadowColor: '#ff6600',
        },
      },
    ],
  }

  return (
    <div className="overseas-warehouse-page">
      <Header />
      
      <div className="page-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>{t('warehouse.title')}</h1>
            <p>{t('warehouse.subtitle')}</p>
          </div>
        </div>

        {/* 核心数据看板 */}
        <div className="stats-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.countriesCovered')}
                  value={6}
                  prefix={<GlobalOutlined />}
                  valueStyle={{ color: '#ff6600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.totalArea')}
                  value="610,000"
                  suffix="sq ft"
                  prefix={<HomeOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.dailyOrders')}
                  value="10,600"
                  suffix="+"
                  prefix={<RocketOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="stat-card">
                <Statistic
                  title={t('warehouse.avgDelivery')}
                  value="3-5"
                  suffix={t('warehouse.days')}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* 全球仓储网络地图 */}
        <div className="map-section">
          <h2>{t('warehouse.mapTitle')}</h2>
          <p className="section-subtitle">{t('warehouse.mapSubtitle')}</p>
          <Card className="map-card">
            <ReactECharts option={mapOption} style={{ height: 500 }} />
          </Card>
        </div>

        {/* 仓库详情列表 */}
        <div className="warehouse-list-section">
          <h2>{t('warehouse.warehouseDetails')}</h2>
          <Row gutter={[24, 24]}>
            {warehouseData.map((warehouse) => (
              <Col xs={24} md={12} lg={8} key={warehouse.id}>
                <Card
                  hoverable
                  className="warehouse-card"
                  cover={
                    <div className="warehouse-image">
                      <img alt={t(warehouse.nameKey)} src={warehouse.image} />
                      <div className="warehouse-badge">{warehouse.dailyOrders} {t('warehouse.dailyOrdersBadge')}</div>
                    </div>
                  }
                >
                  <Card.Meta
                    title={t(warehouse.nameKey)}
                    description={
                      <div className="warehouse-info">
                        <p className="location">📍 {t(warehouse.locationKey)}</p>
                        <div className="specs">
                          <span>📦 {warehouse.area}</span>
                          <span>📊 {warehouse.capacity}</span>
                        </div>
                        <div className="services">
                          <strong>{t('warehouse.services')}:</strong>
                          <ul>
                            {warehouse.serviceKeys.map((serviceKey, idx) => (
                              <li key={idx}>✓ {t(serviceKey)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 入驻流程 */}
        <div className="onboarding-section">
          <h2>{t('warehouse.onboardingTitle')}</h2>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">1</div>
                <h3>{t('warehouse.step1Title')}</h3>
                <p>{t('warehouse.step1Desc')}</p>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">2</div>
                <h3>{t('warehouse.step2Title')}</h3>
                <p>{t('warehouse.step2Desc')}</p>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">3</div>
                <h3>{t('warehouse.step3Title')}</h3>
                <p>{t('warehouse.step3Desc')}</p>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card className="step-card">
                <div className="step-number">4</div>
                <h3>{t('warehouse.step4Title')}</h3>
                <p>{t('warehouse.step4Desc')}</p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OverseasWarehouse

