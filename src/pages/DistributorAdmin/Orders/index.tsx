import { Table, Tag, Button, Tabs } from 'antd'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'

const DistributorAdminOrders = () => {
  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier' },
    { title: '金额', dataIndex: 'amount', key: 'amount' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: any = {
          '待付款': 'orange',
          '待收货': 'blue',
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
    orderNo: `O${20240101 + i}`,
    supplier: `供应商${i + 1}`,
    amount: `¥${(Math.random() * 10000).toFixed(2)}`,
    status: ['待付款', '待收货', '已完成'][i % 3],
    createTime: '2024-01-01 10:00:00',
  }))

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="orders">
      <div>
        <h1>我的采购</h1>
        <Tabs
          items={[
            { key: 'all', label: '全部', children: <Table columns={columns} dataSource={data} /> },
            { key: 'pending', label: '待付款', children: <Table columns={columns} dataSource={data.filter((_, i) => i % 3 === 0)} /> },
            { key: 'receiving', label: '待收货', children: <Table columns={columns} dataSource={data.filter((_, i) => i % 3 === 1)} /> },
          ]}
        />
      </div>
    </AdminLayout>
  )
}

export default DistributorAdminOrders

