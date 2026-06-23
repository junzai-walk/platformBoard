import { Link } from 'react-router-dom'
import { Card, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Layout from '@/components/Layout'
import { useCategories } from '@/hooks/useCategories'
import './index.less'

const CategoriesPage = () => {
  const {
    setSearchTerm,
    columns,
    getImageHeight,
    filteredCategoriesCount,
    totalProductsCount,
    language
  } = useCategories()

  return (
    <Layout>
      <div className="categories-page">
        {/* Hero Section */}
        <div className="categories-hero">
          <div className="container">
            <h1>{language === 'en-US' ? 'Product Categories' : '商品分类'}</h1>
            <p>
              {language === 'en-US'
                ? 'Explore our comprehensive range of B2B products across multiple industries'
                : '探索我们跨多个行业的全面B2B产品系列'}
            </p>
            <Input
              placeholder={language === 'en-US' ? 'Search categories...' : '搜索分类...'}
              allowClear
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                maxWidth: 600, 
                margin: '0 auto',
                height: 48,
                borderRadius: 24,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: 'none',
                padding: '0 24px',
                fontSize: 16
              }}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container">
          <div className="categories-stats">
            <span>
              {language === 'en-US'
                ? `${filteredCategoriesCount} Categories`
                : `${filteredCategoriesCount} 个分类`}
            </span>
            <span>
              {language === 'en-US'
                ? `${totalProductsCount.toLocaleString()} Total Products`
                : `共 ${totalProductsCount.toLocaleString()} 件商品`}
            </span>
          </div>

          <div className="categories-masonry">
            {columns.map((columnItems, colIdx) => (
              <div key={colIdx} className="categories-masonry-col">
                {columnItems.map((category, index) => {
                  const imageHeight = getImageHeight(category.id);
                  return (
                    <div 
                      key={category.id} 
                      className="category-masonry-item animate-fade-in-up" 
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Link to={`/category/${category.id}`}>
                        <Card
                          hoverable
                          className="category-card"
                          style={{ borderTop: `4px solid ${category.color}` }}
                        >
                          <div className="category-image-container" style={{ height: imageHeight }}>
                            <img 
                              src={category.image} 
                              alt={language === 'en-US' ? category.nameEn : category.nameZh} 
                              className="category-image" 
                            />
                            <div className="category-overlay"></div>
                          </div>
                          <h3 className="category-name">
                            {language === 'en-US' ? category.nameEn : category.nameZh}
                          </h3>
                          <div className="category-count">
                            {category.count.toLocaleString()} {language === 'en-US' ? 'Products' : '件商品'}
                          </div>
                          <div className="category-subcategories">
                            {category.subcategories.map((sub: string, idx: number) => (
                              <span key={idx} className="subcategory-tag">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </Card>
                      </Link>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {filteredCategoriesCount === 0 && (
            <div className="no-results">
              <p>{language === 'en-US' ? 'No categories found' : '未找到分类'}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CategoriesPage
