import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Input, Badge, Dropdown, Button, Space } from 'antd'
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
  DownOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import './index.less'

const { Search } = Input

const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [cartCount] = useState(3)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const categoryItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/category/electronics">{t('common.category')}</Link>,
      children: [
        { key: '1-1', label: '电子产品' },
        { key: '1-2', label: '家用电器' },
      ],
    },
  ]

  const distributorItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/distributor-admin">{t('common.myBackend')}</Link>,
    },
    {
      key: '2',
      label: <Link to="/distributor-admin/orders">{t('common.messageCenter')}</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: t('common.logout'),
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
              <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop" alt="Logo" style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 12 }} />
              <h1>B2B Platform</h1>
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
                <Dropdown menu={{ items: distributorItems }} placement="bottomRight">
                  <Button type="text" icon={<UserOutlined />}>
                    {t('common.iAmDistributor')} <DownOutlined />
                  </Button>
                </Dropdown>

                <Link to="/cart">
                  <Badge count={cartCount} offset={[10, 0]}>
                    <ShoppingCartOutlined style={{ fontSize: 24 }} />
                  </Badge>
                </Link>

                <Link to="/supplier-login">
                  <Button type="primary">{t('common.supplierEntrance')}</Button>
                </Link>
              </Space>
            </div>
          </div>
        </div>
      </div>

      <div className="header-nav">
        <div className="container">
          <nav className="main-nav">
            <Link to="/">{t('common.home')}</Link>
            <Dropdown menu={{ items: categoryItems }} placement="bottom">
              <a onClick={(e) => e.preventDefault()}>
                {t('common.category')} <DownOutlined />
              </a>
            </Dropdown>
            <Link to="/search">{t('common.market')}</Link>
            <Link to="/supplier-register">{t('common.supplierEntry')}</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

