import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import './index.less'

const SupplierRegister = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const onFinish = (values: any) => {
    // 验证密码一致性
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致！')
      return
    }

    // 创建用户数据
    const userData = {
      id: 'supplier_' + Date.now(),
      username: values.contactPerson,
      userType: 'supplier' as const,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      email: values.email,
      phone: values.phone,
      companyName: values.companyName,
      permissions: ['product:manage', 'order:manage', 'shop:manage'],
    }

    // 生成Token
    const token = 'mock_token_' + Date.now()

    // 保存到认证上下文和localStorage
    login(userData, token)

    // 显示成功提示
    message.success('注册成功！正在跳转到供应商后台...')

    // 延迟跳转到供应商后台
    setTimeout(() => {
      navigate('/supplier-admin', { replace: true })
    }, 1000)
  }

  return (
    <Layout>
      <div className="register-page">
        <div className="register-container">
          <h1>供应商注册</h1>
          <Form name="supplier-register" onFinish={onFinish} size="large" layout="vertical">
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

export default SupplierRegister

