export interface IproductInfoDetail {
  product_info_detail_id?: string;
  product_info_id?: string;
  name?: string;
  images?: string;
  total?: string;
  buy_now_price?: string;
  installment_price?: string;
  discount_price?: string;
  bestseller?: boolean;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string;
}

export interface IPagination {
  page_num: number;
  page_size: number;
  total_page: number;
  total_item: number;
}

export const defaultValue: Readonly<IproductInfoDetail> = {
  product_info_detail_id: '',
  product_info_id: '',
  name: '',
  images: '',
  total: '',
  buy_now_price: '',
  installment_price: '',
  discount_price: '',
  bestseller: false,
  created_date: '',
  created_by: '',
  updated_date: '',
  updated_by: '',
};

