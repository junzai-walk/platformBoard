import { useState } from 'react'
import { Button, Table, Tag, Space, Modal, message, Card, Image, Input, Select } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'

const { Search } = Input
const { Option } = Select

interface Product {
  id: string
  name: string
  image: string
  category: string
  stock: number
  price: string
  sales: number
  status: 'published' | 'draft' | 'soldout'
}

const SupplierAdminProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>(
    Array(12)
      .fill(null)
      .map((_, i) => ({
        id: `P${1000 + i}`,
        name: `工业级${['电子元件', '机械设备', '五金工具', '办公用品'][i % 4]} ${i + 1}`,
        image: `https://images.unsplash.com/photo-${
          [
            '1518770660439-4636190af475',
            '1581092160562-40aa08e78837',
            '1572635196237-14b3f281503f',
            '1484480974693-6ca0a78fb36b',
          ][i % 4]
        }?w=100&h=100&fit=crop`,
        category: ['电子元器件', '机械设备', '五金工具', '办公用品'][i % 4],
        stock: Math.floor(Math.random() * 1000) + 100,
        price: `¥${(Math.random() * 100 + 10).toFixed(2)}`,
        sales: Math.floor(Math.random() * 5000),
        status: ['published', 'draft', 'soldout'][i % 3] as 'published' | 'draft' | 'soldout',
      }))
  )

  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个商品吗？删除后无法恢复。',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        setProducts(products.filter((p) => p.id !== id))
        message.success('删除成功')
      },
    })
  }

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft' | 'soldout') => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    message.success('状态更新成功')
  }

  const getStatusTag = (status: string) => {
    const statusMap = {
      published: { color: 'green', text: '出售中' },
      draft: { color: 'default', text: '草稿' },
      soldout: { color: 'red', text: '已售罄' },
    }
    const config = statusMap[status as keyof typeof statusMap]
    return <Tag color={config.color}>{config.text}</Tag>
  }

  const columns = [
    {
      title: '商品信息',
      key: 'info',
      width: 350,
      render: (record: Product) => (
        <Space>
          <Image
            src={record.image}
            width={60}
            height={60}
            style={{ borderRadius: 8, objectFit: 'cover' }}
            preview={false}
          />
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: '#999' }}>ID: {record.id}</div>
            <div style={{ fontSize: 12, color: '#999' }}>分类: {record.category}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: string) => (
        <span style={{ color: '#ff6600', fontWeight: 600, fontSize: 16 }}>{price}</span>
      ),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      render: (stock: number) => (
        <span style={{ color: stock < 100 ? '#ff4d4f' : '#52c41a' }}>{stock}</span>
      ),
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (record: Product) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/product/${record.id}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/supplier-admin/products/edit/${record.id}`)}
          >
            编辑
          </Button>
          {record.status === 'published' && (
            <Button
              type="link"
              onClick={() => handleStatusChange(record.id, 'soldout')}
            >
              下架
            </Button>
          )}
          {record.status !== 'published' && (
            <Button
              type="link"
              onClick={() => handleStatusChange(record.id, 'published')}
            >
              上架
            </Button>
          )}
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) || p.id.includes(searchText)
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="products">
      <Card>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0 }}>商品管理</h2>
              <p style={{ color: '#666', margin: '8px 0 0 0' }}>
                管理您的商品信息，共 {products.length} 个商品
              </p>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => navigate('/supplier-admin/products/new')}
            >
              发布新商品
            </Button>
          </div>

          <Space size="middle" style={{ width: '100%' }}>
            <Search
              placeholder="搜索商品名称或ID"
              allowClear
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
            >
              <Option value="all">全部状态</Option>
              <Option value="published">出售中</Option>
              <Option value="draft">草稿</Option>
              <Option value="soldout">已售罄</Option>
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
          }}
        />
      </Card>
    </AdminLayout>
  )
}

export default SupplierAdminProducts

