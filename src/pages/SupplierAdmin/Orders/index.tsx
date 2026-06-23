import { useState, useEffect } from 'react'
import { Table, Tag, Button, Tabs, Modal, Form, Input, Select, Card, Space, message, Descriptions } from 'antd'
import { CarOutlined, InfoCircleOutlined } from '@ant-design/icons'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'
import { mockDb, Order } from '@/utils/mockDb'
import { useAuth } from '@/contexts/AuthContext'

const SupplierAdminOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState('all')

  // 发货 Modal 状态
  const [isShipModalVisible, setIsShipModalVisible] = useState(false)
  const [selectedOrderNo, setSelectedOrderNo] = useState<string | null>(null)
  const [shipForm] = Form.useForm()

  // 详情 Modal 状态
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [detailOrder, setDetailOrder] = useState<Order | null>(null)

  const loadOrders = () => {
    const allOrders = mockDb.getOrders()
    // 过滤出属于当前登录供应商的订单（如果是 demo 模式没有 user，默认为 1）
    const supplierId = user?.id || '1'
    const filtered = allOrders.filter((o) => o.supplierId === supplierId)
    setOrders(filtered)
  }

  useEffect(() => {
    loadOrders()
    window.addEventListener('b2b_db_updated', loadOrders)
    return () => {
      window.removeEventListener('b2b_db_updated', loadOrders)
    }
  }, [user])

  // 打开发货弹窗
  const handleOpenShipModal = (orderNo: string) => {
    setSelectedOrderNo(orderNo)
    shipForm.resetFields()
    setIsShipModalVisible(true)
  }

  // 确认发货
  const handleConfirmShip = async () => {
    try {
      const values = await shipForm.validateFields()
      if (selectedOrderNo) {
        const shippedTimeStr = new Date().toISOString().replace('T', ' ').substring(0, 19)
        mockDb.updateOrderStatus(selectedOrderNo, '已发货', {
          carrier: values.carrier,
          trackingNo: values.trackingNo,
          shippedTime: shippedTimeStr,
        })
        message.success(`订单 ${selectedOrderNo} 发货成功！`)
        setIsShipModalVisible(false)
        loadOrders()
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 打开详情弹窗
  const handleOpenDetailModal = (order: Order) => {
    setDetailOrder(order)
    setIsDetailModalVisible(true)
  }

  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo', width: 140 },
    { title: '分销商', dataIndex: 'distributorName', key: 'distributorName' },
    { 
      title: '商品明细', 
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
      title: '订单金额', 
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
      width: 180,
      render: (record: Order) => (
        <Space>
          <Button type="link" size="small" icon={<InfoCircleOutlined />} onClick={() => handleOpenDetailModal(record)}>
            详情
          </Button>
          {record.status === '待发货' && (
            <Button type="primary" size="small" icon={<CarOutlined />} onClick={() => handleOpenShipModal(record.orderNo)}>
              发货
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const getFilteredData = (tab: string) => {
    switch (tab) {
      case 'pending_pay':
        return orders.filter(o => o.status === '待付款')
      case 'shipping':
        return orders.filter(o => o.status === '待发货')
      case 'shipped':
        return orders.filter(o => o.status === '已发货')
      case 'completed':
        return orders.filter(o => o.status === '已完成')
      default:
        return orders
    }
  }

  const tabItems = [
    { key: 'all', label: `全部订单 (${orders.length})` },
    { key: 'pending_pay', label: `待付款 (${orders.filter(o => o.status === '待付款').length})` },
    { key: 'shipping', label: `待发货 (${orders.filter(o => o.status === '待发货').length})` },
    { key: 'shipped', label: `已发货 (${orders.filter(o => o.status === '已发货').length})` },
    { key: 'completed', label: `已完成 (${orders.filter(o => o.status === '已完成').length})` },
  ]

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="orders">
      <Card title={<h2>订单管理</h2>}>
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

      {/* 发货弹窗 */}
      <Modal
        title="物流信息录入"
        open={isShipModalVisible}
        onOk={handleConfirmShip}
        onCancel={() => setIsShipModalVisible(false)}
        okText="确认发货"
        cancelText="取消"
      >
        <Form form={shipForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="carrier"
            label="物流承运商"
            initialValue="sf"
            rules={[{ required: true, message: '请选择或输入承运商' }]}
          >
            <Select>
              <Select.Option value="顺丰速运">顺丰速运 (SF Express)</Select.Option>
              <Select.Option value="德邦快递">德邦快递 (Deyibang)</Select.Option>
              <Select.Option value="中远海运">中远海运 (COSCO Ocean Freight)</Select.Option>
              <Select.Option value="DHL">DHL 国际快递</Select.Option>
              <Select.Option value="FedEx">FedEx 联邦快递</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="trackingNo"
            label="运单号 (Tracking Number)"
            rules={[
              { required: true, message: '请输入运单号' },
              { pattern: /^[A-Za-z0-9]+$/, message: '运单号只能包含字母和数字' }
            ]}
          >
            <Input placeholder="请录入实际物流跟踪号" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情弹窗 */}
      <Modal
        title="订单详情"
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
            <Descriptions title="基本信息" bordered column={2}>
              <Descriptions.Item label="订单号" span={2}>{detailOrder.orderNo}</Descriptions.Item>
              <Descriptions.Item label="下单时间">{detailOrder.createTime}</Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Tag color={detailOrder.status === '已完成' ? 'green' : 'blue'}>{detailOrder.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="分销商">{detailOrder.distributorName}</Descriptions.Item>
              <Descriptions.Item label="订单金额">¥{detailOrder.amount.toFixed(2)}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="收货人与交付地址" bordered column={1} style={{ marginTop: 24 }}>
              <Descriptions.Item label="收货人">{detailOrder.contact}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{detailOrder.phone}</Descriptions.Item>
              <Descriptions.Item label="收货地址">{detailOrder.address}</Descriptions.Item>
            </Descriptions>

            {detailOrder.shippingDetails && (
              <Descriptions title="物流运单信息" bordered column={2} style={{ marginTop: 24 }}>
                <Descriptions.Item label="物流商">{detailOrder.shippingDetails.carrier}</Descriptions.Item>
                <Descriptions.Item label="运单号">{detailOrder.shippingDetails.trackingNo}</Descriptions.Item>
                <Descriptions.Item label="发货时间" span={2}>{detailOrder.shippingDetails.shippedTime}</Descriptions.Item>
              </Descriptions>
            )}

            <h4 style={{ marginTop: 24, marginBottom: 12, fontSize: 14, fontWeight: 600 }}>订购商品列表</h4>
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
    </AdminLayout>
  )
}

export default SupplierAdminOrders
