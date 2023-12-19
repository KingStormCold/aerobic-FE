export interface IUser {
  id: number,
  email: string,
  phone: string,
  fullname: string,
  status: number,
  roles: string[],
  created_at: string,
  created_by: string,
  updated_at: string,
  updated_by: string
}


export interface ICreateUser {
  user_email: string,
  user_password: string,
  user_fullname: string,
  user_role_id: string[],
  user_phone: string,
  user_status: number,
};

export interface IUpdateUser {
  user_role_id: string[],
  user_phone: string,
  user_money?: number,
  user_status: number,
  user_fullname: string
}

export interface IRoleDetail {
  name: string
}
