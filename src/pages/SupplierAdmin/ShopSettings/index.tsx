import { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Upload,
  Button,
  message,
  Row,
  Col,
  Select,
  TimePicker,
  Space,
  Tabs,
} from 'antd'
import { PlusOutlined, SaveOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import dayjs from 'dayjs'
import AdminLayout, { supplierMenuItems } from '@/components/AdminLayout'

const { Option } = Select
const { TextArea } = Input

const ShopSettings = () => {
  const [form] = Form.useForm()
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'logo.png',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    },
  ])
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'banner.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    },
  ])
  const [licenseFileList, setLicenseFileList] = useState<UploadFile[]>([])
  const [certFileList, setCertFileList] = useState<UploadFile[]>([])

  const handleLogoChange: UploadProps['onChange'] = ({ fileList }) => {
    setLogoFileList(fileList)
  }

  const handleBannerChange: UploadProps['onChange'] = ({ fileList }) => {
    setBannerFileList(fileList)
  }

  const handleLicenseChange: UploadProps['onChange'] = ({ fileList }) => {
    setLicenseFileList(fileList)
  }

  const handleCertChange: UploadProps['onChange'] = ({ fileList }) => {
    setCertFileList(fileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      console.log('店铺设置数据:', values)
      message.success('保存成功！')
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const basicInfoTab = (
    <Card title="基本信息" style={{ marginBottom: 24 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          shopName: '深圳市华强电子科技有限公司',
          shopSlogan: '专业电子元器件供应商，品质保证，价格优惠',
          shopDescription:
            '深圳市华强电子科技有限公司成立于2010年，是一家专业从事电子元器件研发、生产、销售的高新技术企业。公司拥有完善的质量管理体系和专业的技术团队，产品广泛应用于通信、汽车、工业控制等领域。',
          mainCategories: ['电子元器件', '芯片', '传感器'],
          businessHoursStart: dayjs('09:00', 'HH:mm'),
          businessHoursEnd: dayjs('18:00', 'HH:mm'),
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="店铺Logo"
              extra="建议尺寸：200x200像素，支持jpg、png格式"
            >
              <ImgCrop rotationSlider aspectSlider showGrid aspect={1}>
                <Upload
                  listType="picture-card"
                  fileList={logoFileList}
                  onChange={handleLogoChange}
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  {logoFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="店铺Banner"
              extra="建议尺寸：1200x400像素，用于店铺首页顶部展示"
            >
              <ImgCrop rotationSlider aspectSlider showGrid aspect={3}>
                <Upload
                  listType="picture-card"
                  fileList={bannerFileList}
                  onChange={handleBannerChange}
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  {bannerFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="店铺名称"
          name="shopName"
          rules={[{ required: true, message: '请输入店铺名称' }]}
        >
          <Input placeholder="请输入店铺名称" maxLength={30} showCount />
        </Form.Item>

        <Form.Item label="店铺口号" name="shopSlogan">
          <Input placeholder="一句话介绍您的店铺特色" maxLength={50} showCount />
        </Form.Item>

        <Form.Item
          label="店铺简介"
          name="shopDescription"
          rules={[{ required: true, message: '请输入店铺简介' }]}
        >
          <TextArea
            rows={4}
            placeholder="详细介绍您的店铺、产品和服务"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="主营类目"
          name="mainCategories"
          rules={[{ required: true, message: '请选择主营类目' }]}
        >
          <Select mode="multiple" placeholder="请选择主营类目（最多5个）" maxCount={5}>
            <Option value="电子元器件">电子元器件</Option>
            <Option value="机械设备">机械设备</Option>
            <Option value="五金工具">五金工具</Option>
            <Option value="化工原料">化工原料</Option>
            <Option value="建筑材料">建筑材料</Option>
            <Option value="办公用品">办公用品</Option>
            <Option value="包装材料">包装材料</Option>
            <Option value="纺织服装">纺织服装</Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )

  const qualificationTab = (
    <Card title="企业资质" style={{ marginBottom: 24 }}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="企业名称"
          name="companyName"
          initialValue="深圳市华强电子科技有限公司"
          rules={[{ required: true, message: '请输入企业名称' }]}
        >
          <Input placeholder="请输入营业执照上的企业名称" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="统一社会信用代码"
              name="creditCode"
              initialValue="91440300MA5XXXXX"
              rules={[{ required: true, message: '请输入统一社会信用代码' }]}
            >
              <Input placeholder="请输入18位统一社会信用代码" maxLength={18} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="法定代表人"
              name="legalPerson"
              initialValue="张三"
              rules={[{ required: true, message: '请输入法定代表人' }]}
            >
              <Input placeholder="请输入法定代表人姓名" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="注册资本"
              name="registeredCapital"
              initialValue="1000万元"
            >
              <Input placeholder="请输入注册资本" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="成立日期" name="establishDate" initialValue="2010-01-01">
              <Input type="date" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="营业执照"
          extra="请上传营业执照扫描件或照片，支持jpg、png格式，大小不超过5MB"
        >
          <Upload
            listType="picture-card"
            fileList={licenseFileList}
            onChange={handleLicenseChange}
            maxCount={1}
            beforeUpload={() => false}
          >
            {licenseFileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="认证证书"
          extra="如ISO认证、质量认证等，最多上传5张"
        >
          <Upload
            listType="picture-card"
            fileList={certFileList}
            onChange={handleCertChange}
            maxCount={5}
            beforeUpload={() => false}
          >
            {certFileList.length >= 5 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item label="企业地址" name="companyAddress" initialValue="广东省深圳市南山区科技园南区深南大道10000号">
          <TextArea rows={2} placeholder="请输入企业注册地址" />
        </Form.Item>
      </Form>
    </Card>
  )

  const contactTab = (
    <Card title="联系方式" style={{ marginBottom: 24 }}>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="客服电话"
              name="servicePhone"
              initialValue="400-888-8888"
              rules={[{ required: true, message: '请输入客服电话' }]}
            >
              <Input placeholder="请输入客服电话" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="手机号码" name="mobile" initialValue="13800138000">
              <Input placeholder="请输入手机号码" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="电子邮箱" name="email" initialValue="service@huaqiang.com">
              <Input placeholder="请输入电子邮箱" type="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="QQ号码" name="qq" initialValue="123456789">
              <Input placeholder="请输入QQ号码" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="微信号" name="wechat" initialValue="huaqiang_service">
          <Input placeholder="请输入微信号" />
        </Form.Item>

        <Form.Item label="营业时间">
          <Space>
            <Form.Item name="businessHoursStart" noStyle>
              <TimePicker format="HH:mm" placeholder="开始时间" />
            </Form.Item>
            <span>至</span>
            <Form.Item name="businessHoursEnd" noStyle>
              <TimePicker format="HH:mm" placeholder="结束时间" />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="详细地址" name="detailAddress" initialValue="深圳市南山区科技园南区深南大道10000号A座15楼">
          <TextArea rows={2} placeholder="请输入详细地址" />
        </Form.Item>

        <Form.Item label="服务承诺" name="servicePromise" initialValue="7天无理由退换货\n正品保证\n48小时发货\n全国包邮">
          <TextArea rows={4} placeholder="请输入服务承诺，每行一条" />
        </Form.Item>
      </Form>
    </Card>
  )

  const items = [
    {
      key: 'basic',
      label: '基本信息',
      children: basicInfoTab,
    },
    {
      key: 'qualification',
      label: '企业资质',
      children: qualificationTab,
    },
    {
      key: 'contact',
      label: '联系方式',
      children: contactTab,
    },
  ]

  return (
    <AdminLayout menuItems={supplierMenuItems} selectedKey="shop-settings">
      <Card>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0 }}>店铺设置</h2>
          <p style={{ color: '#666', margin: '8px 0 0 0' }}>
            完善您的店铺信息，提升店铺形象和客户信任度
          </p>
        </div>

        <Tabs items={items} />

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Space size="large">
            <Button size="large">取消</Button>
            <Button type="primary" size="large" icon={<SaveOutlined />} onClick={handleSave}>
              保存设置
            </Button>
          </Space>
        </div>
      </Card>
    </AdminLayout>
  )
}

export default ShopSettings

