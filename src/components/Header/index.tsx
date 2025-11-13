import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input, Badge, Dropdown, Button, Space, Avatar, message } from 'antd'
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
  DownOutlined,
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAuth } from '../../contexts/AuthContext'
import './index.less'

const { Search } = Input

const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [cartCount] = useState(3)
  const { isAuthenticated, user, logout } = useAuth()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // 退出登录处理
  const handleLogout = () => {
    logout()
    message.success('退出登录成功')
    navigate('/')
  }



  // 已登录用户的下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: (
        <Link to={user?.userType === 'supplier' ? '/supplier-admin' : '/distributor-admin'}>
          <DashboardOutlined /> {user?.userType === 'supplier' ? '供应商后台' : '分销商后台'}
        </Link>
      ),
      style: { fontWeight: 600, color: '#ff6600' },
    },
    {
      type: 'divider',
    },
    {
      key: 'settings',
      label: (
        <Link to={user?.userType === 'supplier' ? '/supplier-admin/shop-settings' : '/distributor-admin/addresses'}>
          <SettingOutlined /> 账户设置
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined /> 退出登录
        </span>
      ),
      danger: true,
    },
  ]

  const languageItems: MenuProps['items'] = [
    {
      key: 'zh-CN',
      label: '中文',
      onClick: () => changeLanguage('zh-CN'),
    },
    {
      key: 'en-US',
      label: 'English',
      onClick: () => changeLanguage('en-US'),
    },
  ]

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`)
    }
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-left">
              <span>欢迎来到B2B电商平台</span>
            </div>
            <div className="header-right">
              <Dropdown menu={{ items: languageItems }} placement="bottomRight">
                <Button type="text" icon={<GlobalOutlined />}>
                  {i18n.language === 'zh-CN' ? '中文' : 'EN'} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            <Link to="/" className="logo">
              <img src="https://p0.ssl.qhimgs1.com/sdr/400__/t046232ddd22ecd2936.jpg" alt="Logo" style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 12 }} />
              <h1>跨境电商平台</h1>
            </Link>

            <div className="search-bar">
              <Search
                placeholder={t('common.searchPlaceholder')}
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
              />
            </div>

            <div className="header-actions">
              <Space size="large">
                <Link to="/cart">
                  <Badge count={cartCount} offset={[10, 0]}>
                    <ShoppingCartOutlined style={{ fontSize: 24 }} />
                  </Badge>
                </Link>

                {isAuthenticated && user ? (
                  // 已登录状态
                  <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Avatar
                        src={user.avatar}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#ff6600' }}
                      />
                      <span style={{ color: '#333' }}>{user.username}</span>
                      <DownOutlined style={{ fontSize: 12 }} />
                    </div>
                  </Dropdown>
                ) : (
                  // 未登录状态
                  <>
                    <Link to="/register-guide">
                      <Button type="default">注册</Button>
                    </Link>
                    <Link to="/login-guide">
                      <Button type="primary">登录</Button>
                    </Link>
                  </>
                )}
              </Space>
            </div>
          </div>
        </div>
      </div>

      <div className="header-nav">
        <div className="container">
          <nav className="main-nav">
            <Link to="/">{t('common.home')}</Link>
            <Link to="/categories">{t('common.category')}</Link>
            <Link to="/overseas-warehouse">{t('common.overseasWarehouse')}</Link>
            <Link to="/logistics-solutions">{t('common.logisticsSolutions')}</Link>
            <Link to="/search">{t('common.market')}</Link>
            <Link to="/supplier-register">{t('common.supplierEntry')}</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

