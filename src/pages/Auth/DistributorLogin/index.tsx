import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, Checkbox, Divider, message } from 'antd'
import { UserOutlined, LockOutlined, WechatOutlined, DingdingOutlined } from '@ant-design/icons'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import '../SupplierLogin/index.less'

const DistributorLogin = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const onFinish = (values: any) => {
    // 模拟登录验证（实际项目中应该调用API）
    if (values.username && values.password) {
      // 模拟用户数据
      const userData = {
        id: 'distributor_' + Date.now(),
        username: values.username,
        userType: 'distributor' as const,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        email: values.username + '@example.com',
        companyName: '广州市天河商贸有限公司',
        permissions: ['order:view', 'favorite:manage', 'address:manage'],
      }

      // 模拟token
      const token = 'mock_token_' + Date.now()

      // 保存登录状态
      login(userData, token)

      message.success('登录成功！')

      // 跳转逻辑：如果有来源页面，返回来源页面；否则跳转到分销商后台
      const from = (location.state as any)?.from || '/distributor-admin'
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 500)
    } else {
      message.error('请输入用户名和密码')
    }
  }

  return (
    <Layout showFooter={false}>
      <div className="login-page distributor-login">
        <div className="login-container">
          <div className="login-left" style={{ background: 'linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)' }}>
            <div className="login-banner">
              <h2>分销商登录</h2>
              <p>发现优质货源，助力业务增长</p>
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop" alt="Distributor" />
            </div>
          </div>

          <div className="login-right">
            <div className="login-form-wrapper">
              <h1>{t('auth.distributorLogin')}</h1>

              <Form
                name="distributor-login"
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

export default DistributorLogin

