import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Layout from '@/components/Layout'
import './index.less'

const { Search } = Input

const CategoriesPage = () => {
  const { t, i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  // 适合美国市场的B2B商品分类（中英文）
  const categories = [
    {
      id: 1,
      nameEn: 'Electronics & Components',
      nameZh: '电子元器件',
      icon: '💻',
      count: 15680,
      color: '#1890ff',
      subcategories: ['Semiconductors', 'Capacitors', 'Resistors', 'Integrated Circuits']
    },
    {
      id: 2,
      nameEn: 'Industrial Machinery',
      nameZh: '工业机械',
      icon: '⚙️',
      count: 12450,
      color: '#722ed1',
      subcategories: ['CNC Machines', 'Pumps', 'Compressors', 'Motors']
    },
    {
      id: 3,
      nameEn: 'Hardware & Tools',
      nameZh: '五金工具',
      icon: '🔧',
      count: 18920,
      color: '#52c41a',
      subcategories: ['Hand Tools', 'Power Tools', 'Fasteners', 'Abrasives']
    },
    {
      id: 4,
      nameEn: 'Chemicals & Materials',
      nameZh: '化工原料',
      icon: '🧪',
      count: 8760,
      color: '#fa8c16',
      subcategories: ['Polymers', 'Solvents', 'Adhesives', 'Coatings']
    },
    {
      id: 5,
      nameEn: 'Construction Materials',
      nameZh: '建筑材料',
      icon: '🏗️',
      count: 11340,
      color: '#eb2f96',
      subcategories: ['Steel', 'Cement', 'Lumber', 'Insulation']
    },
    {
      id: 6,
      nameEn: 'Office Supplies',
      nameZh: '办公用品',
      icon: '📝',
      count: 14200,
      color: '#13c2c2',
      subcategories: ['Stationery', 'Furniture', 'Printers', 'Paper Products']
    },
    {
      id: 7,
      nameEn: 'Packaging & Containers',
      nameZh: '包装材料',
      icon: '📦',
      count: 9870,
      color: '#2f54eb',
      subcategories: ['Boxes', 'Bags', 'Bottles', 'Labels']
    },
    {
      id: 8,
      nameEn: 'Textiles & Apparel',
      nameZh: '纺织服装',
      icon: '👔',
      count: 22500,
      color: '#faad14',
      subcategories: ['Fabrics', 'Garments', 'Accessories', 'Footwear']
    },
    {
      id: 9,
      nameEn: 'Home & Garden',
      nameZh: '家居园艺',
      icon: '🏡',
      count: 16800,
      color: '#f5222d',
      subcategories: ['Furniture', 'Decor', 'Kitchenware', 'Garden Tools']
    },
    {
      id: 10,
      nameEn: 'Food & Beverage',
      nameZh: '食品饮料',
      icon: '🍔',
      count: 10500,
      color: '#fa541c',
      subcategories: ['Snacks', 'Beverages', 'Ingredients', 'Supplements']
    },
    {
      id: 11,
      nameEn: 'Medical Equipment',
      nameZh: '医疗器械',
      icon: '💊',
      count: 6890,
      color: '#1890ff',
      subcategories: ['Diagnostic', 'Surgical', 'Monitoring', 'Consumables']
    },
    {
      id: 12,
      nameEn: 'Automotive Parts',
      nameZh: '汽车配件',
      icon: '🚗',
      count: 13600,
      color: '#722ed1',
      subcategories: ['Engine Parts', 'Brakes', 'Filters', 'Accessories']
    },
    {
      id: 13,
      nameEn: 'Lighting & Electrical',
      nameZh: '照明电器',
      icon: '💡',
      count: 8340,
      color: '#faad14',
      subcategories: ['LED Lights', 'Fixtures', 'Switches', 'Cables']
    },
    {
      id: 14,
      nameEn: 'Security & Protection',
      nameZh: '安防设备',
      icon: '📹',
      count: 7120,
      color: '#52c41a',
      subcategories: ['Cameras', 'Alarms', 'Access Control', 'Safety Gear']
    },
    {
      id: 15,
      nameEn: 'Environmental Equipment',
      nameZh: '环保设备',
      icon: '♻️',
      count: 5450,
      color: '#13c2c2',
      subcategories: ['Water Treatment', 'Air Purification', 'Waste Management', 'Solar Panels']
    },
    {
      id: 16,
      nameEn: 'Agriculture & Farming',
      nameZh: '农业用品',
      icon: '🌾',
      count: 9230,
      color: '#52c41a',
      subcategories: ['Seeds', 'Fertilizers', 'Equipment', 'Irrigation']
    },
    {
      id: 17,
      nameEn: 'Beauty & Personal Care',
      nameZh: '美容护理',
      icon: '💄',
      count: 12780,
      color: '#eb2f96',
      subcategories: ['Cosmetics', 'Skincare', 'Hair Care', 'Fragrances']
    },
    {
      id: 18,
      nameEn: 'Sports & Recreation',
      nameZh: '运动休闲',
      icon: '⚽',
      count: 11450,
      color: '#fa8c16',
      subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Team Sports', 'Water Sports']
    },
    {
      id: 19,
      nameEn: 'Toys & Hobbies',
      nameZh: '玩具爱好',
      icon: '🎮',
      count: 9870,
      color: '#1890ff',
      subcategories: ['Educational Toys', 'Action Figures', 'Model Kits', 'Collectibles']
    },
    {
      id: 20,
      nameEn: 'Pet Supplies',
      nameZh: '宠物用品',
      icon: '🐾',
      count: 7650,
      color: '#52c41a',
      subcategories: ['Pet Food', 'Accessories', 'Grooming', 'Healthcare']
    },
    {
      id: 21,
      nameEn: 'Jewelry & Accessories',
      nameZh: '珠宝配饰',
      icon: '💎',
      count: 10230,
      color: '#eb2f96',
      subcategories: ['Necklaces', 'Bracelets', 'Rings', 'Watches']
    },
    {
      id: 22,
      nameEn: 'Bags & Luggage',
      nameZh: '箱包皮具',
      icon: '👜',
      count: 8940,
      color: '#722ed1',
      subcategories: ['Backpacks', 'Suitcases', 'Handbags', 'Wallets']
    },
    {
      id: 23,
      nameEn: 'Printing & Publishing',
      nameZh: '印刷出版',
      icon: '📰',
      count: 6540,
      color: '#13c2c2',
      subcategories: ['Commercial Printing', 'Labels', 'Books', 'Magazines']
    },
    {
      id: 24,
      nameEn: 'Telecommunications',
      nameZh: '通讯设备',
      icon: '📡',
      count: 9120,
      color: '#2f54eb',
      subcategories: ['Mobile Phones', 'Networking', 'Antennas', 'Cables']
    },
    {
      id: 25,
      nameEn: 'Energy & Power',
      nameZh: '能源电力',
      icon: '⚡',
      count: 7890,
      color: '#faad14',
      subcategories: ['Generators', 'Batteries', 'Solar Systems', 'Transformers']
    },
    {
      id: 26,
      nameEn: 'Rubber & Plastics',
      nameZh: '橡塑制品',
      icon: '🔲',
      count: 10560,
      color: '#fa8c16',
      subcategories: ['Plastic Raw Materials', 'Rubber Products', 'Foam', 'Sheets']
    },
    {
      id: 27,
      nameEn: 'Metallurgy & Mining',
      nameZh: '冶金矿产',
      icon: '⛏️',
      count: 8230,
      color: '#1890ff',
      subcategories: ['Steel', 'Aluminum', 'Copper', 'Minerals']
    },
    {
      id: 28,
      nameEn: 'Gifts & Crafts',
      nameZh: '礼品工艺',
      icon: '🎁',
      count: 12340,
      color: '#eb2f96',
      subcategories: ['Promotional Items', 'Handicrafts', 'Souvenirs', 'Holiday Decor']
    },
    {
      id: 29,
      nameEn: 'Furniture & Fixtures',
      nameZh: '家具设备',
      icon: '🪑',
      count: 11780,
      color: '#722ed1',
      subcategories: ['Office Furniture', 'Home Furniture', 'Outdoor Furniture', 'Fixtures']
    },
    {
      id: 30,
      nameEn: 'Measurement & Analysis',
      nameZh: '仪器仪表',
      icon: '📊',
      count: 6920,
      color: '#52c41a',
      subcategories: ['Testing Equipment', 'Sensors', 'Meters', 'Lab Instruments']
    },
  ]

  const filteredCategories = categories.filter(cat => {
    const name = i18n.language === 'en-US' ? cat.nameEn : cat.nameZh
    return name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <Layout>
      <div className="categories-page">
        {/* Hero Section */}
        <div className="categories-hero">
          <div className="container">
            <h1>{i18n.language === 'en-US' ? 'Product Categories' : '商品分类'}</h1>
            <p>
              {i18n.language === 'en-US'
                ? 'Explore our comprehensive range of B2B products across multiple industries'
                : '探索我们跨多个行业的全面B2B产品系列'}
            </p>
            <Search
              placeholder={i18n.language === 'en-US' ? 'Search categories...' : '搜索分类...'}
              allowClear
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: 600, margin: '0 auto' }}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container">
          <div className="categories-stats">
            <span>
              {i18n.language === 'en-US'
                ? `${filteredCategories.length} Categories`
                : `${filteredCategories.length} 个分类`}
            </span>
            <span>
              {i18n.language === 'en-US'
                ? `${categories.reduce((sum, cat) => sum + cat.count, 0).toLocaleString()} Total Products`
                : `共 ${categories.reduce((sum, cat) => sum + cat.count, 0).toLocaleString()} 件商品`}
            </span>
          </div>

          <Row gutter={[24, 24]} className="categories-grid">
            {filteredCategories.map((category) => (
              <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/category/${category.id}`}>
                  <Card
                    hoverable
                    className="category-card"
                    style={{ borderTop: `4px solid ${category.color}` }}
                  >
                    <div className="category-icon" style={{ color: category.color }}>
                      {category.icon}
                    </div>
                    <h3 className="category-name">
                      {i18n.language === 'en-US' ? category.nameEn : category.nameZh}
                    </h3>
                    <div className="category-count">
                      {category.count.toLocaleString()} {i18n.language === 'en-US' ? 'Products' : '件商品'}
                    </div>
                    <div className="category-subcategories">
                      {category.subcategories.slice(0, 3).map((sub, index) => (
                        <span key={index} className="subcategory-tag">
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="subcategory-more">
                          +{category.subcategories.length - 3}
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {filteredCategories.length === 0 && (
            <div className="no-results">
              <p>{i18n.language === 'en-US' ? 'No categories found' : '未找到分类'}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CategoriesPage

