export interface IUser {
  // data: any;
  // code: string;
  id:number,
  password?: string,
  email?: string,
  phone?: string,
  fullname?: string,
  status?: string,
  money?: number,
  created_at?: string,
  created_by?: string,
  updated_at?: string,
  updated_by?: string
}


export interface ICreateUser {
  email: string,
  password: string,
  roles:[],
  phone: string,
  status: string,
  created_at: string,
  created_by: string,
  updated_at: string,
  updated_by: string
};

export interface IUpdateUser {
  email: string,
  roles:[]
  phone: string,
  money: number,
  status: string,
  created_at: string,
  created_by: string,
  updated_at: string,
  updated_by: string
}

export interface IRoleDetail {
  id: number,
  name: string
}