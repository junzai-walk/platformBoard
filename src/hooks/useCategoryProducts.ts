import { useState, useEffect } from 'react'
import { mockDb } from '../utils/mockDb'

export interface ProductItem {
  id: string
  name: string
  image: string
  price: string
  moq: string
  sales: number
  description: string
  tags: string[]
}

export const useCategoryProducts = () => {
  const [viewMode, setViewMode] = useState<'masonry' | 'grid' | 'list'>('masonry')
  const [columnsCount, setColumnsCount] = useState(3)
  const [products, setProducts] = useState<ProductItem[]>([])

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

  const loadProducts = () => {
    const dbProducts = mockDb.getProducts().filter((p) => !p.tags.includes('已下架'))
    const list: ProductItem[] = dbProducts.map((p) => {
      // 提取 HTML 文本内容
      const cleanDesc = p.description
        ? p.description.replace(/<\/?[^>]+(>|$)/g, '').trim()
        : '该商品支持大批量采购，由实力厂家直接发货，品质层层把关，售后有保障。'
      
      return {
        id: p.id,
        name: p.name,
        image: p.images[0],
        price: p.priceLevels.length > 1
          ? `¥${p.priceLevels[p.priceLevels.length - 1].price.toFixed(2)} - ¥${p.priceLevels[0].price.toFixed(2)}`
          : `¥${p.priceLevels[0].price.toFixed(2)}`,
        moq: `${p.priceLevels[0].minQuantity} ${p.unit}`,
        sales: p.sales,
        description: cleanDesc.substring(0, 60) + (cleanDesc.length > 60 ? '...' : ''),
        tags: p.tags,
      }
    })
    setProducts(list)
  }

  useEffect(() => {
    loadProducts()
    window.addEventListener('b2b_db_updated', loadProducts)
    return () => {
      window.removeEventListener('b2b_db_updated', loadProducts)
    }
  }, [])

  // Distribute items to columns left-to-right (round-robin)
  const columns = Array.from({ length: columnsCount }, (): ProductItem[] => [])
  products.forEach((product, index) => {
    columns[index % columnsCount].push(product)
  })

  const getImageHeight = (id: string) => {
    const heights = [220, 280, 200, 320, 240, 260]
    const charSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return heights[charSum % heights.length]
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
