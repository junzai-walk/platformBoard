import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
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
    <AuthProvider>
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

          {/* 供应商后台 - 需要登录且用户类型为supplier */}
          <Route
            path="/supplier-admin"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminIndex />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/products"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/products/new"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminProductEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/products/edit/:id"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminProductEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/shop-settings"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminShopSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/orders"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/customers"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminCustomers />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier-admin/analytics"
            element={
              <PrivateRoute requiredUserType="supplier">
                <SupplierAdminAnalytics />
              </PrivateRoute>
            }
          />

          {/* 分销商后台 - 需要登录且用户类型为distributor */}
          <Route
            path="/distributor-admin"
            element={
              <PrivateRoute requiredUserType="distributor">
                <DistributorAdminIndex />
              </PrivateRoute>
            }
          />
          <Route
            path="/distributor-admin/orders"
            element={
              <PrivateRoute requiredUserType="distributor">
                <DistributorAdminOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/distributor-admin/favorites"
            element={
              <PrivateRoute requiredUserType="distributor">
                <DistributorAdminFavorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/distributor-admin/addresses"
            element={
              <PrivateRoute requiredUserType="distributor">
                <DistributorAdminAddresses />
              </PrivateRoute>
            }
          />
          <Route
            path="/distributor-admin/analytics"
            element={
              <PrivateRoute requiredUserType="distributor">
                <DistributorAdminAnalytics />
              </PrivateRoute>
            }
          />

          {/* 通用页面 */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/help-center" element={<HelpCenter />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

