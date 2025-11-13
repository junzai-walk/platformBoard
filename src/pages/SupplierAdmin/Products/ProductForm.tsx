import { useState } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Space,
  message,
  Table,
  Cascader,
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const { Option } = Select

interface PriceLevel {
  key: number
  minQuantity: number
  price: number
}

// 商品分类数据
const categoryData = [
  {
    value: '电子元器件',
    label: '电子元器件',
    children: [
      { value: '芯片', label: '芯片' },
      { value: '电阻电容', label: '电阻电容' },
      { value: '传感器', label: '传感器' },
    ],
  },
  {
    value: '机械设备',
    label: '机械设备',
    children: [
      { value: '数控机床', label: '数控机床' },
      { value: '工业机器人', label: '工业机器人' },
      { value: '液压设备', label: '液压设备' },
    ],
  },
  {
    value: '五金工具',
    label: '五金工具',
    children: [
      { value: '手动工具', label: '手动工具' },
      { value: '电动工具', label: '电动工具' },
      { value: '测量工具', label: '测量工具' },
    ],
  },
  {
    value: '办公用品',
    label: '办公用品',
    children: [
      { value: '文具', label: '文具' },
      { value: '办公设备', label: '办公设备' },
      { value: '办公耗材', label: '办公耗材' },
    ],
  },
]

