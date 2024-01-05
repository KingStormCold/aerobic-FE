export interface ICourseDetail {
  id: number,
  name: string,
  description: string,
  level: number,
  price: number,
  promotional_price: number,
  subject_name: string,
  subject_id: number,
  created_by: string,
  updated_by: string,
  created_at: string,
  updated_at: string
}

export interface ICreateCourse {
  name: string;
  subject_id: number;
  description: string;
  level: number;
  price: number;
  promotional_price: number;
}

export interface IUpdateCourse {
  name: string;
  subject_id: number;
  description: string;
  level: number;
  price: number;
  promotional_price: number;
}

export interface ISubjectDetail {
  id: number,
  name: string,
}

export interface IFullCourse {
  subject_id: number,
  subject_name: string,
  id_course: number,
  name: string,
  description
  level: number,
  price: number,
  promotional_price: number,
}

export interface ICoursePayments {
  subject_id: number,
  subject_name: string,
  courses: ICoursePaymentDetail[]
}

export interface ICoursePaymentDetail {
  id: number,
  name: string,
  description: string,
  image: string,
  created_date: string,
  progress_course: number,
  status: boolean
}

export interface ICoursePaymentClient {
  id: number,
  name: string,
  description: string,
  image: string,
  created_date: string,
  subject_id: number,
  subject_name: string,
}

export interface IHistoryPayment {
  name: string,
  price: number,
  created_at: string,
}
