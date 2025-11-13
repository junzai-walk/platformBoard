import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'antd'
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import './index.less'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <h3>关于平台</h3>
              <ul>
                <li>
                  <Link to="/about-us">{t('common.aboutUs')}</Link>
                </li>
                <li>
                  <Link to="/contact-us">{t('common.contactUs')}</Link>
                </li>
                <li>
                  <Link to="/help-center">{t('common.helpCenter')}</Link>
                </li>
              </ul>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <h3>服务条款</h3>
              <ul>
                <li>
                  <Link to="/privacy-policy">{t('common.privacyPolicy')}</Link>
                </li>
                <li>
                  <Link to="/terms-of-service">{t('common.termsOfService')}</Link>
                </li>
                <li>
                  <Link to="/supplier-entry">供应商入驻协议</Link>
                </li>
              </ul>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <h3>联系我们</h3>
              <ul className="contact-info">
                <li>
                  <PhoneOutlined /> 400-888-8888
                </li>
                <li>
                  <MailOutlined /> service@b2bplatform.com
                </li>
                <li>
                  <EnvironmentOutlined /> 中国·上海·浦东新区
                </li>
              </ul>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <h3>安全认证</h3>
              <div className="certifications">
                <div className="cert-item">
                  <SafetyCertificateOutlined style={{ fontSize: 32 }} />
                  <span>可信网站</span>
                </div>
                <div className="cert-item">
                  <SafetyCertificateOutlined style={{ fontSize: 32 }} />
                  <span>网络安全</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>© 2025 跨境电商平台. All rights reserved.</p>
            <p>营业执照编号: 91310000XXXXXXXXXX | ICP备案号: 沪ICP备XXXXXXXX号</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

