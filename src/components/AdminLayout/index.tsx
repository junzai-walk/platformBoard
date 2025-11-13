import { ReactNode, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import {
  DashboardOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  HeartOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import './index.less'

const { Header, Sider, Content } = Layout

interface AdminLayoutProps {
  children: ReactNode
  menuItems: MenuProps['items']
  selectedKey: string
}

const AdminLayout = ({ children, menuItems, selectedKey }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => navigate('/'),
    },
  ]

  return (
    <Layout className="admin-layout">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
          <Link to="/">
            <h2>{collapsed ? 'B2B' : '跨境电商平台'}</h2>
          </Link>
        </div>
        <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <div className="header-right">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="user-info">
                <Avatar icon={<UserOutlined />} />
                <span>管理员</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="admin-content">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout

export const supplierMenuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/supplier-admin">数据看板</Link>,
  },
  {
    key: 'products',
    icon: <ShoppingOutlined />,
    label: <Link to="/supplier-admin/products">商品管理</Link>,
  },
  {
    key: 'orders',
    icon: <OrderedListOutlined />,
    label: <Link to="/supplier-admin/orders">订单管理</Link>,
  },
  {
    key: 'customers',
    icon: <UserOutlined />,
    label: <Link to="/supplier-admin/customers">客户管理</Link>,
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: <Link to="/supplier-admin/analytics">营销与数据</Link>,
  },
]

export const distributorMenuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/distributor-admin">数据看板</Link>,
  },
  {
    key: 'orders',
    icon: <OrderedListOutlined />,
    label: <Link to="/distributor-admin/orders">我的采购</Link>,
  },
  {
    key: 'favorites',
    icon: <HeartOutlined />,
    label: <Link to="/distributor-admin/favorites">商品收藏</Link>,
  },
  {
    key: 'addresses',
    icon: <EnvironmentOutlined />,
    label: <Link to="/distributor-admin/addresses">地址管理</Link>,
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: <Link to="/distributor-admin/analytics">数据分析</Link>,
  },
]

