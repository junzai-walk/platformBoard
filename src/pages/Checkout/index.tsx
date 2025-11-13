import Layout from '@/components/Layout'
import { Form, Input, Button, Radio, Steps } from 'antd'

const Checkout = () => {
  return (
    <Layout>
      <div className="container" style={{ padding: '24px 0' }}>
        <Steps current={1} items={[
          { title: '购物车' },
          { title: '填写订单' },
          { title: '付款成功' },
        ]} style={{ marginBottom: 32 }} />
        <h2>填写订单信息</h2>
        <Form layout="vertical" size="large">
          <Form.Item label="收货地址" name="address" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="联系人" name="contact" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="联系电话" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="支付方式" name="payment" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="alipay">支付宝</Radio>
              <Radio value="wechat">微信支付</Radio>
              <Radio value="bank">银行转账</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large">提交订单</Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  )
}

export default Checkout

