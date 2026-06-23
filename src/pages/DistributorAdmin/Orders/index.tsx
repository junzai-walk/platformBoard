import { useState, useEffect } from 'react'
import { Table, Tag, Button, Tabs, Modal, Timeline, Card, Space, message, Descriptions } from 'antd'
import { WalletOutlined, CheckCircleOutlined, CarOutlined, InfoCircleOutlined } from '@ant-design/icons'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'
import { mockDb, Order } from '@/utils/mockDb'
import { useAuth } from '@/contexts/AuthContext'

const DistributorAdminOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState('all')

  // 详情 Modal 状态
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [detailOrder, setDetailOrder] = useState<Order | null>(null)

  // 物流 Modal 状态
  const [isLogisticsModalVisible, setIsLogisticsModalVisible] = useState(false)
  const [logisticsOrder, setLogisticsOrder] = useState<Order | null>(null)

  const loadOrders = () => {
    const allOrders = mockDb.getOrders()
    const distId = user?.id || 'distributor_demo'
    const filtered = allOrders.filter((o) => o.distributorId === distId)
    setOrders(filtered)
  }

  useEffect(() => {
    loadOrders()
    window.addEventListener('b2b_db_updated', loadOrders)
    return () => {
      window.removeEventListener('b2b_db_updated', loadOrders)
    }
  }, [user])

  // 模拟支付
  const handlePay = (orderNo: string) => {
    mockDb.updateOrderStatus(orderNo, '待发货')
    message.success('支付成功，等待供应商发货')
    loadOrders()
  }

  // 确认收货
  const handleConfirmReceipt = (orderNo: string) => {
    Modal.confirm({
      title: '确认收货',
      content: '请确认您已经收到购买的商品。大件商品请在确认完外观无损后再确认收货！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        mockDb.updateOrderStatus(orderNo, '已完成')
        message.success('已确认收货，订单完成！')
        loadOrders()
      }
    })
  }

  // 打开物流
  const handleOpenLogistics = (order: Order) => {
    setLogisticsOrder(order)
    setIsLogisticsModalVisible(true)
  }

  // 生成模拟物流节点
  const getLogisticsTimeline = (order: Order) => {
    if (!order.shippingDetails) return []
    const carrier = order.shippingDetails.carrier
    const trackingNo = order.shippingDetails.trackingNo
    const baseTime = order.shippingDetails.shippedTime || order.createTime

    const parseTime = (str: string, offsetHours: number) => {
      const date = new Date(str.replace(/-/g, '/'))
      date.setHours(date.getHours() + offsetHours)
      return date.toISOString().replace('T', ' ').substring(0, 16)
    }

    return [
      {
        color: 'green',
        children: (
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>已妥投 / 配送完成</p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>快件已送达分销商前置交付中心，由前置仓签收。大件商品送装白手套服务已完成。</p>
            <span style={{ fontSize: 11, color: '#999' }}>{parseTime(baseTime, 30)}</span>
          </div>
        ),
      },
      {
        children: (
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>派送中</p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>【目的地配送站】派送员正为您派送，请保持联系电话畅通。</p>
            <span style={{ fontSize: 11, color: '#999' }}>{parseTime(baseTime, 24)}</span>
          </div>
        ),
      },
      {
        children: (
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>到达转运枢纽</p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>快件到达转运枢纽分拨中心，准备发往派送目的地。</p>
            <span style={{ fontSize: 11, color: '#999' }}>{parseTime(baseTime, 15)}</span>
          </div>
        ),
      },
      {
        children: (
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>干线运输中</p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>快件已在发运港口/干线枢纽装车起运，进行跨省/跨洲联运中。</p>
            <span style={{ fontSize: 11, color: '#999' }}>{parseTime(baseTime, 8)}</span>
          </div>
        ),
      },
      {
        color: 'blue',
        children: (
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 4px 0' }}>已收寄发货</p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
              商家已发货，物流商【{carrier}】已收件寄出。运单号：<strong>{trackingNo}</strong>。
            </p>
            <span style={{ fontSize: 11, color: '#999' }}>{baseTime.substring(0, 16)}</span>
          </div>
        ),
      },
    ]
  }

  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo', width: 140 },
    { title: '供应商', dataIndex: 'supplierName', key: 'supplierName' },
    {
      title: '采购内容',
      key: 'items',
      render: (record: Order) => (
        <div>
          {record.items.map((item, idx) => (
            <div key={idx} style={{ fontSize: 12, color: '#555' }}>
              {item.name} ({Object.values(item.spec).join('/')}) x {item.quantity}
            </div>
          ))}
        </div>
      )
    },
    {
      title: '结算金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount: number) => `¥${amount.toFixed(2)}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: string) => {
        const colorMap: any = {
          '待付款': 'orange',
          '待发货': 'blue',
          '已发货': 'cyan',
          '已完成': 'green',
        }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    { title: '下单时间', dataIndex: 'createTime', key: 'createTime', width: 150 },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (record: Order) => (
        <Space wrap>
          <Button type="link" size="small" icon={<InfoCircleOutlined />} onClick={() => { setDetailOrder(record); setIsDetailModalVisible(true); }}>
            详情
          </Button>
          {record.status === '待付款' && (
            <Button type="primary" danger size="small" icon={<WalletOutlined />} onClick={() => handlePay(record.orderNo)}>
              付款
            </Button>
          )}
          {record.status === '已发货' && (
            <>
              <Button type="primary" size="small" icon={<CarOutlined />} onClick={() => handleOpenLogistics(record)} style={{ background: '#52c41a', borderColor: '#52c41a' }}>
                查看物流
              </Button>
              <Button type="default" size="small" icon={<CheckCircleOutlined />} onClick={() => handleConfirmReceipt(record.orderNo)}>
                确认收货
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  const getFilteredData = (tab: string) => {
    switch (tab) {
      case 'pending_pay':
        return orders.filter(o => o.status === '待付款')
      case 'receiving':
        return orders.filter(o => o.status === '已发货')
      case 'completed':
        return orders.filter(o => o.status === '已完成')
      default:
        return orders
    }
  }

  const tabItems = [
    { key: 'all', label: `全部采购 (${orders.length})` },
    { key: 'pending_pay', label: `待付款 (${orders.filter(o => o.status === '待付款').length})` },
    { key: 'receiving', label: `待收货 (${orders.filter(o => o.status === '已发货').length})` },
    { key: 'completed', label: `已完成 (${orders.filter(o => o.status === '已完成').length})` },
  ]

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="orders">
      <Card title={<h2>我的采购</h2>}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems.map(tab => ({
            key: tab.key,
            label: tab.label,
            children: <Table columns={columns} dataSource={getFilteredData(tab.key)} rowKey="orderNo" />
          }))}
        />
      </Card>

      {/* 订单详情弹窗 */}
      <Modal
        title="采购订单详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {detailOrder && (
          <div style={{ marginTop: 16 }}>
            <Descriptions title="基本订单状态" bordered column={2}>
              <Descriptions.Item label="订单号" span={2}>{detailOrder.orderNo}</Descriptions.Item>
              <Descriptions.Item label="下单时间">{detailOrder.createTime}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={detailOrder.status === '已完成' ? 'green' : 'blue'}>{detailOrder.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="供应商">{detailOrder.supplierName}</Descriptions.Item>
              <Descriptions.Item label="结算金额">¥{detailOrder.amount.toFixed(2)}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="收货地址" bordered column={1} style={{ marginTop: 24 }}>
              <Descriptions.Item label="联系人">{detailOrder.contact}</Descriptions.Item>
              <Descriptions.Item label="电话">{detailOrder.phone}</Descriptions.Item>
              <Descriptions.Item label="地址">{detailOrder.address}</Descriptions.Item>
            </Descriptions>

            {detailOrder.shippingDetails && (
              <Descriptions title="承运运单信息" bordered column={2} style={{ marginTop: 24 }}>
                <Descriptions.Item label="承运商">{detailOrder.shippingDetails.carrier}</Descriptions.Item>
                <Descriptions.Item label="运单号">{detailOrder.shippingDetails.trackingNo}</Descriptions.Item>
                <Descriptions.Item label="发货日期" span={2}>{detailOrder.shippingDetails.shippedTime}</Descriptions.Item>
              </Descriptions>
            )}

            <h4 style={{ marginTop: 24, marginBottom: 12, fontSize: 14, fontWeight: 600 }}>购买商品明细</h4>
            <Table
              dataSource={detailOrder.items}
              rowKey="productId"
              pagination={false}
              size="small"
              columns={[
                { title: '商品', dataIndex: 'name', key: 'name' },
                { 
                  title: '规格', 
                  dataIndex: 'spec', 
                  key: 'spec',
                  render: (spec) => Object.entries(spec).map(([_, v]) => v).join('/')
                },
                { title: '单价', dataIndex: 'price', key: 'price', render: (p) => `¥${p.toFixed(2)}` },
                { title: '数量', dataIndex: 'quantity', key: 'quantity', render: (q, record) => `${q} ${record.unit || '件'}` },
                { title: '小计', key: 'subtotal', render: (_, r) => `¥ ${(r.price * r.quantity).toFixed(2)}` },
              ]}
            />
          </div>
        )}
      </Modal>

      {/* 物流跟踪弹窗 */}
      <Modal
        title="物流跟踪时间轴"
        open={isLogisticsModalVisible}
        onCancel={() => setIsLogisticsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsLogisticsModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {logisticsOrder && logisticsOrder.shippingDetails ? (
          <div style={{ padding: '24px 8px 8px' }}>
            <div style={{ marginBottom: 24, padding: 12, background: '#fafafa', borderRadius: 6 }}>
              <p style={{ margin: '0 0 6px 0' }}>承运物流公司：<strong>{logisticsOrder.shippingDetails.carrier}</strong></p>
              <p style={{ margin: 0 }}>物流运单号：<strong>{logisticsOrder.shippingDetails.trackingNo}</strong></p>
            </div>
            <Timeline items={getLogisticsTimeline(logisticsOrder)} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>暂无物流信息</div>
        )}
      </Modal>
    </AdminLayout>
  )
}

export default DistributorAdminOrders
