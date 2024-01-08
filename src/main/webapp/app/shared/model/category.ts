export interface ICategoryDetail {
  id: number,
  name: string,
  parent_id: string,
  parent_name: string,
  status: number,
  created_by: string,
  updated_by: string,
  created_at: string,
  updated_at: string
}

export interface ICreateCategory {
  category_name: string,
  parent_id: string,
  status: number
}

export interface IUpdateCategory {
  category_name: string,
  parent_id: string,
}

export interface IMenuDetail {
  id: number;
  name: string;
  sub_menu: ISubDetail[];
}
export interface ISubDetail {
  id: number;
  name: string;
}
