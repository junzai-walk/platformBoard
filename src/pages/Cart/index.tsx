import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { Table, Button, InputNumber, Checkbox } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'

const Cart = () => {
  const columns = [
    {
      title: <Checkbox />,
      dataIndex: 'select',
      render: () => <Checkbox />,
    },
    {
      title: '商品信息',
      dataIndex: 'product',
      render: (text: string, record: any) => (
        <div className="product-info">
          <img src={record.image} alt={record.name} />
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: '单价', dataIndex: 'price' },
    {
      title: '数量',
      dataIndex: 'quantity',
      render: (qty: number) => <InputNumber min={1} defaultValue={qty} />,
    },
    { title: '金额', dataIndex: 'total' },
    {
      title: '操作',
      render: () => <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>,
    },
  ]

  const data = [
    {
      key: '1',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      name: '商品名称1',
      price: '¥10.00',
      quantity: 100,
      total: '¥1000.00',
    },
    {
      key: '2',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop',
      name: '商品名称2',
      price: '¥20.00',
      quantity: 50,
      total: '¥1000.00',
    },
  ]

  return (
    <Layout>
      <div className="cart-page">
        <div className="container">
          <h1>购物车</h1>
          <Table columns={columns} dataSource={data} pagination={false} />
          <div className="cart-footer">
            <div className="total-section">
              <span>已选商品: 2件</span>
              <span className="total-price">总计: ¥2000.00</span>
            </div>
            <Link to="/checkout">
              <Button type="primary" size="large">去结算</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart

