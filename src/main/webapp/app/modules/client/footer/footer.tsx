import './footer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Container, Row, Col } from 'reactstrap';
import React from 'react';

const Footer = (props) => {
    return (
        <div>
            <Container fluid className='footer-link'>
                <Row className='footer-link-row' >
                    <Col sm={{ size: 8 }} className='footer-link-col-left' >
                        <Row className='footer-link-row-left'>
                            <Col className='footer-link-row-left-content-left'>
                                <ul>
                                    <li>
                                        <a href='#'>
                                            Mua hàng trả góp
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Chính sách bảo hành
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Chính sách đổi trả
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Chính sách bán hàng
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Chính sách bảo mật
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Chính sách sử dụng
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Hướng dẫn mua hàng từ xa
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                            <div className='footer-link-vetical-line'></div>
                            <Col className='footer-link-row-left-content-right'>
                                <ul>
                                    <li>
                                        <a href='#'>
                                            Hệ thống cửa hàng
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Khuyến mãi trong tháng
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Công nghệ 24h
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Trade-in thu cũ lên đời
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Tra cứu điểm thành viên
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Tuyển dụng mới nhất
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            Trung tâm bảo hành Apple tại Việt Nam
                                        </a>
                                    </li>
                                </ul>
                            </Col>  
                        </Row>
                    </Col>
                    <Col xs="3" className='footer-link-col-right'>
                        <h4>Hỗ trợ</h4>
                        <div className='footer-contact-card'>
                            <div className='footer-contact-content'>
                                <div className='footer-contact-text'>Gọi tư vấn máy - phụ kiện</div>
                                <div className='footer-contact-time'>(08:00 – 21:30)</div>
                            </div>
                            <div className='footer-contact-phone'>1800 0123</div>
                        </div>
                        <div className='footer-contact-card'>
                            <div className='footer-contact-content'>
                                <div className='footer-contact-text'>Khiếu nại - Góp ý</div>
                                <div className='footer-contact-time'>(08:00 – 21:30)</div>
                            </div>
                            <div className='footer-contact-phone'>1800 0123</div>
                        </div>
                        <div className='footer-contact-card'>
                            <div className='footer-contact-content'>
                                <div className='footer-contact-text'>Bảo hành - Hỗ trợ kỹ thuật</div>
                                <div className='footer-contact-time'>(08:00 – 21:30)</div>
                            </div>
                            <div className='footer-contact-phone'>1800 0123</div>
                        </div>
                        <div className='footer-contact-card'>
                            <div className='footer-contact-content'>
                                <div className='footer-contact-text'>Gọi mua hàng từ xa</div>
                                <div className='footer-contact-time'>(08:00 – 21:30)</div>
                            </div>
                            <div className='footer-contact-phone'>1800 0123</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Footer;