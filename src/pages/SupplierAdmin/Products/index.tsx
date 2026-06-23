import { useState, useEffect } from 'react'
import { Button, Table, Tag, Space, Modal, message, Card, Image, Input, Select } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'
import { mockDb } from '@/utils/mockDb'
import { useAuth } from '@/contexts/AuthContext'
import { ProductDetailItem } from '@/hooks/useProductDetail'

const { Search } = Input
const { Option } = Select

const SupplierAdminProducts = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [products, setProducts] = useState<ProductDetailItem[]>([])
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const loadProducts = () => {
    const list = mockDb.getProducts()
    // 过滤出属于当前登录供应商的商品
    const supplierId = user?.id || '1'
    const filtered = list.filter((p) => p.supplier.id === supplierId)
    setProducts(filtered)
  }

  useEffect(() => {
    loadProducts()
    window.addEventListener('b2b_db_updated', loadProducts)
    return () => {
      window.removeEventListener('b2b_db_updated', loadProducts)
    }
  }, [user])

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个商品吗？删除后无法恢复。',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        mockDb.deleteProduct(id)
        loadProducts()
        message.success('删除成功')
      },
    })
  }

  const handleStatusToggle = (product: ProductDetailItem) => {
    // 模拟上下架状态
    // 在真实 mockDb 中，产品可以直接保存，我们可以利用 tags 中是否包含 '已下架' 来模拟
    const hasSoldoutTag = product.tags.includes('已下架')
    let newTags = [...product.tags]
    if (hasSoldoutTag) {
      newTags = newTags.filter((t) => t !== '已下架')
      message.success('商品上架成功')
    } else {
      newTags.push('已下架')
      message.success('商品下架成功')
    }
    
    mockDb.saveProduct({
      ...product,
      tags: newTags,
    })
    loadProducts()
  }

  const getStatusTag = (product: ProductDetailItem) => {
    const isSoldout = product.tags.includes('已下架') || product.stock === 0
    if (isSoldout) {
      return <Tag color="red">已下架</Tag>
    }
    return <Tag color="green">出售中</Tag>
  }

  const columns = [
    {
      title: '商品信息',
      key: 'info',
      width: 350,
      render: (record: ProductDetailItem) => (
        <Space>
          <Image
            src={record.images[0]}
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
      title: '起订价',
      dataIndex: 'priceLevels',
      key: 'price',
      width: 120,
      render: (priceLevels: any[]) => (
        <span style={{ color: '#ff6600', fontWeight: 600, fontSize: 16 }}>
          ¥{priceLevels[0].price.toFixed(2)}
        </span>
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
      key: 'status',
      width: 100,
      render: (record: ProductDetailItem) => getStatusTag(record),
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (record: ProductDetailItem) => {
        const isSoldout = record.tags.includes('已下架')
        return (
          <Space>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/product/${record.id}`)}
              disabled={isSoldout}
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
            <Button
              type="link"
              onClick={() => handleStatusToggle(record)}
            >
              {isSoldout ? '上架' : '下架'}
            </Button>
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) || p.id.includes(searchText)
    const isSoldout = p.tags.includes('已下架') || p.stock === 0
    const currentStatus = isSoldout ? 'soldout' : 'published'
    const matchStatus = statusFilter === 'all' || currentStatus === statusFilter
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
              <Option value="soldout">已下架</Option>
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
