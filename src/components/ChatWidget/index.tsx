import { useState, useEffect, useRef } from 'react'
import { Input, Button, Avatar, Badge } from 'antd'
import { MessageOutlined, CloseOutlined, SendOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { mockDb } from '../../utils/mockDb'
import './index.less'

interface ChatMessage {
  id: string
  sender: 'user' | 'supplier'
  text: string
  time: string
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentSupplier, setCurrentSupplier] = useState<any>({
    id: '1',
    name: '深圳市华强电子科技有限公司',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
  })
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  // 监听全局弹窗唤醒事件
  useEffect(() => {
    const handleOpenChat = (e: any) => {
      const { supplierName, productName, productId } = e.detail
      
      const product = mockDb.getProductById(productId)
      if (product) {
        setCurrentProduct(product)
        setCurrentSupplier({
          id: product.supplier.id,
          name: product.supplier.name,
          logo: product.supplier.logo,
        })
      } else {
        setCurrentProduct({ name: productName })
        setCurrentSupplier({ name: supplierName })
      }

      setIsOpen(true)

      // 初始化欢迎语
      const now = new Date().toTimeString().substring(0, 5)
      setMessages([
        {
          id: 'welcome',
          sender: 'supplier',
          text: `您好！我是【${supplierName}】的专属招商服务代表。请问有什么可以帮您的？关于我们推荐的商品【${productName}】，您有什么疑问吗？`,
          time: now,
        }
      ])
    }

    window.addEventListener('open_chat_widget', handleOpenChat)
    return () => {
      window.removeEventListener('open_chat_widget', handleOpenChat)
    }
  }, [])

  // 处理发送消息
  const handleSend = () => {
    if (!inputValue.trim()) return

    const now = new Date().toTimeString().substring(0, 5)
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      time: now,
    }

    setMessages((prev) => [...prev, userMsg])
    const promptText = inputValue
    setInputValue('')
    setIsTyping(true)

    // 智能回复逻辑模拟
    setTimeout(() => {
      let replyText = ''
      const productName = currentProduct?.name || '相关商品'
      const supplierName = currentSupplier?.name || '我们公司'
      
      // 取出阶梯价格
      const priceLevels = currentProduct?.priceLevels || [{ price: 0, minQuantity: 1 }]
      const basePrice = priceLevels[0].price
      const lastPrice = priceLevels[priceLevels.length - 1].price
      const moq = priceLevels[0].minQuantity
      const unit = currentProduct?.unit || '件'
      const shipFrom = currentProduct?.shipping?.from || '发货仓'
      const deliveryTime = currentProduct?.shipping?.deliveryTime || '常规发货时效'

      if (promptText.includes('价格') || promptText.includes('钱') || promptText.includes('便宜') || promptText.includes('多少')) {
        replyText = `关于【${productName}】的价格：本商品采用 B2B 阶梯批发定价，起订量为 ${moq}${unit}，单价为 ¥${basePrice.toFixed(2)}。如果您的订购规模较大（达到最大梯度），单价最低可降至 ¥${lastPrice.toFixed(2)}！如果是超大批量采购，我们还支持议价，欢迎详谈！`
      } else if (promptText.includes('起订') || promptText.includes('数量') || promptText.includes('MOQ')) {
        replyText = `【${productName}】的最低起订量为【${moq} ${unit}】。由于我们是源头批发大厂，所有产线均需批量排产并安排物流货运，因此原则上不接受低于此数量的订单。若您需要看样，可以申请样品订单。`
      } else if (promptText.includes('发货') || promptText.includes('物流') || promptText.includes('运费') || promptText.includes('到哪里')) {
        replyText = `我们的发货地为【${shipFrom}】。一般会在【${deliveryTime}】内安排。运费方面，我们会根据您的订购体量和目的地，为您匹配最高性价比的前置仓专线快运或船期方案，大批量订货可享受平台包邮协议！`
      } else if (promptText.includes('样品') || promptText.includes('拿样') || promptText.includes('看样')) {
        replyText = `我们支持寄送样品！您可以直接与销售代表沟通确认样品规格。一般我们会收取少许样品费，当您后续正式下单金额累计超过 5000 元时，该笔样品费可直接抵扣或全额退还。`
      } else if (promptText.includes('优惠') || promptText.includes('折扣') || promptText.includes('便宜点')) {
        replyText = `您好！我们的梯度报价已经是工厂直接批发的底价了。如果您的采购总金额达到 5 万元以上，我们可以额外向财务为您申请平台专属的运费补贴；若建立长期年框合作，可享受专属金牌采购商的协议返利点。`
      } else {
        replyText = `收到您的询盘信息。关于您询问的内容，我们已记录并指派【${supplierName}】的 B2B 大客户经理处理。为了给您发送详细的产品技术参数表（PDF）和最新大宗折扣价，建议您留下您的电子邮箱（Email）或微信/WhatsApp，我们会立即与您取得联系！`
      }

      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'supplier',
        text: replyText,
        time: new Date().toTimeString().substring(0, 5),
      }

      setMessages((prev) => [...prev, replyMsg])
      setIsTyping(false)
    }, 1200)
  }

  // 首页右下角自主打开客服
  const handleOpenGeneralChat = () => {
    setCurrentProduct(null)
    setCurrentSupplier({
      id: 'general',
      name: '平台在线招商客服 (智能助手)',
      logo: 'https://p0.ssl.qhimgs1.com/sdr/400__/t046232ddd22ecd2936.jpg',
    })
    setIsOpen(true)
    const now = new Date().toTimeString().substring(0, 5)
    setMessages([
      {
        id: 'general-welcome',
        sender: 'supplier',
        text: '您好！欢迎使用跨境电商平台智能采购管家。我可以帮您解答：商品价格计算、最低起订量(MOQ)、前置仓海外物流政策、如何入驻平台以及各种订单操作问题。请问有什么可以帮您的？',
        time: now,
      }
    ])
  }

  return (
    <>
      {isOpen ? (
        <div className="im-chat-window-container">
          <div className="im-chat-header" style={{ background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)' }}>
            <div className="supplier-profile">
              <Avatar src={currentSupplier.logo} icon={<CustomerServiceOutlined />} />
              <div className="supplier-info">
                <div className="supplier-name">{currentSupplier.name}</div>
                <div className="supplier-status">在线接待中</div>
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined style={{ color: '#fff' }} />}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="im-chat-body">
            {currentProduct && (
              <div className="current-product-banner">
                <img src={currentProduct.images[0]} alt="商品" />
                <div className="product-info">
                  <div className="product-title">{currentProduct.name}</div>
                  <div className="product-price">
                    起订价: ¥{currentProduct.priceLevels[0].price.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            <div className="message-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-bubble-wrapper ${msg.sender}`}>
                  <Avatar
                    src={msg.sender === 'user' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' : currentSupplier.logo}
                    icon={msg.sender === 'user' ? <UserOutlined /> : <CustomerServiceOutlined />}
                    size="small"
                  />
                  <div className="message-bubble-content">
                    <div className="message-bubble">{msg.text}</div>
                    <div className="message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-bubble-wrapper supplier">
                  <Avatar src={currentSupplier.logo} icon={<CustomerServiceOutlined />} size="small" />
                  <div className="message-bubble-content">
                    <div className="message-bubble typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="im-chat-footer">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleSend}
              placeholder="请输入您想咨询的问题..."
              size="large"
              suffix={
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  style={{ background: '#ff6600', borderColor: '#ff6600' }}
                />
              }
            />
          </div>
        </div>
      ) : (
        <div className="im-chat-trigger-bubble" onClick={handleOpenGeneralChat}>
          <Badge dot color="#52c41a">
            <Button
              type="primary"
              shape="circle"
              icon={<MessageOutlined style={{ fontSize: 22 }} />}
              size="large"
              style={{
                width: 56,
                height: 56,
                background: 'linear-gradient(135deg, #ff6600 0%, #ff8533 100%)',
                borderColor: 'transparent',
                boxShadow: '0 4px 16px rgba(255, 102, 0, 0.4)',
              }}
            />
          </Badge>
        </div>
      )}
    </>
  )
}

// 模拟 UserOutlined 内部定义，防止缺少组件报错
const UserOutlined = () => (
  <span role="img" aria-label="user" className="anticon anticon-user">
    <svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 441.7 760 356c0-160.2-129.8-290-290-290S180 195.8 180 356c0 85.7 40.5 162 102.8 207.5-.4.2-.8.3-1.2.5A374 374 0 0 0 201 683.5 375.63 375.63 0 0 0 120.4 803c-.3.8-.5 1.6-.7 2.4l-.8 3c-1.6 7.4-2.9 14.9-3.9 22.4v2c-.2 1.9-.4 3.9-.5 5.8l-.2 4v4h791.6v-4l-.2-4c-.1-1.9-.3-3.9-.5-5.8v-2c-1-7.5-2.3-15-3.9-22.4l-.8-3c-.2-.8-.4-1.6-.7-2.4zM470 128c120.2 0 218 97.8 218 218S590.2 564 470 564 252 466.2 252 346s97.8-218 218-218zM182.2 828c21.2-108 116.1-190 229.8-190h116c113.7 0 208.6 82 229.8 190H182.2z"></path>
    </svg>
  </span>
)

export default ChatWidget
