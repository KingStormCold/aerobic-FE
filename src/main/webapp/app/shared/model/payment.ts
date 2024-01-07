export interface IGetPayment {
  id: number;
  email: string;
  course_name: string;
  subject_full: number;
  price: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface IGetPaymentDetail {
  id: number;
  email: string;
  course_data: ICoursePaymentDetail[]
  subject_full: number;
  price: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}
export interface ICoursePaymentDetail {
  name: string;
  description: string;
  price: number;
  level: number;
  promotional_price: number;
}

export interface IPayment {
  id: number,
  email: string,
  course_name: ICourseData[],
  subject_name: number,
  price: number,
  created_at: string,

}

export interface IPaymentDetail {
  id: number,
  email: string,
  course_name: ICourseData[],
  created_at: string,

}

export interface ICourseData {
  name: string,
  description: string,
  level: number,
  price: number,
  promotional_price: number
}
