import { useParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import ProductForm from './ProductForm'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  // 模拟从后端获取的商品数据
  const initialValues = isNew
    ? {}
    : {
        name: '工业级电子元件批发',
        category: ['电子元器件', '芯片'],
        brand: '华为',
        model: 'HW-2025',
        unit: '件',
        totalStock: 1000,
        availableStock: 800,
        stockWarning: 50,
        shipFrom: ['广东省', '深圳市', '南山区'],
        shippingTemplate: 'default',
        deliveryTime: '48h',
        weight: 0.5,
        specifications: '尺寸：10x10x5cm\n重量：500g\n材质：ABS塑料',
        afterSales: '7天无理由退换货\n质保期：1年\n全国联保',
        status: 'published',
        tags: ['热销', '认证'],
      }

  const handleSubmit = (data: any) => {
    console.log('提交的商品数据:', data)
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

