export interface ICourseDetail {
  id: number,
  name: string,
  description:string,
  level:number,
  price:number,
  promotional_price:number,
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
