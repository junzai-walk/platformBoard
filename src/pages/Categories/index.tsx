import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Layout from '@/components/Layout'
import './index.less'

const { Search } = Input

const CategoriesPage = () => {
  const { i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  // 适合美国市场的B2B商品分类（中英文）
  const categories = [
    {
      id: 1,
      nameEn: 'Electronics & Components',
      nameZh: '电子元器件',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop&q=80',
      count: 15680,
      color: '#1890ff',
      subcategories: ['Semiconductors', 'Capacitors', 'Resistors', 'Integrated Circuits']
    },
    {
      id: 2,
      nameEn: 'Industrial Machinery',
      nameZh: '工业机械',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop&q=80',
      count: 12450,
      color: '#722ed1',
      subcategories: ['CNC Machines', 'Pumps', 'Compressors', 'Motors']
    },
    {
      id: 3,
      nameEn: 'Hardware & Tools',
      nameZh: '五金工具',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop&q=80',
      count: 18920,
      color: '#52c41a',
      subcategories: ['Hand Tools', 'Power Tools', 'Fasteners', 'Abrasives']
    },
    {
      id: 4,
      nameEn: 'Chemicals & Materials',
      nameZh: '化工原料',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop&q=80',
      count: 8760,
      color: '#fa8c16',
      subcategories: ['Polymers', 'Solvents', 'Adhesives', 'Coatings']
    },
    {
      id: 5,
      nameEn: 'Construction Materials',
      nameZh: '建筑材料',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=300&fit=crop&q=80',
      count: 11340,
      color: '#eb2f96',
      subcategories: ['Steel', 'Cement', 'Lumber', 'Insulation']
    },
    {
      id: 6,
      nameEn: 'Office Supplies',
      nameZh: '办公用品',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=300&fit=crop&q=80',
      count: 14200,
      color: '#13c2c2',
      subcategories: ['Stationery', 'Furniture', 'Printers', 'Paper Products']
    },
    {
      id: 7,
      nameEn: 'Packaging & Containers',
      nameZh: '包装材料',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=300&fit=crop&q=80',
      count: 9870,
      color: '#2f54eb',
      subcategories: ['Boxes', 'Bags', 'Bottles', 'Labels']
    },
    {
      id: 8,
      nameEn: 'Textiles & Apparel',
      nameZh: '纺织服装',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&q=80',
      count: 22500,
      color: '#faad14',
      subcategories: ['Fabrics', 'Garments', 'Accessories', 'Footwear']
    },
    {
      id: 9,
      nameEn: 'Home & Garden',
      nameZh: '家居园艺',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop&q=80',
      count: 16800,
      color: '#f5222d',
      subcategories: ['Furniture', 'Decor', 'Kitchenware', 'Garden Tools']
    },
    {
      id: 10,
      nameEn: 'Food & Beverage',
      nameZh: '食品饮料',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&q=80',
      count: 10500,
      color: '#fa541c',
      subcategories: ['Snacks', 'Beverages', 'Ingredients', 'Supplements']
    },
    {
      id: 11,
      nameEn: 'Medical Equipment',
      nameZh: '医疗器械',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&h=300&fit=crop&q=80',
      count: 6890,
      color: '#1890ff',
      subcategories: ['Diagnostic', 'Surgical', 'Monitoring', 'Consumables']
    },
    {
      id: 12,
      nameEn: 'Automotive Parts',
      nameZh: '汽车配件',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop&q=80',
      count: 13600,
      color: '#722ed1',
      subcategories: ['Engine Parts', 'Brakes', 'Filters', 'Accessories']
    },
    {
      id: 13,
      nameEn: 'Lighting & Electrical',
      nameZh: '照明电器',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop&q=80',
      count: 8340,
      color: '#faad14',
      subcategories: ['LED Lights', 'Fixtures', 'Switches', 'Cables']
    },
    {
      id: 14,
      nameEn: 'Security & Protection',
      nameZh: '安防设备',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&h=300&fit=crop&q=80',
      count: 7120,
      color: '#52c41a',
      subcategories: ['Cameras', 'Alarms', 'Access Control', 'Safety Gear']
    },
    {
      id: 15,
      nameEn: 'Environmental Equipment',
      nameZh: '环保设备',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=300&fit=crop&q=80',
      count: 5450,
      color: '#13c2c2',
      subcategories: ['Water Treatment', 'Air Purification', 'Waste Management', 'Solar Panels']
    },
    {
      id: 16,
      nameEn: 'Agriculture & Farming',
      nameZh: '农业用品',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop&q=80',
      count: 9230,
      color: '#52c41a',
      subcategories: ['Seeds', 'Fertilizers', 'Equipment', 'Irrigation']
    },
    {
      id: 17,
      nameEn: 'Beauty & Personal Care',
      nameZh: '美容护理',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&q=80',
      count: 12780,
      color: '#eb2f96',
      subcategories: ['Cosmetics', 'Skincare', 'Hair Care', 'Fragrances']
    },
    {
      id: 18,
      nameEn: 'Sports & Recreation',
      nameZh: '运动休闲',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop&q=80',
      count: 11450,
      color: '#fa8c16',
      subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Team Sports', 'Water Sports']
    },
    {
      id: 19,
      nameEn: 'Toys & Hobbies',
      nameZh: '玩具爱好',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop&q=80',
      count: 9870,
      color: '#1890ff',
      subcategories: ['Educational Toys', 'Action Figures', 'Model Kits', 'Collectibles']
    },
    {
      id: 20,
      nameEn: 'Pet Supplies',
      nameZh: '宠物用品',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=300&fit=crop&q=80',
      count: 7650,
      color: '#52c41a',
      subcategories: ['Pet Food', 'Accessories', 'Grooming', 'Healthcare']
    },
    {
      id: 21,
      nameEn: 'Jewelry & Accessories',
      nameZh: '珠宝配饰',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&q=80',
      count: 10230,
      color: '#eb2f96',
      subcategories: ['Necklaces', 'Bracelets', 'Rings', 'Watches']
    },
    {
      id: 22,
      nameEn: 'Bags & Luggage',
      nameZh: '箱包皮具',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&q=80',
      count: 8940,
      color: '#722ed1',
      subcategories: ['Backpacks', 'Suitcases', 'Handbags', 'Wallets']
    },
    {
      id: 23,
      nameEn: 'Printing & Publishing',
      nameZh: '印刷出版',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80',
      count: 6540,
      color: '#13c2c2',
      subcategories: ['Commercial Printing', 'Labels', 'Books', 'Magazines']
    },
    {
      id: 24,
      nameEn: 'Telecommunications',
      nameZh: '通讯设备',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop&q=80',
      count: 9120,
      color: '#2f54eb',
      subcategories: ['Mobile Phones', 'Networking', 'Antennas', 'Cables']
    },
    {
      id: 25,
      nameEn: 'Energy & Power',
      nameZh: '能源电力',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=300&fit=crop&q=80',
      count: 7890,
      color: '#faad14',
      subcategories: ['Generators', 'Batteries', 'Solar Systems', 'Transformers']
    },
    {
      id: 26,
      nameEn: 'Rubber & Plastics',
      nameZh: '橡塑制品',
      image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=300&h=300&fit=crop&q=80',
      count: 10560,
      color: '#fa8c16',
      subcategories: ['Plastic Raw Materials', 'Rubber Products', 'Foam', 'Sheets']
    },
    {
      id: 27,
      nameEn: 'Metallurgy & Mining',
      nameZh: '冶金矿产',
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=300&h=300&fit=crop&q=80',
      count: 8230,
      color: '#1890ff',
      subcategories: ['Steel', 'Aluminum', 'Copper', 'Minerals']
    },
    {
      id: 28,
      nameEn: 'Gifts & Crafts',
      nameZh: '礼品工艺',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&h=300&fit=crop&q=80',
      count: 12340,
      color: '#eb2f96',
      subcategories: ['Promotional Items', 'Handicrafts', 'Souvenirs', 'Holiday Decor']
    },
    {
      id: 29,
      nameEn: 'Furniture & Fixtures',
      nameZh: '家具设备',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop&q=80',
      count: 11780,
      color: '#722ed1',
      subcategories: ['Office Furniture', 'Home Furniture', 'Outdoor Furniture', 'Fixtures']
    },
    {
      id: 30,
      nameEn: 'Measurement & Analysis',
      nameZh: '仪器仪表',
      image: 'https://images.unsplash.com/photo-1581093458791-9d42e1d94d1f?w=300&h=300&fit=crop&q=80',
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
                    <div className="category-image-container">
                      <img src={category.image} alt={i18n.language === 'en-US' ? category.nameEn : category.nameZh} className="category-image" />
                      <div className="category-overlay" ></div>
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

