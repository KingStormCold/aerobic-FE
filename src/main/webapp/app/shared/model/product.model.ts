export interface IProduct {
  product_id?: string;
  product_name?: string;
  sort_description?: string;
  content?: string;
  image?: string;
  info_insurance?: string;
  category_id?: string;
  category_name?: string;
  user_name?: string;
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

export const defaultValue: Readonly<IProduct> = {
  product_id: '',
  product_name: '',
  sort_description: '',
  content: '',
  image: '',
  info_insurance: '',
  user_name: 'user_name',
  created_date: '',
  created_by: '',
  updated_date: '',
  updated_by: '',
};

