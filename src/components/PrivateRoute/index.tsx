import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth, UserType } from '../../contexts/AuthContext'

interface PrivateRouteProps {
  children: React.ReactElement
  requiredUserType?: UserType // 可选：要求特定用户类型
  requireAuth?: boolean // 默认true，是否需要登录
}

/**
 * 路由守卫组件
 * 用于保护需要登录才能访问的路由
 * 支持用户类型权限验证
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredUserType,
  requireAuth = true,
}) => {
  const { isAuthenticated, user, checkAuth } = useAuth()
  const location = useLocation()

  // 如果不需要认证，直接渲染子组件
  if (!requireAuth) {
    return children
  }

  // 检查认证状态
  const isAuth = checkAuth()

  // 未登录，跳转到登录引导页，并保存当前路径
  if (!isAuth || !isAuthenticated) {
    return <Navigate to="/register-guide" state={{ from: location.pathname }} replace />
  }

  // 如果指定了用户类型要求，检查用户类型是否匹配
  if (requiredUserType && user?.userType !== requiredUserType) {
    // 用户类型不匹配，跳转到对应的后台首页
    const redirectPath = user?.userType === 'supplier' ? '/supplier-admin' : '/distributor-admin'
    return <Navigate to={redirectPath} replace />
  }

  // 认证通过，渲染子组件
  return children
}

export default PrivateRoute

