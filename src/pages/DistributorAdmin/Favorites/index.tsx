import { useState, useEffect } from 'react'
import { Table, Button, Space, message, Card } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'
import { mockDb } from '@/utils/mockDb'
import { ProductDetailItem } from '@/hooks/useProductDetail'

const DistributorAdminFavorites = () => {
  const [favorites, setFavorites] = useState<ProductDetailItem[]>([])
  const navigate = useNavigate()

  const loadFavorites = () => {
    const favIds = mockDb.getFavorites()
    const allProducts = mockDb.getProducts()
    const favProducts = allProducts.filter((p) => favIds.includes(p.id))
    setFavorites(favProducts)
  }

  useEffect(() => {
    loadFavorites()
    window.addEventListener('b2b_db_updated', loadFavorites)
    return () => {
      window.removeEventListener('b2b_db_updated', loadFavorites)
    }
  }, [])

  const handleRemove = (productId: string) => {
    mockDb.toggleFavorite(productId)
    message.success('已取消收藏')
    loadFavorites()
  }

  const handleAddToCart = (product: ProductDetailItem) => {
    // 加入默认规格和数量的商品到购物车
    const cartList = mockDb.getCart()
    const defaultSpec: { [key: string]: string } = {}
    Object.entries(product.specs).forEach(([key, values]) => {
      if (values && values.length > 0) {
        defaultSpec[key] = values[0]
      }
    })

    const price = product.priceLevels[0].price
    const minQty = product.priceLevels[0].minQuantity
    const cartItemId = `${product.id}-${Object.values(defaultSpec).join('-')}`
    
    const existingIndex = cartList.findIndex((item: any) => item.cartItemId === cartItemId)
    if (existingIndex > -1) {
      cartList[existingIndex].quantity += minQty
    } else {
      cartList.push({
        key: cartItemId,
        cartItemId: cartItemId,
        id: product.id,
        image: product.images[0],
        name: product.name,
        price: price,
        quantity: minQty,
        unit: product.unit,
        spec: defaultSpec,
      })
    }

    mockDb.updateCartItems(cartList)
    message.success(`成功将 ${product.name} 加入购物车！`)
  }

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'images',
      key: 'image',
      width: 100,
      render: (images: string[]) => (
        <img src={images[0]} alt="商品" style={{ width: 60, height: 60, borderRadius: 6, objectFit: 'cover' }} />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: ProductDetailItem) => (
        <Link to={`/product/${record.id}`} style={{ fontWeight: 500, color: '#333' }}>
          {name}
        </Link>
      ),
    },
    {
      title: '供应商',
      dataIndex: ['supplier', 'name'],
      key: 'supplier',
    },
    {
      title: '起订单价',
      dataIndex: 'priceLevels',
      key: 'price',
      render: (priceLevels: any[]) => `¥${priceLevels[0].price.toFixed(2)}`,
    },
    {
      title: '起订量',
      dataIndex: 'priceLevels',
      key: 'moq',
      render: (priceLevels: any[], record: ProductDetailItem) => `${priceLevels[0].minQuantity} ${record.unit}`,
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (_: any, record: ProductDetailItem) => (
        <Space size="middle">
          <Button 
            type="primary" 
            size="small"
            icon={<ShoppingCartOutlined />} 
            onClick={() => handleAddToCart(record)}
            style={{ background: '#ff6600', borderColor: '#ff6600' }}
          >
            加入购物车
          </Button>
          <Button 
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/product/${record.id}`)}
          >
            查看详情
          </Button>
          <Button 
            type="link" 
            danger 
            size="small"
            icon={<DeleteOutlined />} 
            onClick={() => handleRemove(record.id)}
          >
            取消收藏
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="favorites">
      <Card title={<h2>我的商品收藏 ({favorites.length})</h2>}>
        <Table 
          columns={columns} 
          dataSource={favorites} 
          rowKey="id" 
          locale={{ emptyText: '暂无收藏的商品，快去采购市场逛逛吧！' }}
        />
      </Card>
    </AdminLayout>
  )
}

export default DistributorAdminFavorites
