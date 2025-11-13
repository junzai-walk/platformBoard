import Layout from '@/components/Layout'
import { Card, Form, Input, Button } from 'antd'

const ContactUs = () => {
  return (
    <Layout>
      <div className="container" style={{ padding: '40px 0' }}>
        <Card>
          <h1>联系我们</h1>
          <p>如有任何问题或建议，欢迎联系我们。</p>
          <div style={{ marginTop: 32 }}>
            <h3>联系方式</h3>
            <p>客服电话: 400-888-8888</p>
            <p>邮箱: service@b2bplatform.com</p>
            <p>地址: 中国·上海·浦东新区</p>
          </div>
          <div style={{ marginTop: 32 }}>
            <h3>在线留言</h3>
            <Form layout="vertical">
              <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="留言内容" name="message" rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary">提交</Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default ContactUs

