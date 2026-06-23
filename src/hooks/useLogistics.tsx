import React from 'react'
import { useTranslation } from 'react-i18next'
import { DollarOutlined, RocketOutlined, SafetyOutlined, ToolOutlined } from '@ant-design/icons'

export interface SolutionItem {
  icon: React.ReactNode
  painPointKey: string
  problemKey: string
  solutionKey: string
  detailKeys: string[]
  color: string
}

export interface PricingColumn {
  title: string
  dataIndex: string
  key: string
}

export interface PricingItem {
  key: string
  service: string
  model: string
  rate: string
  notes: string
}

export const useLogistics = () => {
  const { t } = useTranslation()

  // 痛点与解决方案
  const solutions: SolutionItem[] = [
    {
      icon: <DollarOutlined />,
      painPointKey: 'logistics.painPoints.highCost',
      problemKey: 'logistics.problems.highCost',
      solutionKey: 'logistics.solutions.consolidation',
      detailKeys: [
        'logistics.solutionDetails.consolidation1',
        'logistics.solutionDetails.consolidation2',
        'logistics.solutionDetails.consolidation3',
        'logistics.solutionDetails.consolidation4',
      ],
      color: '#ff6600',
    },
    {
      icon: <RocketOutlined />,
      painPointKey: 'logistics.painPoints.slowSpeed',
      problemKey: 'logistics.problems.slowSpeed',
      solutionKey: 'logistics.solutions.warehouse',
      detailKeys: [
        'logistics.solutionDetails.warehouse1',
        'logistics.solutionDetails.warehouse2',
        'logistics.solutionDetails.warehouse3',
        'logistics.solutionDetails.warehouse4',
      ],
      color: '#1890ff',
    },
    {
      icon: <SafetyOutlined />,
      painPointKey: 'logistics.painPoints.damage',
      problemKey: 'logistics.problems.damage',
      solutionKey: 'logistics.solutions.packaging',
      detailKeys: [
        'logistics.solutionDetails.packaging1',
        'logistics.solutionDetails.packaging2',
        'logistics.solutionDetails.packaging3',
        'logistics.solutionDetails.packaging4',
      ],
      color: '#52c41a',
    },
    {
      icon: <ToolOutlined />,
      painPointKey: 'logistics.painPoints.installation',
      problemKey: 'logistics.problems.installation',
      solutionKey: 'logistics.solutions.whiteGlove',
      detailKeys: [
        'logistics.solutionDetails.whiteGlove1',
        'logistics.solutionDetails.whiteGlove2',
        'logistics.solutionDetails.whiteGlove3',
        'logistics.solutionDetails.whiteGlove4',
      ],
      color: '#faad14',
    },
  ]

  // 费用透明化表格列
  const pricingColumns: PricingColumn[] = [
    {
      title: t('logistics.pricingTable.serviceType'),
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: t('logistics.pricingTable.pricingModel'),
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: t('logistics.pricingTable.exampleRate'),
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: t('logistics.pricingTable.notes'),
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  // 费用透明化表格数据
  const pricingData: PricingItem[] = [
    {
      key: '1',
      service: t('logistics.pricingTable.oceanFCL'),
      model: t('logistics.pricingTable.perContainer'),
      rate: '$2,500 - $4,500',
      notes: t('logistics.pricingTable.fclNote'),
    },
    {
      key: '2',
      service: t('logistics.pricingTable.oceanLCL'),
      model: t('logistics.pricingTable.perCBM'),
      rate: '$45 - $85 / CBM',
      notes: t('logistics.pricingTable.lclNote'),
    },
    {
      key: '3',
      service: t('logistics.pricingTable.storage'),
      model: t('logistics.pricingTable.perPallet'),
      rate: '$15 - $30',
      notes: t('logistics.pricingTable.storageNote'),
    },
    {
      key: '4',
      service: t('logistics.pricingTable.delivery'),
      model: t('logistics.pricingTable.perShipment'),
      rate: '$50 - $200',
      notes: t('logistics.pricingTable.deliveryNote'),
    },
    {
      key: '5',
      service: t('logistics.pricingTable.whiteGlove'),
      model: t('logistics.pricingTable.perItem'),
      rate: '$80 - $300',
      notes: t('logistics.pricingTable.whiteGloveNote'),
    },
  ]

  return {
    solutions,
    pricingColumns,
    pricingData,
    t,
  }
}
