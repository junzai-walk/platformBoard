import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface CategoryItem {
  id: number
  nameEn: string
  nameZh: string
  image: string
  count: number
  color: string
  subcategories: string[]
  sector: 'industrial' | 'consumer' | 'tech' | 'business'
  moq: number
  supplierTypes: ('verified' | 'factory' | 'gold')[]
  services: ('warehouse' | 'installation' | 'sample' | 'fast')[]
}

const initialCategories: CategoryItem[] = [
  {
    id: 1,
    nameEn: 'Electronics & Components',
    nameZh: '电子元器件',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop&q=80',
    count: 15680,
    color: '#0d9488',
    subcategories: ['Semiconductors', 'Capacitors', 'Resistors', 'Integrated Circuits'],
    sector: 'tech',
    moq: 100,
    supplierTypes: ['verified', 'gold'],
    services: ['warehouse', 'fast']
  },
  {
    id: 2,
    nameEn: 'Industrial Machinery',
    nameZh: '工业机械',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop&q=80',
    count: 12450,
    color: '#722ed1',
    subcategories: ['CNC Machines', 'Pumps', 'Compressors', 'Motors'],
    sector: 'industrial',
    moq: 1,
    supplierTypes: ['factory', 'verified'],
    services: ['installation', 'sample']
  },
  {
    id: 3,
    nameEn: 'Hardware & Tools',
    nameZh: '五金工具',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop&q=80',
    count: 18920,
    color: '#52c41a',
    subcategories: ['Hand Tools', 'Power Tools', 'Fasteners', 'Abrasives'],
    sector: 'industrial',
    moq: 50,
    supplierTypes: ['factory', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 4,
    nameEn: 'Chemicals & Materials',
    nameZh: '化工原料',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop&q=80',
    count: 8760,
    color: '#fa8c16',
    subcategories: ['Polymers', 'Solvents', 'Adhesives', 'Coatings'],
    sector: 'industrial',
    moq: 10,
    supplierTypes: ['verified'],
    services: ['fast']
  },
  {
    id: 5,
    nameEn: 'Construction Materials',
    nameZh: '建筑材料',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=300&fit=crop&q=80',
    count: 11340,
    color: '#eb2f96',
    subcategories: ['Steel', 'Cement', 'Lumber', 'Insulation'],
    sector: 'industrial',
    moq: 20,
    supplierTypes: ['factory', 'verified'],
    services: ['installation', 'warehouse']
  },
  {
    id: 6,
    nameEn: 'Office Supplies',
    nameZh: '办公用品',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=300&fit=crop&q=80',
    count: 14200,
    color: '#13c2c2',
    subcategories: ['Stationery', 'Furniture', 'Printers', 'Paper Products'],
    sector: 'business',
    moq: 5,
    supplierTypes: ['verified', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 7,
    nameEn: 'Packaging & Containers',
    nameZh: '包装材料',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=300&fit=crop&q=80',
    count: 9870,
    color: '#2f54eb',
    subcategories: ['Boxes', 'Bags', 'Bottles', 'Labels'],
    sector: 'business',
    moq: 500,
    supplierTypes: ['factory'],
    services: ['sample']
  },
  {
    id: 8,
    nameEn: 'Textiles & Apparel',
    nameZh: '纺织服装',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&q=80',
    count: 22500,
    color: '#faad14',
    subcategories: ['Fabrics', 'Garments', 'Accessories', 'Footwear'],
    sector: 'consumer',
    moq: 10,
    supplierTypes: ['factory', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 9,
    nameEn: 'Home & Garden',
    nameZh: '家居园艺',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop&q=80',
    count: 16800,
    color: '#f5222d',
    subcategories: ['Furniture', 'Decor', 'Kitchenware', 'Garden Tools'],
    sector: 'consumer',
    moq: 2,
    supplierTypes: ['verified', 'factory'],
    services: ['warehouse', 'installation', 'sample']
  },
  {
    id: 10,
    nameEn: 'Food & Beverage',
    nameZh: '食品饮料',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&q=80',
    count: 10500,
    color: '#fa541c',
    subcategories: ['Snacks', 'Beverages', 'Ingredients', 'Supplements'],
    sector: 'consumer',
    moq: 10,
    supplierTypes: ['verified', 'gold'],
    services: ['warehouse', 'fast']
  },
  {
    id: 11,
    nameEn: 'Medical Equipment',
    nameZh: '医疗器械',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&h=300&fit=crop&q=80',
    count: 6890,
    color: '#1890ff',
    subcategories: ['Diagnostic', 'Surgical', 'Monitoring', 'Consumables'],
    sector: 'tech',
    moq: 1,
    supplierTypes: ['verified', 'gold'],
    services: ['fast', 'sample']
  },
  {
    id: 12,
    nameEn: 'Automotive Parts',
    nameZh: '汽车配件',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop&q=80',
    count: 13600,
    color: '#722ed1',
    subcategories: ['Engine Parts', 'Brakes', 'Filters', 'Accessories'],
    sector: 'tech',
    moq: 5,
    supplierTypes: ['factory', 'verified'],
    services: ['warehouse', 'fast']
  },
  {
    id: 13,
    nameEn: 'Lighting & Electrical',
    nameZh: '照明电器',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop&q=80',
    count: 8340,
    color: '#faad14',
    subcategories: ['LED Lights', 'Fixtures', 'Switches', 'Cables'],
    sector: 'tech',
    moq: 20,
    supplierTypes: ['factory', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 14,
    nameEn: 'Security & Protection',
    nameZh: '安防设备',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&h=300&fit=crop&q=80',
    count: 7120,
    color: '#52c41a',
    subcategories: ['Cameras', 'Alarms', 'Access Control', 'Safety Gear'],
    sector: 'tech',
    moq: 5,
    supplierTypes: ['verified', 'gold'],
    services: ['installation', 'warehouse', 'fast']
  },
  {
    id: 15,
    nameEn: 'Environmental Equipment',
    nameZh: '环保设备',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=300&fit=crop&q=80',
    count: 5450,
    color: '#13c2c2',
    subcategories: ['Water Treatment', 'Air Purification', 'Waste Management', 'Solar Panels'],
    sector: 'industrial',
    moq: 1,
    supplierTypes: ['factory'],
    services: ['installation']
  },
  {
    id: 16,
    nameEn: 'Agriculture & Farming',
    nameZh: '农业用品',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop&q=80',
    count: 9230,
    color: '#52c41a',
    subcategories: ['Seeds', 'Fertilizers', 'Equipment', 'Irrigation'],
    sector: 'business',
    moq: 50,
    supplierTypes: ['verified'],
    services: ['warehouse', 'sample']
  },
  {
    id: 17,
    nameEn: 'Beauty & Personal Care',
    nameZh: '美容护理',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&q=80',
    count: 12780,
    color: '#eb2f96',
    subcategories: ['Cosmetics', 'Skincare', 'Hair Care', 'Fragrances'],
    sector: 'consumer',
    moq: 10,
    supplierTypes: ['verified', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 18,
    nameEn: 'Sports & Recreation',
    nameZh: '运动休闲',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop&q=80',
    count: 11450,
    color: '#fa8c16',
    subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Team Sports', 'Water Sports'],
    sector: 'consumer',
    moq: 5,
    supplierTypes: ['factory', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 19,
    nameEn: 'Toys & Hobbies',
    nameZh: '玩具爱好',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop&q=80',
    count: 9870,
    color: '#1890ff',
    subcategories: ['Educational Toys', 'Action Figures', 'Model Kits', 'Collectibles'],
    sector: 'consumer',
    moq: 12,
    supplierTypes: ['verified', 'gold'],
    services: ['warehouse', 'sample']
  },
  {
    id: 20,
    nameEn: 'Pet Supplies',
    nameZh: '宠物用品',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=300&fit=crop&q=80',
    count: 7650,
    color: '#52c41a',
    subcategories: ['Pet Food', 'Accessories', 'Grooming', 'Healthcare'],
    sector: 'consumer',
    moq: 4,
    supplierTypes: ['factory', 'verified'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 21,
    nameEn: 'Jewelry & Accessories',
    nameZh: '珠宝配饰',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&q=80',
    count: 10230,
    color: '#eb2f96',
    subcategories: ['Necklaces', 'Bracelets', 'Rings', 'Watches'],
    sector: 'consumer',
    moq: 5,
    supplierTypes: ['verified', 'gold'],
    services: ['fast', 'sample']
  },
  {
    id: 22,
    nameEn: 'Bags & Luggage',
    nameZh: '箱包皮具',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&q=80',
    count: 8940,
    color: '#722ed1',
    subcategories: ['Backpacks', 'Suitcases', 'Handbags', 'Wallets'],
    sector: 'consumer',
    moq: 8,
    supplierTypes: ['factory', 'gold'],
    services: ['warehouse', 'sample', 'fast']
  },
  {
    id: 23,
    nameEn: 'Printing & Publishing',
    nameZh: '印刷出版',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80',
    count: 6540,
    color: '#13c2c2',
    subcategories: ['Commercial Printing', 'Labels', 'Books', 'Magazines'],
    sector: 'business',
    moq: 100,
    supplierTypes: ['factory'],
    services: ['sample']
  },
  {
    id: 24,
    nameEn: 'Telecommunications',
    nameZh: '通讯设备',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop&q=80',
    count: 9120,
    color: '#2f54eb',
    subcategories: ['Mobile Phones', 'Networking', 'Antennas', 'Cables'],
    sector: 'tech',
    moq: 5,
    supplierTypes: ['verified', 'gold'],
    services: ['warehouse', 'fast']
  },
  {
    id: 25,
    nameEn: 'Energy & Power',
    nameZh: '能源电力',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=300&fit=crop&q=80',
    count: 7890,
    color: '#faad14',
    subcategories: ['Generators', 'Batteries', 'Solar Systems', 'Transformers'],
    sector: 'industrial',
    moq: 1,
    supplierTypes: ['factory', 'verified'],
    services: ['installation', 'warehouse']
  },
  {
    id: 26,
    nameEn: 'Rubber & Plastics',
    nameZh: '橡塑制品',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=300&h=300&fit=crop&q=80',
    count: 10560,
    color: '#fa8c16',
    subcategories: ['Plastic Raw Materials', 'Rubber Products', 'Foam', 'Sheets'],
    sector: 'industrial',
    moq: 200,
    supplierTypes: ['factory'],
    services: ['sample']
  },
  {
    id: 27,
    nameEn: 'Metallurgy & Mining',
    nameZh: '冶金矿产',
    image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=300&h=300&fit=crop&q=80',
    count: 8230,
    color: '#1890ff',
    subcategories: ['Steel', 'Aluminum', 'Copper', 'Minerals'],
    sector: 'industrial',
    moq: 10,
    supplierTypes: ['verified'],
    services: ['fast']
  },
  {
    id: 28,
    nameEn: 'Gifts & Crafts',
    nameZh: '礼品工艺',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&h=300&fit=crop&q=80',
    count: 12340,
    color: '#eb2f96',
    subcategories: ['Promotional Items', 'Handicrafts', 'Souvenirs', 'Holiday Decor'],
    sector: 'consumer',
    moq: 15,
    supplierTypes: ['factory', 'gold'],
    services: ['warehouse', 'sample']
  },
  {
    id: 29,
    nameEn: 'Furniture & Fixtures',
    nameZh: '家具设备',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop&q=80',
    count: 11780,
    color: '#722ed1',
    subcategories: ['Office Furniture', 'Home Furniture', 'Outdoor Furniture', 'Fixtures'],
    sector: 'business',
    moq: 1,
    supplierTypes: ['factory', 'verified'],
    services: ['warehouse', 'installation']
  },
  {
    id: 30,
    nameEn: 'Measurement & Analysis',
    nameZh: '仪器仪表',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&q=80',
    count: 6920,
    color: '#52c41a',
    subcategories: ['Testing Equipment', 'Sensors', 'Meters', 'Lab Instruments'],
    sector: 'industrial',
    moq: 2,
    supplierTypes: ['verified', 'gold'],
    services: ['sample', 'fast']
  }
]

export const useCategories = () => {
  const { i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState<string>('all')
  const [productRange, setProductRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('default')
  
  // Advanced filters state
  const [moqFilter, setMoqFilter] = useState<string>('all')
  const [selectedSupplierTypes, setSelectedSupplierTypes] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const filteredCategories = initialCategories.filter(cat => {
    // 1. Name and subcategory search
    const name = i18n.language === 'en-US' ? cat.nameEn : cat.nameZh
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cat.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))

    // 2. Sector filter
    const matchesSector = selectedSector === 'all' || cat.sector === selectedSector

    // 3. Product Range filter
    let matchesRange = true
    if (productRange === 'under5k') {
      matchesRange = cat.count < 5000
    } else if (productRange === '5kTo10k') {
      matchesRange = cat.count >= 5000 && cat.count <= 10000
    } else if (productRange === '10kTo15k') {
      matchesRange = cat.count >= 10000 && cat.count <= 15000
    } else if (productRange === 'over15k') {
      matchesRange = cat.count > 15000
    }

    // 4. MOQ filter
    let matchesMoq = true
    if (moqFilter === 'under10') {
      matchesMoq = cat.moq <= 10
    } else if (moqFilter === 'under50') {
      matchesMoq = cat.moq <= 50
    } else if (moqFilter === 'over50') {
      matchesMoq = cat.moq > 50
    }

    // 5. Supplier types filter (category contains all selected types)
    const matchesSupplier = selectedSupplierTypes.length === 0 || 
      selectedSupplierTypes.every(type => cat.supplierTypes.includes(type as any))

    // 6. Services filter (category contains all selected services)
    const matchesServices = selectedServices.length === 0 || 
      selectedServices.every(service => cat.services.includes(service as any))

    return matchesSearch && matchesSector && matchesRange && matchesMoq && matchesSupplier && matchesServices
  })

  // Sorting
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'countDesc') {
      return b.count - a.count
    } else if (sortBy === 'countAsc') {
      return a.count - b.count
    } else if (sortBy === 'nameAsc') {
      const nameA = i18n.language === 'en-US' ? a.nameEn : a.nameZh
      const nameB = i18n.language === 'en-US' ? b.nameEn : b.nameZh
      return nameA.localeCompare(nameB, i18n.language)
    }
    return 0 // default order (by ID)
  })

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedSector('all')
    setProductRange('all')
    setSortBy('default')
    setMoqFilter('all')
    setSelectedSupplierTypes([])
    setSelectedServices([])
  }

  const isFiltered = searchTerm !== '' || 
    selectedSector !== 'all' || 
    productRange !== 'all' || 
    sortBy !== 'default' ||
    moqFilter !== 'all' ||
    selectedSupplierTypes.length > 0 ||
    selectedServices.length > 0

  return {
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
    filteredCategories: sortedCategories,
    resetFilters,
    isFiltered,
    filteredCategoriesCount: sortedCategories.length,
    totalProductsCount: initialCategories.reduce((sum, cat) => sum + cat.count, 0),
    language: i18n.language
  }
}

