import './footer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Collapse, Button } from "reactstrap"
import { useMediaQuery } from 'react-responsive'

const Footer = (props) => {

  const [isOpenHelp, setIsOpenHelp] = React.useState(false);
  const [isOpenPay, setIsOpenPay] = React.useState(false);
  const isSmallMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const isPad = useMediaQuery({ query: '(max-width: 1024px)' })

  let sizeResp
  if (isSmallMobile) sizeResp = '{paddingLeft:"0px"}'
  else sizeResp = ''

  let sizePolicyResp
  if (isSmallMobile) sizePolicyResp = '12'
  else sizePolicyResp = '6'

  let sizeLowestFooter
  if (isMobile) sizeLowestFooter = '12'
  else sizeLowestFooter = '6'

  let sizeHelpFooter
  if (isPad) sizeHelpFooter = '12'
  else sizeHelpFooter = '8'

  let sizeSupportFooter
  if (isPad) sizeSupportFooter = '12'
  else sizeSupportFooter = '4'

  return (
    <div className='footerr'>
      <Container fluid className='footer-link'>
        <Row className='footer-link-row' >
          {/* <Col xs = "8" className='footer-link-col-left' > */}
          <Col xs={sizeHelpFooter} className='footer-link-col-left' >
            <Row className='footer-link-row-left'>
              <Col xs="6" className='footer-link-row-left-content-left'>
                <ul className='footer-link-row-left-content-left-ul'>
                  <li>
                    <Link to="/chinh-sach-bao-hanh">
                      Warranty Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/thu-cu-doi-moi">
                      Return Policy
                    </Link>
                  </li>
                  {/* <li>
                                        <Link to="/">
                                            Sales Policy
                                        </Link>
                                    </li> */}
                  <li>
                    <Link to="/">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </Col>
              {/* <div className='footer-link-vetical-line'></div> */}
              <Col xs="6" className='footer-link-row-left-content-right'>
                <ul>
                  <li>
                    <Link to="/thong-tin-cua-hang">
                      Store system
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Promotion of the month
                    </Link>
                  </li>
                  {/* <li>
                                        <Link to="/">
                                            24h Technology
                                        </Link>
                                    </li> */}
                  {/* <li>
                                        <Link to ="/thu-cu-doi-moi">
                                            Trade-in old autumn comes into existence
                                        </Link>
                                    </li> */}
                  <li>
                    <Link to="/recharge">
                      Deposit methods
                    </Link>
                  </li>
                  <li>
                    <Link to="/hotline">
                      Hotline
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={sizeSupportFooter} className='footer-link-col-right'>
            <div className='footer-link-col-right-content'>
              <h4> Support</h4>
              {/* <div className='footer-contact-card'>
                                <div className='footer-contact-content'>
                                    <div className='footer-contact-text'>Gọi tư vấn máy - phụ kiện</div>
                                    <div className='footer-contact-time'>(08:00 – 21:30)</div>
                                </div>
                                <div className='footer-contact-phone'>1800 0123</div>
                            </div> */}
              <div className='footer-contact-card'>
                <div className='footer-contact-content'>
                  <div className='footer-contact-text'>Complaints - Feedback</div>
                  <div className='footer-contact-time'>(08:00 – 21:30)</div>
                </div>
                <div className='footer-contact-phone'>092 734 6666</div>
              </div>
              <div className='footer-contact-card-last'>
                <div className='footer-contact-content'>
                  <div className='footer-contact-text'>Warranty - Technical Support</div>
                  <div className='footer-contact-time'>(08:00 – 21:30)</div>
                </div>
                <div className='footer-contact-phone'>092 734 6666</div>
              </div>
              {/* <div className='footer-contact-card-last'>
                                <div className='footer-contact-content'>
                                    <div className='footer-contact-text'>Gọi mua hàng từ xa</div>
                                    <div className='footer-contact-time'>(08:00 – 21:30)</div>
                                </div>
                                <div className='footer-contact-phone'>1800 0123</div>
                            </div> */}
            </div>
          </Col>
        </Row>
        <Row className='footer-info-row'>
          <Col xs="6" className='footer-info-contact'>
            <div className='footer-info-contact-content'><FontAwesomeIcon icon="arrow-circle-up" /> Connect with us</div>
            <div className='footer-info-contact-img'>
              <a onClick={() => window.open("https://www.facebook.com", "_blank")}>
                <img src="content/images/footer_facebook.png" className='footer-img-fa' />
              </a>
              <img src="content/images/footer_instagram.png" className='footer-img-fa' />
              <img src="content/images/footer_youtube.png" className='footer-img-fa' />
              <img src="content/images/footer_zalo.png" className='footer-img-fa' />
            </div>
          </Col>
          <Col xs="6" className='footer-info-payment'>
            <div className='footer-info-payment-content'><FontAwesomeIcon icon="credit-card" /> Payment support</div>
            <div className='footer-info-payment-img'>
              <img src="content/images/footer_momo.png" className='footer-img-fa' />
              <img src="content/images/footer_vnpay.png" className='footer-img-fa' />
              <img src="content/images/footer_visa.png" className='footer-img-fa' />
              {/* <img width="275" src="content/images/footer_payment.png"></img> */}
            </div>
            <img style={{ marginLeft: '20px' }} src="content/images/footer_certificate.png" alt="" />
          </Col>
          {/* <Col xs = "4" className='footer-info-certificate'>
                        <div className='footer-info-certificate-img'>
                            <img src="content/images/footer_certificate.png" alt="Network Trust Certification"/>
                        </div>
                    </Col> */}
        </Row>
      </Container>
      <Container fluid className='footer-link-phone'>
        <Row className='footer-link-row' >
          <Col xs="12" className='footer-link-col-left' >
            <Row className='footer-link-row-left'>
              <Col xs={sizePolicyResp} className='footer-link-row-left-content-left'>
                <ul className='footer-link-row-left-content-left-ul' style={{ paddingLeft: "0px", margin: "0" }}>
                  <li>
                    <Link to="/chinh-sach-bao-hanh">
                      Warranty Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/thu-cu-doi-moi">
                      Return Policy
                    </Link>
                  </li>
                  {/* <li>
                                        <Link to="/">
                                            Sales Policy
                                        </Link>
                                    </li> */}
                  <li>
                    <Link to="/">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </Col>
              {/* <div className='footer-link-vetical-line'></div> */}
              <Col xs={sizePolicyResp} className='footer-link-row-left-content-right'>
                <ul style={{ paddingLeft: "0px" }}>
                  <li>
                    <Link to="/thong-tin-cua-hang">
                      Store system
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      Promotion of the month
                    </Link>
                  </li>
                  {/* <li>
                                        <Link to="/">
                                            24h Technology
                                        </Link>
                                    </li> */}
                  {/* <li>
                                        <Link to ="/thu-cu-doi-moi">
                                            Trade-in old autumn comes into existence
                                        </Link>
                                    </li> */}
                  <li>
                    <Link to="/recharge">
                      Deposit methods
                    </Link>
                  </li>
                  <li>
                    <Link to="/hotline">
                      Hotline
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs="12" className='footer-link-col-right'>
            <div className='footer-link-col-right-content'>
              <h4> Support</h4>
              {/* <div className='footer-contact-card'>
                                <div className='footer-contact-content'>
                                    <div className='footer-contact-text'>Gọi tư vấn máy - phụ kiện</div>
                                    <div className='footer-contact-time'>(08:00 – 21:30)</div>
                                </div>
                                <div className='footer-contact-phone'>1800 0123</div>
                            </div> */}
              <div className='footer-contact-card'>
                <div className='footer-contact-content'>
                  <div className='footer-contact-text'>Complaints - Feedback</div>
                  <div className='footer-contact-time'>(08:00 – 21:30)</div>
                </div>
                <div className='footer-contact-phone'>092 734 6666</div>
              </div>
              <div className='footer-contact-card-last'>
                <div className='footer-contact-content'>
                  <div className='footer-contact-text'>Warranty - Technical Support</div>
                  <div className='footer-contact-time'>(08:00 – 21:30)</div>
                </div>
                <div className='footer-contact-phone'>092 734 6666</div>
              </div>
              {/* <div className='footer-contact-card-last'>
                                <div className='footer-contact-content'>
                                    <div className='footer-contact-text'>Call for remote purchases</div>
                                    <div className='footer-contact-time'>(08:00 – 21:30)</div>
                                </div>
                                <div className='footer-contact-phone'>1800 0123</div>
                            </div> */}
            </div>
          </Col>
        </Row>
        <Row className='footer-info-row'>
          <Col xs={sizeLowestFooter} className='footer-info-contact'>
            <div className='footer-info-contact-content'><FontAwesomeIcon icon="arrow-circle-up" /> Connect with us</div>
            <div className='footer-info-contact-img'>
              <a onClick={() => window.open("https://www.facebook.com", "_blank")}>
                <img src="content/images/footer_facebook.png" className='footer-img-fa' style={{ marginLeft: '5px' }} />
              </a>
              <img src="content/images/footer_instagram.png" className='footer-img-fa' />
              <img src="content/images/footer_youtube.png" className='footer-img-fa' />
              <img src="content/images/footer_zalo.png" className='footer-img-fa' />
            </div>
          </Col>
          <Col xs={sizeLowestFooter} className='footer-info-payment'>
            <div className='footer-info-payment-content'><FontAwesomeIcon icon="credit-card" /> Payment support</div>
            <div className='footer-info-payment-img'>
              {/* <img width="275" src="content/images/footer_payment.png"></img> */}
              <img src="content/images/footer_momo.png" className='footer-img-fa' />
              <img src="content/images/footer_vnpay.png" className='footer-img-fa' />
              <img src="content/images/footer_visa.png" className='footer-img-fa' />
              <img style={{ marginLeft: "20px" }} src="content/images/footer_certificate.png" alt="Network Trust Certification" />

            </div>
          </Col>
          {/* <Col xs = {sizeLowestFooter} className='footer-info-certificate'>
                        <div className='footer-info-certificate-img'>
                            <img src="content/images/footer_certificate.png" alt="Network Trust Certification"/>
                        </div>
                    </Col> */}
        </Row>
      </Container>
    </div>

  );
}

export default Footer;
