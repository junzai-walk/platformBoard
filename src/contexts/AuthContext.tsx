import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 用户类型
export type UserType = 'supplier' | 'distributor'

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  userType: UserType
  avatar?: string
  email?: string
  phone?: string
  companyName?: string
  permissions?: string[]
}

// 认证状态接口
export interface AuthState {
  isAuthenticated: boolean
  user: UserInfo | null
  token: string | null
  loginTime: number | null
}

// 认证上下文接口
export interface AuthContextType extends AuthState {
  login: (user: UserInfo, token: string) => void
  logout: () => void
  updateUser: (user: Partial<UserInfo>) => void
  checkAuth: () => boolean
}

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// LocalStorage 键名
const AUTH_STORAGE_KEY = 'b2b_auth_state'

// 从 localStorage 加载认证状态
const loadAuthState = (): AuthState => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      const state = JSON.parse(stored) as AuthState
      // 检查token是否过期（24小时）
      const now = Date.now()
      const loginTime = state.loginTime || 0
      const isExpired = now - loginTime > 24 * 60 * 60 * 1000
      
      if (isExpired) {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return {
          isAuthenticated: false,
          user: null,
          token: null,
          loginTime: null,
        }
      }
      
      return state
    }
  } catch (error) {
    console.error('Failed to load auth state:', error)
  }
  
  return {
    isAuthenticated: false,
    user: null,
    token: null,
    loginTime: null,
  }
}

// 保存认证状态到 localStorage
const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save auth state:', error)
  }
}

// Provider 组件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(loadAuthState)

  // 登录
  const login = (user: UserInfo, token: string) => {
    const newState: AuthState = {
      isAuthenticated: true,
      user,
      token,
      loginTime: Date.now(),
    }
    setAuthState(newState)
    saveAuthState(newState)
  }

  // 退出登录
  const logout = () => {
    const newState: AuthState = {
      isAuthenticated: false,
      user: null,
      token: null,
      loginTime: null,
    }
    setAuthState(newState)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  // 更新用户信息
  const updateUser = (updates: Partial<UserInfo>) => {
    if (authState.user) {
      const newState: AuthState = {
        ...authState,
        user: { ...authState.user, ...updates },
      }
      setAuthState(newState)
      saveAuthState(newState)
    }
  }

  // 检查认证状态
  const checkAuth = (): boolean => {
    if (!authState.isAuthenticated || !authState.token || !authState.loginTime) {
      return false
    }
    
    // 检查token是否过期
    const now = Date.now()
    const isExpired = now - authState.loginTime > 24 * 60 * 60 * 1000
    
    if (isExpired) {
      logout()
      return false
    }
    
    return true
  }

  // 初始化时检查认证状态
  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 自定义 Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

