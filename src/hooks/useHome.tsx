import { useTranslation } from 'react-i18next'
import {
  TrophyOutlined,
  RocketOutlined,
  GlobalOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  ShoppingOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { mockDb } from '../utils/mockDb'

export const useHome = () => {
  const { t } = useTranslation()

  // 大件商品分类
  const largeItemCategories = [
    {
      id: 'furniture',
      nameZh: '家具家居',
      nameEn: 'Furniture & Home',
      icon: '🛋️',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      count: 28500,
      color: '#ff6600',
    },
    {
      id: 'appliances',
      nameZh: '家用电器',
      nameEn: 'Home Appliances',
      icon: '🔌',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop',
      count: 15600,
      color: '#1890ff',
    },
    {
      id: 'fitness',
      nameZh: '健身器材',
      nameEn: 'Fitness Equipment',
      icon: '💪',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      count: 8900,
      color: '#52c41a',
    },
    {
      id: 'outdoor',
      nameZh: '户外设施',
      nameEn: 'Outdoor Facilities',
      icon: '🏕️',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
      count: 6700,
      color: '#722ed1',
    },
  ]

  // 海外仓优势
  const warehouseAdvantages = [
    {
      icon: <GlobalOutlined />,
      titleKey: 'home.advantage1Title',
      descKey: 'home.advantage1Desc',
      color: '#ff6600',
    },
    {
      icon: <RocketOutlined />,
      titleKey: 'home.advantage2Title',
      descKey: 'home.advantage2Desc',
      color: '#1890ff',
    },
    {
      icon: <DollarOutlined />,
      titleKey: 'home.advantage3Title',
      descKey: 'home.advantage3Desc',
      color: '#52c41a',
    },
    {
      icon: <HomeOutlined />,
      titleKey: 'home.advantage4Title',
      descKey: 'home.advantage4Desc',
      color: '#722ed1',
    },
  ]

  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
      title: '优质供应商入驻',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=400&fit=crop',
      title: '大型采购活动',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: '新品上线',
    },
  ]

  // 16个分类
  const categories = [
    {
      id: 1,
      name: '电子元器件',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop&q=80',
      count: 12580,
      color: '#ff6600'
    },
    {
      id: 2,
      name: '机械设备',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop&q=80',
      count: 8920,
      color: '#1890ff'
    },
    {
      id: 3,
      name: '五金工具',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&h=300&fit=crop&q=80',
      count: 15600,
      color: '#52c41a'
    },
    {
      id: 4,
      name: '化工原料',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop&q=80',
      count: 6780,
      color: '#722ed1'
    },
    {
      id: 5,
      name: '建筑材料',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=300&fit=crop&q=80',
      count: 9450,
      color: '#fa8c16'
    },
    {
      id: 6,
      name: '办公用品',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=300&fit=crop&q=80',
      count: 11200,
      color: '#13c2c2'
    },
    {
      id: 7,
      name: '包装材料',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=300&fit=crop&q=80',
      count: 7890,
      color: '#eb2f96'
    },
    {
      id: 8,
      name: '纺织服装',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&q=80',
      count: 18500,
      color: '#faad14'
    },
    {
      id: 9,
      name: '家居用品',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop&q=80',
      count: 13400,
      color: '#f5222d'
    },
    {
      id: 10,
      name: '食品饮料',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&q=80',
      count: 8600,
      color: '#fa541c'
    },
    {
      id: 11,
      name: '医疗器械',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=300&h=300&fit=crop&q=80',
      count: 4320,
      color: '#2f54eb'
    },
    {
      id: 12,
      name: '汽车配件',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop&q=80',
      count: 10800,
      color: '#1890ff'
    },
    {
      id: 13,
      name: '照明电器',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop&q=80',
      count: 6540,
      color: '#faad14'
    },
    {
      id: 14,
      name: '安防设备',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&h=300&fit=crop&q=80',
      count: 5670,
      color: '#722ed1'
    },
    {
      id: 15,
      name: '环保设备',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=300&fit=crop&q=80',
      count: 3890,
      color: '#52c41a'
    },
    {
      id: 16,
      name: '农业用品',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=300&fit=crop&q=80',
      count: 7120,
      color: '#13c2c2'
    },
  ]

  // 平台数据统计
  const platformStats = [
    { title: '入驻商家', value: 58600, suffix: '+', icon: <TeamOutlined />, color: '#ff6600' },
    { title: '在售商品', value: 1280000, suffix: '+', icon: <ShoppingOutlined />, color: '#1890ff' },
    { title: '累计交易额', value: 3.8, suffix: '亿', prefix: '¥', icon: <DollarOutlined />, color: '#52c41a' },
    { title: '服务企业', value: 126000, suffix: '+', icon: <GlobalOutlined />, color: '#722ed1' },
  ]

  const features = [
    { icon: <SafetyOutlined />, title: '实名认证', desc: '企业资质严格审核', color: '#ff6600' },
    { icon: <ThunderboltOutlined />, title: '极速发货', desc: '48小时快速响应', color: '#1890ff' },
    { icon: <TrophyOutlined />, title: '品质保障', desc: '100%正品保证', color: '#52c41a' },
    { icon: <GlobalOutlined />, title: '全球货源', desc: '海内外优质供应', color: '#722ed1' },
    { icon: <CheckCircleOutlined />, title: '交易保障', desc: '平台担保交易', color: '#fa8c16' },
    { icon: <RocketOutlined />, title: '一站服务', desc: '采购到物流全程', color: '#13c2c2' },
  ]

  // 热门供应商
  const topSuppliers = [
    {
      id: 1,
      name: '深圳市华强电子科技有限公司',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      category: '电子元器件',
      rating: 4.9,
      products: 1580,
      certified: true,
    },
    {
      id: 2,
      name: '广州精工机械制造有限公司',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
      category: '机械设备',
      rating: 4.8,
      products: 890,
      certified: true,
    },
    {
      id: 3,
      name: '上海绿源环保科技股份公司',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
      category: '环保设备',
      rating: 4.9,
      products: 560,
      certified: true,
    },
    {
      id: 4,
      name: '北京智联物联网技术有限公司',
      logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=100&fit=crop',
      category: '智能设备',
      rating: 4.7,
      products: 720,
      certified: true,
    },
  ]

  // 客户评价
  const testimonials = [
    {
      id: 1,
      company: '某大型连锁超市',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop',
      content: '通过平台找到了稳定的供应商，产品质量好，价格实惠，合作非常愉快！',
      rating: 5,
      name: '采购经理 张先生',
    },
    {
      id: 2,
      company: '某制造企业',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop',
      content: '平台服务专业，交易流程规范，大大提高了我们的采购效率。',
      rating: 5,
      name: '采购总监 李女士',
    },
    {
      id: 3,
      company: '某电商平台',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
      content: '商品种类丰富，供应商响应快速，是我们长期合作的首选平台。',
      rating: 5,
      name: '运营主管 王先生',
    },
  ]

  // 动态读取本地 mockDb
  const dbProducts = mockDb.getProducts()
  const hotProducts = dbProducts
    .filter((p) => !p.tags.includes('已下架'))
    .map((p) => ({
      id: p.id,
      name: p.name,
      image: p.images[0],
      price: p.priceLevels.length > 1
        ? `¥${p.priceLevels[p.priceLevels.length - 1].price.toFixed(2)} - ¥${p.priceLevels[0].price.toFixed(2)}`
        : `¥${p.priceLevels[0].price.toFixed(2)}`,
      moq: `${p.priceLevels[0].minQuantity} ${p.unit}`,
      sales: p.sales,
      supplier: p.supplier.name,
      certified: p.supplier.certified,
      tags: p.tags,
    }))

  return {
    largeItemCategories,
    warehouseAdvantages,
    banners,
    categories,
    platformStats,
    features,
    topSuppliers,
    testimonials,
    hotProducts,
    t,
  }
}
