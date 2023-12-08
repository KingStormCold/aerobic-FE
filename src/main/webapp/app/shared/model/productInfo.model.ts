export interface IproductInfo {
  // product_id?: string;
  // product_name?: string;
  // sort_description?: string;
  // content?: string;
  // image?: string;
  // original_price?: string;
  // discount_price?: string;
  // info_insurance?: string;
  // category_id?: string;
  // user_name?: string;
  // created_date?: string;
  // created_by?: string;
  // updated_date?: string;
  // updated_by?: string

  product_info_id?: string;
  product_id?: string;
  product_info_name?: string;
  price?: string;
  total?: string;
  original_price?: string;
  product_info_detail?: string;
  promotion_id?: string;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string
}

export interface IPagination {
  page_num: number;
  page_size: number;
  total_page: number;
  total_item: number
}

export const defaultValue: Readonly<IproductInfo> = {
  product_info_id: '',
  product_id: '',
  product_info_name: '',
  price: '',
  total: '',
  original_price: '',
  product_info_detail: '',
  promotion_id: '',
  created_date: '',
  created_by: '',
  updated_date: '',
  updated_by: '',
};

