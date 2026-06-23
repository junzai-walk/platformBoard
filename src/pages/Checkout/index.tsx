import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { Form, Input, Button, Radio, Steps, Card, Select, Divider, message, Row, Col, Space, Result } from 'antd'
import { EnvironmentOutlined, ShoppingCartOutlined, WalletOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { mockDb, Order, OrderItem } from '@/utils/mockDb'
import { useAuth } from '@/contexts/AuthContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form] = Form.useForm()

  const [currentStep, setCurrentStep] = useState(1) // 0: 购物车, 1: 填写订单, 2: 付款成功
  const [cartItems, setCartItems] = useState<any[]>([])
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [newOrders, setNewOrders] = useState<Order[]>([])

  // 加载购物车和地址
  useEffect(() => {
    const items = mockDb.getCart()
    if (items.length === 0 && currentStep === 1) {
      message.warning('您的购物车为空，请先添加商品')
      navigate('/cart')
      return
    }

    // 重新计算阶梯价
    const itemsWithTierPrices = items.map((item: any) => {
      const product = mockDb.getProductById(item.id)
      if (product) {
        const level = product.priceLevels.find(
          (l: any) => item.quantity >= l.minQuantity && (l.maxQuantity === null || item.quantity <= l.maxQuantity)
        )
        const activePrice = level ? level.price : product.priceLevels[0].price
        return {
          ...item,
          price: activePrice,
          supplierId: product.supplier.id,
          supplierName: product.supplier.name,
        }
      }
      return item
    })

    setCartItems(itemsWithTierPrices)

    const addrList = mockDb.getAddresses()
    setAddresses(addrList)

    const defaultAddr = addrList.find((a: any) => a.isDefault) || addrList[0]
    if (defaultAddr) {
      setSelectedAddressId(defaultAddr.id)
      form.setFieldsValue({
        addressId: defaultAddr.id,
        contact: defaultAddr.name,
        phone: defaultAddr.phone,
      })
    }
  }, [navigate])

  const handleAddressChange = (value: number) => {
    setSelectedAddressId(value)
    const addr = addresses.find((a: any) => a.id === value)
    if (addr) {
      form.setFieldsValue({
        contact: addr.name,
        phone: addr.phone,
      })
    }
  }

  // 计算订单总价
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 提交订单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const addr = addresses.find((a: any) => a.id === selectedAddressId)
      if (!addr) {
        message.error('请选择有效的收货地址')
        return
      }

      const fullAddressString = `${addr.province} ${addr.city} ${addr.district} ${addr.detail}`
      
      // 按供应商分组，B2B订单分单逻辑
      const itemsBySupplier: { [key: string]: { name: string; items: any[] } } = {}
      cartItems.forEach((item) => {
        const supId = item.supplierId || 'unknown'
        const supName = item.supplierName || '平台直营店'
        if (!itemsBySupplier[supId]) {
          itemsBySupplier[supId] = { name: supName, items: [] }
        }
        itemsBySupplier[supId].items.push(item)
      })

      const createdOrders: Order[] = []
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19)

      Object.entries(itemsBySupplier).forEach(([supId, group]) => {
        const orderNo = `O${Date.now()}${Math.floor(Math.random() * 90 + 10)}`
        const orderAmount = group.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        
        const orderItems: OrderItem[] = group.items.map((item) => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit || '件',
          spec: item.spec || {},
        }))

        const newOrder: Order = {
          key: orderNo,
          orderNo: orderNo,
          supplierId: supId,
          supplierName: group.name,
          distributorId: user?.id || 'distributor_demo',
          distributorName: user?.username || '张三 (演示分销商)',
          amount: orderAmount,
          status: '待付款',
          createTime: nowStr,
          address: fullAddressString,
          contact: values.contact,
          phone: values.phone,
          items: orderItems,
        }

        mockDb.saveOrder(newOrder)
        createdOrders.push(newOrder)
      })

      setNewOrders(createdOrders)
      // 清空购物车
      mockDb.clearCart()
      setCurrentStep(2)
      message.success('订单提交成功，请进行付款')
    } catch (e) {
      console.error(e)
    }
  }

  // 模拟支付
  const handlePay = (orderNo: string) => {
    mockDb.updateOrderStatus(orderNo, '待发货')
    message.success(`订单 ${orderNo} 支付成功！`)
    setNewOrders(prev => prev.map(o => o.orderNo === orderNo ? { ...o, status: '待发货' } : o))
  }

  return (
    <Layout>
      <div className="container" style={{ padding: '40px 0', minHeight: 'calc(100vh - 280px)' }}>
        <Steps
          current={currentStep}
          items={[
            { title: '购物车', icon: <ShoppingCartOutlined /> },
            { title: '填写订单', icon: <EnvironmentOutlined /> },
            { title: '完成购买', icon: <CheckCircleOutlined /> },
          ]}
          style={{ marginBottom: 40, maxWidth: 800, margin: '0 auto 40px' }}
        />

        {currentStep === 1 && (
          <Row gutter={24}>
            {/* 左侧：地址与支付 */}
            <Col xs={24} lg={16}>
              <Card title={<Space><EnvironmentOutlined /><span>收货信息</span></Space>} style={{ marginBottom: 24, borderRadius: 12 }}>
                <Form form={form} layout="vertical" size="large">
                  <Form.Item label="选择地址簿" name="addressId" rules={[{ required: true, message: '请选择收货地址' }]}>
                    <Select
                      placeholder="从地址簿选择收货地址"
                      onChange={handleAddressChange}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <div style={{ padding: '0 8px 4px', textAlign: 'right' }}>
                            <Link to="/distributor-admin/addresses" target="_blank">
                              <Button type="link" size="small">管理收货地址</Button>
                            </Link>
                          </div>
                        </>
                      )}
                    >
                      {addresses.map((addr) => (
                        <Select.Option key={addr.id} value={addr.id}>
                          {`[${addr.isDefault ? '默认' : '备选'}] ${addr.name} - ${addr.province} ${addr.city} ${addr.district} ${addr.detail}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="联系人姓名" name="contact" rules={[{ required: true, message: '请填写联系人姓名' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="联系人电话" name="phone" rules={[{ required: true, message: '请填写联系人电话' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="支付方式" name="payment" initialValue="alipay" rules={[{ required: true }]}>
                    <Radio.Group style={{ width: '100%' }}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <Radio.Button value="alipay" style={{ width: '100%', textAlign: 'center', height: 48, lineHeight: '46px' }}>
                            <Space><WalletOutlined style={{ color: '#1890ff' }} /><span>支付宝</span></Space>
                          </Radio.Button>
                        </Col>
                        <Col span={8}>
                          <Radio.Button value="wechat" style={{ width: '100%', textAlign: 'center', height: 48, lineHeight: '46px' }}>
                            <Space><WalletOutlined style={{ color: '#52c41a' }} /><span>微信支付</span></Space>
                          </Radio.Button>
                        </Col>
                        <Col span={8}>
                          <Radio.Button value="bank" style={{ width: '100%', textAlign: 'center', height: 48, lineHeight: '46px' }}>
                            <Space><WalletOutlined style={{ color: '#fa8c16' }} /><span>银行电汇</span></Space>
                          </Radio.Button>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Card>

              {/* 订单项明细 */}
              <Card title={<Space><ShoppingCartOutlined /><span>商品明细</span></Space>} style={{ borderRadius: 12 }}>
                {cartItems.map((item) => (
                  <div key={item.key} style={{ display: 'flex', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <img src={item.image} alt={item.name} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
                    <div style={{ flex: 1, paddingLeft: 16, minWidth: 0 }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                      <div style={{ color: '#999', fontSize: 12, marginBottom: 8 }}>
                        {Object.values(item.spec || {}).map((v: any) => `${v}`).join(' / ')}
                      </div>
                      <div style={{ color: '#ff6600', fontSize: 13, fontWeight: 500 }}>
                        提供商: {item.supplierName}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', paddingLeft: 24 }}>
                      <div style={{ fontWeight: 600, color: '#333', fontSize: 15 }}>¥{item.price.toFixed(2)}</div>
                      <div style={{ color: '#999', fontSize: 13, margin: '4px 0' }}>x{item.quantity} {item.unit}</div>
                      <div style={{ fontWeight: 600, color: '#ff6600', fontSize: 15 }}>¥{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </Card>
            </Col>

            {/* 右侧：总额汇总 */}
            <Col xs={24} lg={8}>
              <Card style={{ borderRadius: 12, position: 'sticky', top: 120 }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: 18 }}>费用总计</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#666' }}>
                  <span>商品小计</span>
                  <span>¥{totalPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#666' }}>
                  <span>运费（大宗托运协议）</span>
                  <span style={{ color: '#52c41a' }}>免运费 / 协议到付</span>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>应付总额</span>
                  <span style={{ fontWeight: 700, fontSize: 22, color: '#ff6600' }}>¥{totalPrice.toFixed(2)}</span>
                </div>
                <Button type="primary" size="large" block onClick={handleSubmit} style={{ background: '#ff6600', borderColor: '#ff6600', height: 48, borderRadius: 24, fontSize: 16, fontWeight: 600 }}>
                  提交订单并支付
                </Button>
              </Card>
            </Col>
          </Row>
        )}

        {currentStep === 2 && (
          <Card style={{ borderRadius: 12, padding: '24px 0' }}>
            <Result
              status="success"
              title="订单提交成功！"
              subTitle={`已为您生成 ${newOrders.length} 个采购订单，订单已按不同供应商自动拆分。`}
              extra={[
                <Link to="/distributor-admin/orders" key="orders">
                  <Button type="primary" size="large" style={{ background: '#ff6600', borderColor: '#ff6600' }}>
                    查看订单列表
                  </Button>
                </Link>,
                <Link to="/" key="market">
                  <Button size="large">继续采购</Button>
                </Link>
              ]}
            >
              <div style={{ background: '#fafafa', padding: 24, borderRadius: 8, maxWidth: 600, margin: '24px auto 0' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: 16 }}>待付款子订单列表：</h4>
                {newOrders.map((order) => (
                  <div key={order.orderNo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div>
                      <div style={{ fontWeight: 500, color: '#333' }}>订单号：{order.orderNo}</div>
                      <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>供货商：{order.supplierName}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ color: '#ff6600', fontWeight: 600 }}>¥{order.amount.toFixed(2)}</span>
                      {order.status === '待付款' ? (
                        <Button type="primary" danger size="small" onClick={() => handlePay(order.orderNo)}>
                          点击模拟支付
                        </Button>
                      ) : (
                        <span style={{ color: '#52c41a', fontWeight: 500 }}>已支付 (待发货)</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Result>
          </Card>
        )}
      </div>
    </Layout>
  )
}

export default Checkout
