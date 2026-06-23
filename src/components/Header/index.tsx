import { useState, useEffect } from 'react'
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
  DeleteOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAuth } from '../../contexts/AuthContext'
import { mockDb } from '../../utils/mockDb'
import './index.less'

// Removed deprecated Input.Search in favor of Space.Compact

const Header = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCart = () => {
      const items = mockDb.getCart()
      setCartItems(items)
      const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }

    updateCart()

    window.addEventListener('storage', updateCart)
    window.addEventListener('cart_updated', updateCart)
    return () => {
      window.removeEventListener('storage', updateCart)
      window.removeEventListener('cart_updated', updateCart)
    }
  }, [])

  const handleRemoveFromMiniCart = (key: string) => {
    const updated = cartItems.filter(item => item.key !== key)
    mockDb.updateCartItems(updated)
    message.success('已从购物车中删除')
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const miniCartMenu = (
    <div className="mini-cart-dropdown">
      {cartItems.length === 0 ? (
        <div className="mini-cart-empty">购物车空空如也，快去采购吧！</div>
      ) : (
        <>
          <div className="mini-cart-list">
            {cartItems.slice(0, 5).map((item) => (
              <div className="mini-cart-item" key={item.key}>
                <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                <div className="item-detail" style={{ flex: 1, minWidth: 0, padding: '0 8px' }}>
                  <div className="item-name" style={{ fontSize: 12, fontWeight: 500, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </div>
                  {item.spec && Object.keys(item.spec).length > 0 && (
                    <div className="item-spec" style={{ fontSize: 10, color: '#999' }}>
                      {Object.entries(item.spec).map(([_, v]) => `${v}`).join(' / ')}
                    </div>
                  )}
                  <div className="item-meta" style={{ fontSize: 11, marginTop: 2 }}>
                    <span className="item-price" style={{ color: '#ff6600', fontWeight: 600 }}>¥{item.price.toFixed(2)}</span>
                    <span className="item-qty" style={{ color: '#888' }}> x {item.quantity}</span>
                  </div>
                </div>
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleRemoveFromMiniCart(item.key)
                  }}
                />
              </div>
            ))}
            {cartItems.length > 5 && (
              <div className="mini-cart-more" style={{ padding: '8px 12px', fontSize: 12, color: '#999', textAlign: 'center' }}>
                还有 {cartItems.length - 5} 件商品...
              </div>
            )}
          </div>
          <div className="mini-cart-footer" style={{ padding: 12, borderTop: '1px solid #f0f0f0', background: '#fafafa', borderRadius: '0 0 8px 8px' }}>
            <div className="mini-cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: '#666' }}>总计金额：</span>
              <span className="total-amount" style={{ color: '#ff6600', fontWeight: 600 }}>¥{totalPrice.toFixed(2)}</span>
            </div>
            <Button type="primary" block onClick={() => navigate('/cart')} style={{ background: '#ff6600', borderColor: '#ff6600', height: 32, fontSize: 12 }}>
              前往购物车结算
            </Button>
          </div>
        </>
      )}
    </div>
  )

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
              <span>欢迎来到跨境电商平台</span>
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
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder={t('common.searchPlaceholder')}
                  allowClear
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onPressEnter={() => onSearch(searchText)}
                  size="large"
                  style={{
                    borderRadius: '24px 0 0 24px',
                    height: '44px',
                    fontSize: '14px',
                    border: '2px solid #e8e8e8',
                    borderRight: 'none',
                  }}
                />
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<SearchOutlined />}
                  onClick={() => onSearch(searchText)}
                  style={{
                    height: '44px',
                    borderRadius: '0 24px 24px 0',
                    background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                    border: 'none',
                    boxShadow: 'none',
                    color: 'white',
                  }}
                />
              </Space.Compact>
            </div>

            <div className="header-actions">
              <Space size="large">
                <Dropdown dropdownRender={() => miniCartMenu} placement="bottomRight">
                  <Link to="/cart">
                    <Badge count={cartCount} offset={[10, 0]}>
                      <ShoppingCartOutlined style={{ fontSize: 24 }} />
                    </Badge>
                  </Link>
                </Dropdown>

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

