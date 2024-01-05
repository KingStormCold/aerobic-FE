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