const ProductForm = ({ initialValues, onSubmit, onCancel }: any) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [detailImages, setDetailImages] = useState<UploadFile[]>([])
  const [description, setDescription] = useState('')
  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>([
    { key: 1, minQuantity: 1, price: 0 },
    { key: 2, minQuantity: 100, price: 0 },
    { key: 3, minQuantity: 500, price: 0 },
  ])

  const handleMainImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleDetailImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setDetailImages(newFileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  const handleAddPriceLevel = () => {
    const newKey = Math.max(...priceLevels.map((p) => p.key), 0) + 1
    setPriceLevels([...priceLevels, { key: newKey, minQuantity: 0, price: 0 }])
  }

  const handleDeletePriceLevel = (key: number) => {
    if (priceLevels.length <= 1) {
      message.warning('至少保留一个价格档位')
      return
    }
    setPriceLevels(priceLevels.filter((p) => p.key !== key))
  }

  const handlePriceLevelChange = (key: number, field: 'minQuantity' | 'price', value: number) => {
    setPriceLevels(
      priceLevels.map((p) => (p.key === key ? { ...p, [field]: value } : p))
    )
  }

  const priceLevelColumns = [
    {
      title: '起订量',
      dataIndex: 'minQuantity',
      key: 'minQuantity',
      width: 200,
      render: (value: number, record: PriceLevel) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => handlePriceLevelChange(record.key, 'minQuantity', val || 0)}
          addonAfter="件"
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: '单价（元）',
      dataIndex: 'price',
      key: 'price',
      width: 200,
      render: (value: number, record: PriceLevel) => (
        <InputNumber
          min={0}
          precision={2}
          value={value}
          onChange={(val) => handlePriceLevelChange(record.key, 'price', val || 0)}
          addonBefore="¥"
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (record: PriceLevel) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeletePriceLevel(record.key)}
        >
          删除
        </Button>
      ),
    },
  ]

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const productData = {
        ...values,
        mainImages: fileList.map((file) => file.url || file.thumbUrl),
        detailImages: detailImages.map((file) => file.url || file.thumbUrl),
        description,
        priceLevels: priceLevels.sort((a, b) => a.minQuantity - b.minQuantity),
      }
      onSubmit(productData)
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <Form form={form} layout="vertical" initialValues={initialValues}>
        {/* 基本信息 */}
        <Card title="基本信息" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="商品名称"
                name="name"
                rules={[{ required: true, message: '请输入商品名称' }]}
              >
                <Input placeholder="请输入商品名称" maxLength={60} showCount />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品分类"
                name="category"
                rules={[{ required: true, message: '请选择商品分类' }]}
              >
                <Cascader options={categoryData} placeholder="请选择商品分类" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="品牌" name="brand">
                <Input placeholder="请输入品牌名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="型号" name="model">
                <Input placeholder="请输入型号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="单位" name="unit" initialValue="件">
                <Select>
                  <Option value="件">件</Option>
                  <Option value="个">个</Option>
                  <Option value="台">台</Option>
                  <Option value="套">套</Option>
                  <Option value="箱">箱</Option>
                  <Option value="kg">千克</Option>
                  <Option value="米">米</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 商品图片 */}
        <Card title="商品图片" style={{ marginBottom: 24 }}>
          <Form.Item
            label="主图（最多5张，第一张为封面）"
            required
            extra="建议尺寸：800x800像素，支持jpg、png格式，单张不超过2MB"
          >
            <ImgCrop rotationSlider aspectSlider showGrid>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleMainImageChange}
                maxCount={5}
                beforeUpload={() => false}
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            label="详情图（最多10张）"
            extra="用于商品详情展示，建议尺寸：750x750像素"
          >
            <ImgCrop rotationSlider aspectSlider showGrid>
              <Upload
                listType="picture-card"
                fileList={detailImages}
                onChange={handleDetailImageChange}
                maxCount={10}
                beforeUpload={() => false}
              >
                {detailImages.length >= 10 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Card>

        {/* 价格与库存 */}
        <Card title="价格与库存" style={{ marginBottom: 24 }}>
          <Form.Item label="阶梯价格" required>
            <Table
              columns={priceLevelColumns}
              dataSource={priceLevels}
              pagination={false}
              size="small"
              rowKey="key"
            />
            <Button
              type="dashed"
              onClick={handleAddPriceLevel}
              style={{ width: '100%', marginTop: 16 }}
              icon={<PlusOutlined />}
            >
              添加价格档位
            </Button>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="总库存"
                name="totalStock"
                rules={[{ required: true, message: '请输入总库存' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} addonAfter="件" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="可售库存"
                name="availableStock"
                rules={[{ required: true, message: '请输入可售库存' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} addonAfter="件" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="库存预警" name="stockWarning" initialValue={10}>
                <InputNumber min={0} style={{ width: '100%' }} addonAfter="件" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 物流信息 */}
        <Card title="物流信息" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="发货地"
                name="shipFrom"
                rules={[{ required: true, message: '请选择发货地' }]}
              >
                <Cascader
                  options={categoryData}
                  placeholder="请选择发货地（省/市/区）"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="运费模板" name="shippingTemplate" initialValue="default">
                <Select>
                  <Option value="default">默认运费模板</Option>
                  <Option value="free">包邮</Option>
                  <Option value="custom">自定义运费</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="发货时间" name="deliveryTime" initialValue="48h">
                <Select>
                  <Option value="24h">24小时内发货</Option>
                  <Option value="48h">48小时内发货</Option>
                  <Option value="72h">72小时内发货</Option>
                  <Option value="custom">自定义</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="重量（kg）" name="weight">
                <InputNumber min={0} precision={2} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 商品详情 */}
        <Card title="商品详情" style={{ marginBottom: 24 }}>
          <Form.Item label="商品描述" extra="详细描述商品的特点、用途、规格参数等">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              style={{ height: 300, marginBottom: 50 }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ color: [] }, { background: [] }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </Form.Item>

          <Form.Item label="规格参数" name="specifications">
            <Input.TextArea
              rows={4}
              placeholder="请输入规格参数，每行一个参数，格式：参数名：参数值"
            />
          </Form.Item>

          <Form.Item label="售后保障" name="afterSales">
            <Input.TextArea
              rows={3}
              placeholder="请输入售后保障信息，如退换货政策、质保期等"
            />
          </Form.Item>
        </Card>

        {/* 其他设置 */}
        <Card title="其他设置" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="商品状态" name="status" initialValue="draft">
                <Select>
                  <Option value="draft">草稿</Option>
                  <Option value="published">立即上架</Option>
                  <Option value="scheduled">定时上架</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="商品标签" name="tags" initialValue={[]}>
                <Select mode="tags" placeholder="输入标签后按回车添加">
                  <Option value="热销">热销</Option>
                  <Option value="新品">新品</Option>
                  <Option value="认证">认证</Option>
                  <Option value="包邮">包邮</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 操作按钮 */}
        <Card>
          <Space size="large" style={{ width: '100%', justifyContent: 'center' }}>
            <Button size="large" onClick={onCancel}>
              取消
            </Button>
            <Button size="large" onClick={() => handleSubmit()}>
              保存草稿
            </Button>
            <Button type="primary" size="large" onClick={handleSubmit}>
              发布商品
            </Button>
          </Space>
        </Card>
      </Form>
    </div>
  )
}

export default ProductForm

