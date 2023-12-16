export interface ICategoryDetail {
  id: number,
  name: string,
  parent_id: string,
  parent_name: string,
  created_by: string,
  updated_by: string,
  created_at: string,
  updated_at: string
}

export interface ICreateCategory {
  category_name: string,
  parent_id: string,
}

export interface IUpdateCategory {
  category_name: string,
  parent_id: string,
}

