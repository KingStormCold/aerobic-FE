
export const PRODUCT_MANAGEMENT_LINK = "/admin/product-management";
export const PRODUCT_MANAGEMENT_LINK_NAME = "Quản lý sản phẩm";

export const PRODUCT_MANAGEMENT_ADD_LINK = "/admin/product-management/add";
export const PRODUCT_MANAGEMENT_ADD_LINK_NAME = "Thêm sản phẩm";

export const PRODUCT_MANAGEMENT_UPDATE_LINK = (id) => `/admin/product-management/${id}/edit`;
export const PRODUCT_MANAGEMENT_UPDATE_LINK_NAME = "Sửa sản phẩm";

export const PRODUCT_DETAIL_MANAGEMENT_LINK = (id) => `/admin/product-management/${id}/detail`;
export const PRODUCT_DETAIL_MANAGEMENT_LINK_NAME = (name) => `${name}`;

export const PRODUCT_INFO_MANAGEMENT_LINK = (id) => `/admin/product-info-management/${id}`;
export const PRODUCT_INFO_MANAGEMENT_LINK_NAME = (name) => `Danh sách ${name}`;

export const PRODUCT_INFO_DETAIL_LINK = (productId, productInfoId) => `/admin/product-info-detail/${productId}/${productInfoId}/detail`;
export const PRODUCT_INFO_DETAIL_LINK_NAME = (name) => `${name}`;

export const PRODUCT_INFO_DETAIL_MANAGEMENT_LINK = (productId, productInfoId) => `/admin/product-info-detail-management/${productId}/${productInfoId}`;
export const PRODUCT_INFO_DETAIL_MANAGEMENT_LINK_NAME = (name) => `Danh sách màu ${name}`;

export const VIDEO_MANAGEMENT_LINK = "/admin/video-management";
export const VIDEO_MANAGEMENT_LINK_NAME = "Quản lý video";

export const VIDEO_MANAGEMENT_ADD_LINK_NAME = "Thêm video";
