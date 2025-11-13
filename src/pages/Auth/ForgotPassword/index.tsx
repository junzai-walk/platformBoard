import Layout from '@/components/Layout'
import { Form, Input, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="register-page">
        <div className="register-container">
          <h1>忘记密码</h1>
          <Form layout="vertical" size="large">
            <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<MailOutlined />} placeholder="请输入注册邮箱" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>发送重置链接</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword

