import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, Checkbox, Divider, message } from 'antd'
import { UserOutlined, LockOutlined, WechatOutlined, DingdingOutlined } from '@ant-design/icons'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import './index.less'

const SupplierLogin = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const onFinish = (values: any) => {
    // 模拟登录验证（实际项目中应该调用API）
    if (values.username && values.password) {
      // 模拟用户数据
      const userData = {
        id: 'supplier_' + Date.now(),
        username: values.username,
        userType: 'supplier' as const,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        email: values.username + '@example.com',
        companyName: '深圳市华强电子科技有限公司',
        permissions: ['product:manage', 'order:manage', 'shop:manage'],
      }

      // 模拟token
      const token = 'mock_token_' + Date.now()

      // 保存登录状态
      login(userData, token)

      message.success('登录成功！')

      // 跳转逻辑：如果有来源页面，返回来源页面；否则跳转到供应商后台
      const from = (location.state as any)?.from || '/supplier-admin'
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 500)
    } else {
      message.error('请输入用户名和密码')
    }
  }

  return (
    <Layout showFooter={false}>
      <div className="login-page supplier-login">
        <div className="login-container">
          <div className="login-left">
            <div className="login-banner">
              <h2>供应商登录</h2>
              <p>连接全球分销商，拓展您的业务</p>
              <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&h=400&fit=crop" alt="Supplier" />
            </div>
          </div>

          <div className="login-right">
            <div className="login-form-wrapper">
              <h1>{t('auth.supplierLogin')}</h1>

              <Form
                name="supplier-login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名或邮箱' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder={t('auth.username')} />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder={t('auth.password')} />
                </Form.Item>

                <Form.Item>
                  <div className="form-actions">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>{t('auth.rememberMe')}</Checkbox>
                    </Form.Item>
                    <Link to="/forgot-password" className="forgot-link">
                      {t('auth.forgotPassword')}
                    </Link>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    {t('common.login')}
                  </Button>
                </Form.Item>

                <Divider plain>{t('auth.thirdPartyLogin')}</Divider>

                <div className="third-party-login">
                  <Button icon={<WechatOutlined />} shape="circle" size="large" />
                  <Button icon={<DingdingOutlined />} shape="circle" size="large" />
                </div>

                <div className="register-link">
                  {t('auth.noAccount')}{' '}
                  <Link to="/register-guide">{t('auth.registerNow')}</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SupplierLogin

