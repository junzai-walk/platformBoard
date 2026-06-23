import { useState, useEffect } from 'react'

export interface ProductItem {
  id: number
  name: string
  image: string
  price: string
  moq: string
  sales: number
  description: string
  tags: string[]
}

const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1593642532400-2682810df593?w=300&h=300&fit=crop',
]

export const useCategoryProducts = () => {
  const [viewMode, setViewMode] = useState<'masonry' | 'grid' | 'list'>('masonry')
  const [columnsCount, setColumnsCount] = useState(3)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width > 992) setColumnsCount(3)
      else if (width > 576) setColumnsCount(2)
      else setColumnsCount(1)
    }
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const products: ProductItem[] = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    name: `高端优质 B2B 商品 ${i + 1}`,
    image: productImages[i],
    price: `¥${((i + 1) * 15).toFixed(2)} - ¥${((i + 1) * 45).toFixed(2)}`,
    moq: `${(i + 1) * 50}件`,
    sales: 1200 + i * 350,
    description: i % 2 === 0 
      ? '该产品支持大批量采购，由实力厂家直接发货，品质层层把关，售后有保障。'
      : '精选优质原材料，融合现代工艺制作，符合多项国际标准，是您采购的最佳选择。',
    tags: i % 3 === 0 ? ['实力商家', '免邮送达'] : (i % 3 === 1 ? ['极速发货'] : ['海外仓直邮', '限时特惠'])
  }))

  // Distribute items to columns left-to-right (round-robin)
  const columns = Array.from({ length: columnsCount }, (): ProductItem[] => [])
  products.forEach((product, index) => {
    columns[index % columnsCount].push(product)
  })

  const getImageHeight = (id: number) => {
    const heights = [200, 270, 190, 310, 230, 260]
    return heights[id % heights.length]
  }

  return {
    viewMode,
    setViewMode,
    columnsCount,
    products,
    columns,
    getImageHeight
  }
}
