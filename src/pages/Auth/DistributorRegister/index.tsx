import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons'
import Layout from '@/components/Layout'
import '../SupplierRegister/index.less'

const DistributorRegister = () => {
  const onFinish = (values: any) => {
    console.log('Register values:', values)
  }

  return (
    <Layout>
      <div className="register-page">
        <div className="register-container">
          <h1>分销商注册</h1>
          <Form name="distributor-register" onFinish={onFinish} size="large" layout="vertical">
            <Form.Item label="公司名称" name="companyName" rules={[{ required: true }]}>
              <Input prefix={<ShopOutlined />} placeholder="请输入公司名称" />
            </Form.Item>
            <Form.Item label="联系人" name="contactPerson" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} placeholder="请输入联系人姓名" />
            </Form.Item>
            <Form.Item label="联系电话" name="phone" rules={[{ required: true }]}>
              <Input prefix={<PhoneOutlined />} placeholder="请输入联系电话" />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, min: 6 }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>
            <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="请再次输入密码" />
            </Form.Item>
            <Form.Item name="agree" valuePropName="checked" rules={[{ required: true }]}>
              <Checkbox>我已阅读并同意服务条款和隐私政策</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>注册</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default DistributorRegister

