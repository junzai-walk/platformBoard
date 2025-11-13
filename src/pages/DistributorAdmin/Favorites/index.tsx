import { Table, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'

const DistributorAdminFavorites = () => {
  const columns = [
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier' },
    { title: '价格', dataIndex: 'price', key: 'price' },
    { title: '收藏时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" danger icon={<DeleteOutlined />}>
          取消收藏
        </Button>
      ),
    },
  ]

  const data = Array(10).fill(null).map((_, i) => ({
    key: i,
    name: `商品名称 ${i + 1}`,
    supplier: `供应商${i + 1}`,
    price: `¥${(Math.random() * 100).toFixed(2)}`,
    createTime: '2025-01-01 10:00:00',
  }))

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="favorites">
      <div>
        <h1>商品收藏</h1>
        <Table columns={columns} dataSource={data} />
      </div>
    </AdminLayout>
  )
}

export default DistributorAdminFavorites

