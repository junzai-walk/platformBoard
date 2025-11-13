import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SupplierLogin from './pages/Auth/SupplierLogin'
import DistributorLogin from './pages/Auth/DistributorLogin'
import RegisterGuide from './pages/Auth/RegisterGuide'
import SupplierRegister from './pages/Auth/SupplierRegister'
import DistributorRegister from './pages/Auth/DistributorRegister'
import ForgotPassword from './pages/Auth/ForgotPassword'
import CategoryPage from './pages/Category'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SupplierAdminIndex from './pages/SupplierAdmin/Index'
import SupplierAdminProducts from './pages/SupplierAdmin/Products'
import SupplierAdminProductEdit from './pages/SupplierAdmin/Products/Edit'
import SupplierAdminShopSettings from './pages/SupplierAdmin/ShopSettings'
import SupplierAdminOrders from './pages/SupplierAdmin/Orders'
import SupplierAdminCustomers from './pages/SupplierAdmin/Customers'
import SupplierAdminAnalytics from './pages/SupplierAdmin/Analytics'
import SupplierShop from './pages/SupplierShop'
import DistributorAdminIndex from './pages/DistributorAdmin/Index'
import DistributorAdminOrders from './pages/DistributorAdmin/Orders'
import DistributorAdminFavorites from './pages/DistributorAdmin/Favorites'
import DistributorAdminAddresses from './pages/DistributorAdmin/Addresses'
import DistributorAdminAnalytics from './pages/DistributorAdmin/Analytics'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import HelpCenter from './pages/HelpCenter'

function App() {
  return (
    <Router>
      <Routes>
        {/* 首页 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 用户认证 */}
        <Route path="/supplier-login" element={<SupplierLogin />} />
        <Route path="/distributor-login" element={<DistributorLogin />} />
        <Route path="/register-guide" element={<RegisterGuide />} />
        <Route path="/supplier-register" element={<SupplierRegister />} />
        <Route path="/distributor-register" element={<DistributorRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* 核心前台页面 */}
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/supplier-shop/:supplierId" element={<SupplierShop />} />
        
        {/* 供应商后台 */}
        <Route path="/supplier-admin" element={<SupplierAdminIndex />} />
        <Route path="/supplier-admin/products" element={<SupplierAdminProducts />} />
        <Route path="/supplier-admin/products/new" element={<SupplierAdminProductEdit />} />
        <Route path="/supplier-admin/products/edit/:id" element={<SupplierAdminProductEdit />} />
        <Route path="/supplier-admin/shop-settings" element={<SupplierAdminShopSettings />} />
        <Route path="/supplier-admin/orders" element={<SupplierAdminOrders />} />
        <Route path="/supplier-admin/customers" element={<SupplierAdminCustomers />} />
        <Route path="/supplier-admin/analytics" element={<SupplierAdminAnalytics />} />
        
        {/* 分销商后台 */}
        <Route path="/distributor-admin" element={<DistributorAdminIndex />} />
        <Route path="/distributor-admin/orders" element={<DistributorAdminOrders />} />
        <Route path="/distributor-admin/favorites" element={<DistributorAdminFavorites />} />
        <Route path="/distributor-admin/addresses" element={<DistributorAdminAddresses />} />
        <Route path="/distributor-admin/analytics" element={<DistributorAdminAnalytics />} />
        
        {/* 通用页面 */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/help-center" element={<HelpCenter />} />
      </Routes>
    </Router>
  )
}

export default App

