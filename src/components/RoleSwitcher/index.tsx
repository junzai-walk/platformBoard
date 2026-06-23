import { useState } from 'react'
import { Button, Tooltip, message, Badge } from 'antd'
import { SwitcherOutlined, UserOutlined, ShopOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuth, UserInfo } from '../../contexts/AuthContext'
import './index.less'

const RoleSwitcher = () => {
  const { isAuthenticated, user, login, logout } = useAuth()
  const [expanded, setExpanded] = useState(false)

  const demoDistributor: UserInfo = {
    id: 'distributor_demo',
    username: '张三 (演示分销商)',
    userType: 'distributor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    email: 'distributor@demo.com',
    phone: '13800138000',
    companyName: '大通采购贸易有限公司',
  }

  const demoSupplier: UserInfo = {
    id: '1',
    username: '华强电子 (演示供应商)',
    userType: 'supplier',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    email: 'supplier@demo.com',
    phone: '13911112222',
    companyName: '深圳市华强电子科技有限公司',
  }

  const handleSwitch = (type: 'distributor' | 'supplier') => {
    const targetUser = type === 'distributor' ? demoDistributor : demoSupplier
    login(targetUser, `demo_token_${type}`)
    message.success(`成功切换为：${targetUser.username}`)
    setExpanded(false)
    // 延迟刷新以确保 Context 更新和重定向
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleLogout = () => {
    logout()
    message.success('已退出登录')
    setExpanded(false)
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }

  const getRoleLabel = () => {
    if (!isAuthenticated || !user) return '未登录'
    return user.userType === 'supplier' ? '供应商' : '分销商'
  }

  const getRoleColor = () => {
    if (!isAuthenticated || !user) return '#bfbfbf'
    return user.userType === 'supplier' ? '#1890ff' : '#ff6600'
  }

  return (
    <div className={`role-switcher-container ${expanded ? 'expanded' : ''}`}>
      {expanded ? (
        <div className="switcher-panel">
          <div className="panel-header">
            <h4>演示账号快速切换</h4>
            <span className="close-btn" onClick={() => setExpanded(false)}>×</span>
          </div>
          <div className="panel-body">
            <div className="current-status">
              <span>当前状态：</span>
              <Badge color={getRoleColor()} text={getRoleLabel()} />
              {user && <div className="user-name">{user.username}</div>}
            </div>
            
            <div className="action-buttons">
              <Button 
                type={user?.userType === 'distributor' ? 'primary' : 'default'} 
                icon={<UserOutlined />}
                onClick={() => handleSwitch('distributor')}
                block
                style={{ marginBottom: 8, background: user?.userType === 'distributor' ? '#ff6600' : undefined, borderColor: user?.userType === 'distributor' ? '#ff6600' : undefined }}
              >
                切为分销商 (张三)
              </Button>
              <Button 
                type={user?.userType === 'supplier' ? 'primary' : 'default'} 
                icon={<ShopOutlined />}
                onClick={() => handleSwitch('supplier')}
                block
                style={{ marginBottom: 8 }}
              >
                切为供应商 (华强电子)
              </Button>
              {isAuthenticated && (
                <Button 
                  danger 
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  block
                >
                  退出登录
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Tooltip title="快速切换演示角色" placement="right">
          <Button
            type="primary"
            shape="circle"
            icon={<SwitcherOutlined />}
            size="large"
            className="switcher-trigger-btn"
            onClick={() => setExpanded(true)}
            style={{
              background: getRoleColor(),
              borderColor: getRoleColor(),
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
        </Tooltip>
      )}
    </div>
  )
}

export default RoleSwitcher
