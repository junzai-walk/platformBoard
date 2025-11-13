import { Table, Tag } from 'antd'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'

const SupplierAdminCustomers = () => {
  const columns = [
    { title: '客户ID', dataIndex: 'id', key: 'id' },
    { title: '公司名称', dataIndex: 'company', key: 'company' },
    { title: '联系人', dataIndex: 'contact', key: 'contact' },
    { title: '累计采购额', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: '订单数', dataIndex: 'orderCount', key: 'orderCount' },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => <Tag color="gold">{level}</Tag>,
    },
  ]

  const data = Array(10).fill(null).map((_, i) => ({
    key: i,
    id: `C${1000 + i}`,
    company: `XX有限公司${i + 1}`,
    contact: `张先生${i + 1}`,
    totalAmount: `¥${(Math.random() * 100000).toFixed(2)}`,
    orderCount: Math.floor(Math.random() * 100),
    level: ['普通客户', 'VIP客户', '金牌客户'][i % 3],
  }))

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="customers">
      <div>
        <h1>客户管理</h1>
        <Table columns={columns} dataSource={data} />
      </div>
    </AdminLayout>
  )
}

export default SupplierAdminCustomers

