import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Input, Select, Button } from 'antd'
import { 
  SearchOutlined, 
  RedoOutlined, 
  FilterOutlined, 
  DownOutlined, 
  UpOutlined,
  CheckOutlined,
  ShoppingOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  RocketOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Layout from '@/components/Layout'
import { useCategories } from '@/hooks/useCategories'
import './index.less'

const CategoriesPage = () => {
  const { t } = useTranslation()
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  
  const {
    searchTerm,
    setSearchTerm,
    selectedSector,
    setSelectedSector,
    productRange,
    setProductRange,
    sortBy,
    setSortBy,
    moqFilter,
    setMoqFilter,
    selectedSupplierTypes,
    setSelectedSupplierTypes,
    selectedServices,
    setSelectedServices,
    filteredCategories,
    resetFilters,
    isFiltered,
    filteredCategoriesCount,
    totalProductsCount,
    language
  } = useCategories()

  const sectors = [
    { key: 'all', label: t('categories.allSectors') },
    { key: 'industrial', label: t('categories.sectors.industrial') },
    { key: 'consumer', label: t('categories.sectors.consumer') },
    { key: 'tech', label: t('categories.sectors.tech') },
    { key: 'business', label: t('categories.sectors.business') }
  ]

  const supplierOptions = [
    { key: 'verified', label: t('categories.suppliers.verified') },
    { key: 'factory', label: t('categories.suppliers.factory') },
    { key: 'gold', label: t('categories.suppliers.gold') }
  ]

  const serviceOptions = [
    { key: 'warehouse', label: t('categories.serviceItems.warehouse') },
    { key: 'installation', label: t('categories.serviceItems.installation') },
    { key: 'sample', label: t('categories.serviceItems.sample') },
    { key: 'fast', label: t('categories.serviceItems.fast') }
  ]

  const handleToggleSupplierType = (type: string) => {
    setSelectedSupplierTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleToggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    )
  }

  return (
    <Layout>
      <div className="categories-page">
        {/* Hero Section */}
        <div className="categories-hero">
          <div className="hero-bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
          <div className="container">
            <h1 className="hero-title">{t('categories.title')}</h1>
            <p className="hero-subtitle">{t('categories.subtitle')}</p>
            <div className="search-wrapper">
              <Input
                placeholder={t('categories.searchPlaceholder')}
                allowClear
                size="large"
                value={searchTerm}
                prefix={<SearchOutlined className="search-icon" />}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="elegant-search-input"
              />
            </div>
          </div>
        </div>

        {/* Filters Panel & Grid */}
        <div className="container main-content">
          {/* Elegant Filter Panel */}
          <div className="filter-panel animate-fade-in">
            <div className="filter-header">
              <div className="filter-title-wrapper">
                <FilterOutlined className="title-icon" />
                <span className="filter-title">{t('categories.filters')}</span>
              </div>
              <div className="filter-actions">
                <Button 
                  type="text" 
                  icon={showAdvancedFilters ? <UpOutlined /> : <DownOutlined />} 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="toggle-filters-btn"
                >
                  {showAdvancedFilters ? t('categories.lessFilters') : t('categories.moreFilters')}
                </Button>
                {isFiltered && (
                  <Button 
                    type="text" 
                    icon={<RedoOutlined />} 
                    onClick={resetFilters}
                    className="reset-btn"
                  >
                    {t('categories.reset')}
                  </Button>
                )}
              </div>
            </div>

            <div className="filter-body">
              {/* Sector Tabs (Capsules) */}
              <div className="sector-tabs-row">
                <span className="filter-label">{t('categories.sector')}:</span>
                <div className="sector-tabs">
                  {sectors.map(sector => (
                    <button
                      key={sector.key}
                      className={`sector-tab-btn ${selectedSector === sector.key ? 'active' : ''}`}
                      onClick={() => setSelectedSector(sector.key)}
                    >
                      {sector.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collapsible Advanced Filters Section */}
              <div className={`advanced-filters-section ${showAdvancedFilters ? 'expanded' : ''}`}>
                <div className="advanced-filters-inner">
                  {/* Select filters row */}
                  <div className="select-filters-row">
                    <div className="filter-select-group">
                      <span className="filter-label">{t('categories.productRange')}:</span>
                      <Select
                        value={productRange}
                        onChange={setProductRange}
                        className="elegant-select"
                        popupClassName="elegant-select-dropdown"
                        options={[
                          { value: 'all', label: t('categories.all') },
                          { value: 'under5k', label: t('categories.rangeUnder5k') },
                          { value: '5kTo10k', label: t('categories.range5kTo10k') },
                          { value: '10kTo15k', label: t('categories.range10kTo15k') },
                          { value: 'over15k', label: t('categories.rangeOver15k') }
                        ]}
                      />
                    </div>

                    <div className="filter-select-group">
                      <span className="filter-label">{t('categories.moq')}:</span>
                      <Select
                        value={moqFilter}
                        onChange={setMoqFilter}
                        className="elegant-select"
                        popupClassName="elegant-select-dropdown"
                        options={[
                          { value: 'all', label: t('categories.allMoq') },
                          { value: 'under10', label: t('categories.moqUnder10') },
                          { value: 'under50', label: t('categories.moqUnder50') },
                          { value: 'over50', label: t('categories.moqOver50') }
                        ]}
                      />
                    </div>

                    <div className="filter-select-group">
                      <span className="filter-label">{t('categories.sortBy')}:</span>
                      <Select
                        value={sortBy}
                        onChange={setSortBy}
                        className="elegant-select"
                        popupClassName="elegant-select-dropdown"
                        options={[
                          { value: 'default', label: t('categories.sortDefault') },
                          { value: 'countDesc', label: t('categories.sortCountDesc') },
                          { value: 'countAsc', label: t('categories.sortCountAsc') },
                          { value: 'nameAsc', label: t('categories.sortNameAsc') }
                        ]}
                      />
                    </div>
                  </div>

                  {/* Multi-select Tags rows */}
                  <div className="tags-filters-row">
                    <div className="filter-tag-group">
                      <span className="filter-label">{t('categories.supplierType')}:</span>
                      <div className="multi-select-tags">
                        {supplierOptions.map(option => {
                          const isSelected = selectedSupplierTypes.includes(option.key)
                          return (
                            <button
                              key={option.key}
                              className={`filter-pill-tag ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleToggleSupplierType(option.key)}
                            >
                              {isSelected && <CheckOutlined className="check-icon" />}
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="filter-tag-group">
                      <span className="filter-label">{t('categories.services')}:</span>
                      <div className="multi-select-tags">
                        {serviceOptions.map(option => {
                          const isSelected = selectedServices.includes(option.key)
                          return (
                            <button
                              key={option.key}
                              className={`filter-pill-tag ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleToggleService(option.key)}
                            >
                              {isSelected && <CheckOutlined className="check-icon" />}
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="categories-stats">
            <div className="stats-item">
              <span className="stats-num">{filteredCategoriesCount}</span>
              <span className="stats-label">{t('categories.totalCategories')}</span>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <span className="stats-num">{totalProductsCount.toLocaleString()}</span>
              <span className="stats-label">{t('categories.totalProducts')}</span>
            </div>
          </div>

          {/* Categories Grid (replaces Masonry) */}
          <div className="categories-grid">
            {filteredCategories.map((category, index) => (
              <div 
                key={category.id} 
                className="category-grid-item animate-fade-in-up" 
                style={{ 
                  animationDelay: `${(index % 8) * 0.05}s`,
                  ['--category-theme-color' as any]: category.color,
                  ['--category-theme-color-rgb' as any]: hexToRgb(category.color)
                }}
              >
                <Link to={`/category/${category.id}`}>
                  <Card hoverable className="category-card">
                    <div className="category-image-container">
                      <img 
                        src={category.image} 
                        alt={language === 'en-US' ? category.nameEn : category.nameZh} 
                        className="category-image" 
                      />
                      <div className="category-image-overlay"></div>
                      <span className="category-count-badge">
                        {category.count.toLocaleString()}
                      </span>
                      
                      {/* Floating Service Badges in Image */}
                      <div className="image-service-badges">
                        {category.services.includes('warehouse') && (
                          <span className="img-badge tooltip" title={t('categories.serviceItems.warehouse')}>
                            <GlobalOutlined />
                          </span>
                        )}
                        {category.services.includes('installation') && (
                          <span className="img-badge tooltip" title={t('categories.serviceItems.installation')}>
                            <RocketOutlined />
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="category-info">
                      <div className="category-top-info">
                        <h3 className="category-name">
                          {language === 'en-US' ? category.nameEn : category.nameZh}
                        </h3>
                        
                        {/* Elegant MOQ and tags row */}
                        <div className="category-metadata-row">
                          <span className="card-moq">
                            <ShoppingOutlined className="moq-icon" />
                            {language === 'en-US' ? `Min. Order: ${category.moq} pcs` : `起订量: ${category.moq} 件`}
                          </span>
                          
                          <div className="supplier-badges">
                            {category.supplierTypes.includes('gold') && (
                              <span className="supplier-gold">
                                <SafetyCertificateOutlined className="gold-badge-icon" />
                                {t('categories.suppliers.gold')}
                              </span>
                            )}
                            {category.supplierTypes.includes('factory') && (
                              <span className="supplier-factory">
                                {t('categories.suppliers.factory')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="category-subcategories">
                        {category.subcategories.map((sub: string, idx: number) => (
                          <span key={idx} className="subcategory-tag">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>

          {filteredCategoriesCount === 0 && (
            <div className="no-results animate-fade-in">
              <p>{t('categories.noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

// Helper to convert hex to rgb for CSS variable utilization
function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '13, 148, 136' // fallback mint primary
}

export default CategoriesPage
