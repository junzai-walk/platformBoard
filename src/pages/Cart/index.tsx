import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { Table, Button, InputNumber, Empty, message } from 'antd'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './index.less'

interface CartItem {
  key: string
  id: string
  image: string
  name: string
  price: number
  quantity: number
}

const STORAGE_KEY = 'b2b_cart_items'

const defaultItems: CartItem[] = [
  {
    key: '1',
    id: '1',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop',
    name: '工业级电子元件批发 高品质芯片模块',
    price: 45.0,
    quantity: 100,
  },
  {
    key: '2',
    id: '2',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100&h=100&fit=crop',
    name: '高品质办公家具套装',
    price: 500.0,
    quantity: 10,
  },
]

const Cart = () => {
  const [data, setData] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error(e)
      }
    }
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems))
      return defaultItems
    }
    return []
  })

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    setSelectedRowKeys(data.map((item) => item.key))
  }, [data.length])

  const handleQuantityChange = (key: string, value: number) => {
    const updated = data.map((item) => {
      if (item.key === key) {
        return { ...item, quantity: value }
      }
      return item
    })
    setData(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const handleDelete = (key: string) => {
    const updated = data.filter((item) => item.key !== key)
    setData(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setSelectedRowKeys(selectedRowKeys.filter((k) => k !== key))
    message.success('已从购物车中删除')
  }

  const selectedItems = data.filter((item) => selectedRowKeys.includes(item.key))
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const columns = [
    {
      title: '商品信息',
      dataIndex: 'name',
      render: (_: any, record: CartItem) => (
        <div className="product-info">
          <img src={record.image} alt={record.name} />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: '单价',
      dataIndex: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      render: (qty: number, record: CartItem) => (
        <InputNumber
          min={1}
          value={qty}
          onChange={(val) => handleQuantityChange(record.key, val || 1)}
        />
      ),
    },
    {
      title: '金额',
      render: (_: any, record: CartItem) => (
        <span style={{ fontWeight: 600, color: '#ff6600' }}>
          ¥{(record.price * record.quantity).toFixed(2)}
        </span>
      ),
    },
    {
      title: '操作',
      render: (_: any, record: CartItem) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        >
          删除
        </Button>
      ),
    },
  ]

  return (
    <Layout>
      <div className="cart-page">
        <div className="container">
          <h1>购物车</h1>
          {data.length === 0 ? (
            <div className="cart-empty">
              <Empty
                image={<ShoppingCartOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />}
                description={
                  <div style={{ color: '#999', fontSize: 16 }}>
                    您的购物车空空如也，快去采购吧！
                  </div>
                }
              >
                <Link to="/">
                  <Button type="primary" size="large" className="empty-button">
                    去采购市场逛逛
                  </Button>
                </Link>
              </Empty>
            </div>
          ) : (
            <>
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: (keys) => setSelectedRowKeys(keys),
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <div className="cart-footer">
                <div className="total-section">
                  <span>已选商品: {selectedItems.length}件</span>
                  <span className="total-price">总计: ¥{totalPrice.toFixed(2)}</span>
                </div>
                <Link to="/checkout">
                  <Button type="primary" size="large" disabled={selectedItems.length === 0}>
                    去结算
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Cart

