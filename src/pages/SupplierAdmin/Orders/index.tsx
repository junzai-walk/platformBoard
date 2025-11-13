import { Table, Tag, Button, Tabs } from 'antd'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'

const SupplierAdminOrders = () => {
  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '分销商', dataIndex: 'distributor', key: 'distributor' },
    { title: '金额', dataIndex: 'amount', key: 'amount' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
    { title: '下单时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '操作',
      key: 'action',
      render: () => <Button type="link">查看详情</Button>,
    },
  ]

  const data = Array(10).fill(null).map((_, i) => ({
    key: i,
    orderNo: `O${20250101 + i}`,
    distributor: `分销商${i + 1}`,
    amount: `¥${(Math.random() * 10000).toFixed(2)}`,
    status: ['待付款', '待发货', '已发货', '已完成'][i % 4],
    createTime: '2025-01-01 10:00:00',
  }))

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="orders">
      <div>
        <h1>订单管理</h1>
        <Tabs
          items={[
            { key: 'all', label: '所有订单', children: <Table columns={columns} dataSource={data} /> },
            { key: 'pending', label: '待付款', children: <Table columns={columns} dataSource={data.filter((_, i) => i % 4 === 0)} /> },
            { key: 'shipping', label: '待发货', children: <Table columns={columns} dataSource={data.filter((_, i) => i % 4 === 1)} /> },
          ]}
        />
      </div>
    </AdminLayout>
  )
}

export default SupplierAdminOrders

