export interface IPromotion {
  promotion_id?: string;
  product_info_id?: string;
  content?: string;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string
}

export const defaultValue: Readonly<IPromotion> = {
  promotion_id: "",
  product_info_id: "",
  content: "",
  created_date: "",
  created_by: "",
  updated_date: "",
  updated_by: "",
}

