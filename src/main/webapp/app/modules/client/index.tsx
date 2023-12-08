import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import React from 'react';
import ChinhSachBaoHanh from './chinhSachBaoHanh/ChinhSachBaoHanh';
import Footer from './footer/footer';
import Header from './header/header';
import './clientLayout.scss'
import PhuongThucThanhToan from './phuongthucthanhtoan/phuongthucthanhtoan';
import ThongTinCuaHang from './thongtincuahang/thongtincuahang';
import ThuCuDoiMoi from './thucudoimoi/thucudoimoi';
import HotLine from './hotline/hotline';
import Menu from './menu/menu';
import ProductList from './product-list/product-list';
import ProductDetail from './product-detail/product-detail';
import Home from './home/home';
import SearchProduct from './search-product/search-product';
import ScrollToTopButton from 'app/components/ScrollToTopButton';

const Routes = ({ match }) => (
    <>
        <Header />
        <Menu />
        <div className='main-layout' >
            <ErrorBoundaryRoute path={`${match.url}chinh-sach-bao-hanh`} component={ChinhSachBaoHanh} />
            <ErrorBoundaryRoute path={`${match.url}phuong-thuc-thanh-toan`} component={PhuongThucThanhToan} />
            <ErrorBoundaryRoute path={`${match.url}thong-tin-cua-hang`} component={ThongTinCuaHang} />
            <ErrorBoundaryRoute path={`${match.url}thu-cu-doi-moi`} component={ThuCuDoiMoi} />
            <ErrorBoundaryRoute path={`${match.url}hotline`} component={HotLine} />
            <ErrorBoundaryRoute path={`${match.url}product-list`} component={ProductList} />
            <ErrorBoundaryRoute path={`${match.url}search`} component={SearchProduct} />
            <ErrorBoundaryRoute path={`${match.url}product-detail`} component={ProductDetail} />
            <ErrorBoundaryRoute path={`${match.url}`} exact component={Home} />
        </div>
        <ScrollToTopButton />
        <Footer />
    </>
);

export default Routes;