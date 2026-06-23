import { useParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import ProductForm from './ProductForm'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'
import { mockDb } from '@/utils/mockDb'
import { useAuth } from '@/contexts/AuthContext'
import { ProductDetailItem } from '@/hooks/useProductDetail'

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isNew = id === 'new'

  // 从 mockDb 获取商品数据并做转换
  const existingProduct = isNew ? null : mockDb.getProductById(id!)

  const initialValues = isNew
    ? {
        priceLevels: [
          { key: 1, minQuantity: 1, price: 10.0 },
        ],
        totalStock: 1000,
        availableStock: 1000,
        stockWarning: 10,
        unit: '件',
        status: 'published',
        tags: ['新品'],
      }
    : {
        name: existingProduct?.name,
        category: existingProduct?.category.split(' > '),
        brand: existingProduct?.brand,
        model: existingProduct?.model,
        unit: existingProduct?.unit,
        totalStock: existingProduct?.stock,
        availableStock: existingProduct?.stock,
        stockWarning: 10,
        shipFrom: ['广东省', '深圳市', '南山区'], // 简化默认级联
        shippingTemplate: existingProduct?.shipping.freight === '包邮' ? 'free' : 'default',
        deliveryTime: existingProduct?.shipping.deliveryTime.includes('24') ? '24h' : '48h',
        weight: 1.0,
        specifications: existingProduct?.specifications.map(s => `${s.name}：${s.value}`).join('\n'),
        afterSales: existingProduct?.afterSales.join('\n'),
        status: existingProduct?.tags.includes('已下架') ? 'draft' : 'published',
        tags: existingProduct?.tags.filter(t => t !== '已下架'),
        description: existingProduct?.description,
      }

  const handleSubmit = (formData: any) => {
    const supplierId = user?.id || '1'
    const supplierName = user?.companyName || '深圳市华强电子科技有限公司'
    const supplierLogo = user?.avatar || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop'
    
    // 解析分类级联值
    const categoryStr = Array.isArray(formData.category) ? formData.category.join(' > ') : '电子元器件'
    
    // 解析发货地级联值
    const shipFromStr = Array.isArray(formData.shipFrom) ? formData.shipFrom.join('') : '广东省深圳市'

    // 解析图片
    const images = formData.mainImages && formData.mainImages.length > 0
      ? formData.mainImages.filter(Boolean)
      : (existingProduct ? existingProduct.images : ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop'])

    // 解析规格参数
    const specificationsList = (formData.specifications || '')
      .split('\n')
      .filter((line: string) => line.includes('：') || line.includes(':'))
      .map((line: string) => {
        const parts = line.split(/[：:]/)
        return { name: parts[0].trim(), value: parts[1].trim() }
      })

    // 解析售后说明
    const afterSalesList = (formData.afterSales || '')
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean)

    // 构建价格级别结构
    const formPriceLevels = formData.priceLevels || []
    const priceLevels = formPriceLevels.map((lvl: any, idx: number) => ({
      minQuantity: lvl.minQuantity || 1,
      maxQuantity: formPriceLevels[idx + 1] ? formPriceLevels[idx + 1].minQuantity - 1 : null,
      price: lvl.price || 0
    }))

    const finalProduct: ProductDetailItem = {
      id: isNew ? `P${Date.now()}` : id!,
      name: formData.name,
      images: images,
      category: categoryStr,
      brand: formData.brand || '未知',
      model: formData.model || '常规型号',
      unit: formData.unit || '件',
      stock: formData.totalStock || 1000,
      sales: isNew ? 0 : (existingProduct?.sales || 0),
      rating: isNew ? 5.0 : (existingProduct?.rating || 5.0),
      reviews: isNew ? 0 : (existingProduct?.reviews || 0),
      tags: formData.status === 'draft' ? [...(formData.tags || []), '已下架'] : (formData.tags || []),
      priceLevels: priceLevels,
      specs: {
        color: ['标准色'],
      },
      shipping: {
        from: shipFromStr,
        deliveryTime: formData.deliveryTime === '24h' ? '24小时内发货' : (formData.deliveryTime === '48h' ? '48小时内发货' : '72小时内发货'),
        freight: formData.shippingTemplate === 'free' ? '包邮' : '运费到付',
        estimatedArrival: '3-5天',
      },
      supplier: {
        id: supplierId,
        name: supplierName,
        logo: supplierLogo,
        rating: 4.9,
        productCount: 1580,
        certified: true,
        location: shipFromStr,
        responseRate: 98,
        responseTime: '2小时',
      },
      description: formData.description || '',
      specifications: specificationsList.length > 0 ? specificationsList : [{ name: '型号', value: formData.model || '常规' }],
      afterSales: afterSalesList.length > 0 ? afterSalesList : ['7天无理由退换货'],
    }

    mockDb.saveProduct(finalProduct)
    message.success(isNew ? '商品发布成功！' : '商品更新成功！')
    setTimeout(() => {
      navigate('/supplier-admin/products')
    }, 1500)
  }

  const handleCancel = () => {
    navigate('/supplier-admin/products')
  }

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="products">
      <div style={{ background: '#fff', padding: 0 }}>
        <div
          style={{
            background: '#fff',
            padding: '16px 24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <h2 style={{ margin: 0 }}>{isNew ? '发布新商品' : '编辑商品'}</h2>
        </div>
        <ProductForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  )
}

export default ProductEdit
