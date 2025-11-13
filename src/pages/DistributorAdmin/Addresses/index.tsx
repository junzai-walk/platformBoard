import { useState } from 'react'
import { Table, Button, Space, Tag, Modal, Form, Input, Cascader, message, Card } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import AdminLayout, { distributorMenuItems } from '@/components/AdminLayout'

interface Address {
  id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  postalCode?: string
  isDefault: boolean
}

// 省市区数据（简化版，实际项目应使用完整的地区数据）
const areaData = [
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '深圳市',
        label: '深圳市',
        children: [
          { value: '南山区', label: '南山区' },
          { value: '福田区', label: '福田区' },
          { value: '宝安区', label: '宝安区' },
        ],
      },
      {
        value: '广州市',
        label: '广州市',
        children: [
          { value: '天河区', label: '天河区' },
          { value: '越秀区', label: '越秀区' },
        ],
      },
    ],
  },
  {
    value: '上海市',
    label: '上海市',
    children: [
      {
        value: '上海市',
        label: '上海市',
        children: [
          { value: '浦东新区', label: '浦东新区' },
          { value: '黄浦区', label: '黄浦区' },
          { value: '徐汇区', label: '徐汇区' },
        ],
      },
    ],
  },
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: '北京市',
        label: '北京市',
        children: [
          { value: '朝阳区', label: '朝阳区' },
          { value: '海淀区', label: '海淀区' },
          { value: '东城区', label: '东城区' },
        ],
      },
    ],
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: '杭州市',
        label: '杭州市',
        children: [
          { value: '西湖区', label: '西湖区' },
          { value: '滨江区', label: '滨江区' },
        ],
      },
    ],
  },
]

const DistributorAdminAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: '张三',
      phone: '13800138000',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区深南大道10000号',
      postalCode: '518000',
      isDefault: true,
    },
    {
      id: 2,
      name: '李四',
      phone: '13900139000',
      province: '上海市',
      city: '上海市',
      district: '浦东新区',
      detail: '陆家嘴环路1000号',
      postalCode: '200120',
      isDefault: false,
    },
    {
      id: 3,
      name: '王五',
      phone: '13700137000',
      province: '北京市',
      city: '北京市',
      district: '朝阳区',
      detail: '建国路88号SOHO现代城',
      postalCode: '100020',
      isDefault: false,
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [form] = Form.useForm()

  const handleAdd = () => {
    setEditingAddress(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (record: Address) => {
    setEditingAddress(record)
    form.setFieldsValue({
      name: record.name,
      phone: record.phone,
      area: [record.province, record.city, record.district],
      detail: record.detail,
      postalCode: record.postalCode,
    })
    setIsModalVisible(true)
  }

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个地址吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setAddresses(addresses.filter((addr) => addr.id !== id))
        message.success('删除成功')
      },
    })
  }

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
    message.success('已设置为默认地址')
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const newAddress: Address = {
        id: editingAddress?.id || Date.now(),
        name: values.name,
        phone: values.phone,
        province: values.area[0],
        city: values.area[1],
        district: values.area[2],
        detail: values.detail,
        postalCode: values.postalCode,
        isDefault: editingAddress?.isDefault || false,
      }

      if (editingAddress) {
        setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? newAddress : addr)))
        message.success('修改成功')
      } else {
        setAddresses([...addresses, newAddress])
        message.success('添加成功')
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  const columns = [
    {
      title: '收货人',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '收货地址',
      key: 'address',
      render: (record: Address) => (
        <div>
          <div>{`${record.province} ${record.city} ${record.district}`}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.detail}</div>
          {record.postalCode && (
            <div style={{ color: '#999', fontSize: '12px' }}>邮编: {record.postalCode}</div>
          )}
        </div>
      ),
    },
    {
      title: '默认地址',
      dataIndex: 'isDefault',
      key: 'isDefault',
      width: 100,
      render: (isDefault: boolean) =>
        isDefault ? <Tag color="orange">默认地址</Tag> : null,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (record: Address) => (
        <Space>
          {!record.isDefault && (
            <Button
              type="link"
              icon={<StarOutlined />}
              onClick={() => handleSetDefault(record.id)}
            >
              设为默认
            </Button>
          )}
          {record.isDefault && (
            <Button type="link" icon={<StarFilled />} style={{ color: '#ff6600' }} disabled>
              默认地址
            </Button>
          )}
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            disabled={record.isDefault}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <AdminLayout menuItems={distributorMenuItems} selectedKey="addresses">
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>收货地址管理</h2>
            <p style={{ color: '#666', margin: '8px 0 0 0' }}>
              管理您的收货地址，最多可添加20个地址
            </p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
            新增地址
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={addresses}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>

      <Modal
        title={editingAddress ? '编辑地址' : '新增地址'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            label="收货人"
            name="name"
            rules={[{ required: true, message: '请输入收货人姓名' }]}
          >
            <Input placeholder="请输入收货人姓名" />
          </Form.Item>

          <Form.Item
            label="联系电话"
            name="phone"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
            ]}
          >
            <Input placeholder="请输入11位手机号码" />
          </Form.Item>

          <Form.Item
            label="所在地区"
            name="area"
            rules={[{ required: true, message: '请选择所在地区' }]}
          >
            <Cascader
              options={areaData}
              placeholder="请选择省/市/区"
              showSearch
            />
          </Form.Item>

          <Form.Item
            label="详细地址"
            name="detail"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input.TextArea
              placeholder="请输入详细地址，如街道、门牌号、楼层等"
              rows={3}
            />
          </Form.Item>

          <Form.Item label="邮政编码" name="postalCode">
            <Input placeholder="请输入邮政编码（选填）" />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  )
}

export default DistributorAdminAddresses

