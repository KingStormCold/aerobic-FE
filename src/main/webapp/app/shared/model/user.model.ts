export interface IUser {
  data: any;
  code: string;
  roles?: any[];
  password?: string;
  user_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  full_name?: string;
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

export const defaultValue: Readonly<IUser> = {
  code: "",
  data: undefined,
  roles: [],
  password: '',
  user_name: '',
  email: '',
  phone_number: '',
  address: '',
  full_name: '',
  created_date: '',
  created_by: '',
  updated_date: '',
  updated_by: ''
};

