export interface IPreferential {
  preferential_id?: string;
  product_id?: string;
  content?: string;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string
}

export const defaultValue: Readonly<IPreferential> = {
  preferential_id: "",
  product_id: "",
  content: "",
  created_date: "",
  created_by: "",
  updated_date: "",
  updated_by: "",
}

