import { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.less'

interface LayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

const Layout = ({ children, showHeader = true, showFooter = true }: LayoutProps) => {
  return (
    <div className="page-layout">
      {showHeader && <Header />}
      <main className="page-content">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout

