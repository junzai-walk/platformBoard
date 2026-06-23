import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as echarts from 'echarts'
import worldGeoJson from '@/assets/world.json'

export interface WarehouseItem {
  id: string
  nameKey: string
  locationKey: string
  coords: [number, number]
  area: string
  capacity: string
  dailyOrders: string
  serviceKeys: string[]
  image: string
}

export const useOverseasWarehouse = () => {
  const { t } = useTranslation()

  // 注册真实的世界地图
  useEffect(() => {
    echarts.registerMap('world', worldGeoJson as any)
  }, [])

  // 全球仓储网络数据
  const warehouseData: WarehouseItem[] = [
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
              <span style="color: #666;">${t(warehouse.locationKey)}</span><br/>
              <span style="color: #666;">${t('warehouse.area')}: ${warehouse.area}</span><br/>
              <span style="color: #666;">${t('warehouse.dailyOrdersBadge')}: ${warehouse.dailyOrders}</span>
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

  return {
    warehouseData,
    mapOption,
    t,
  }
}
