import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './App.tsx'
import './i18n/config'
import './styles/global.less'

// 注释掉autofit.js以修复滚动问题
// import autofit from 'autofit.js'
// autofit.init({
//   designHeight: 1080,
//   designWidth: 1920,
//   renderDom: '#root',
//   resize: true,
// })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#ff6600',
          colorLink: '#ff6600',
          borderRadius: 8,
          fontSize: 14,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)

