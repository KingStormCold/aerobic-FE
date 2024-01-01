export interface ISubjectDetail {
  id: number;
  content: string;
  image: string;
  promotional_price: number;
  category_id: number;
  category_name: string;
  name: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateSubject {
  subject_content: string;
  subject_image: string;
  promotional_price_subject: number;
  category_id: number;
}

export interface IUpdateSubject {
  subject_content: string;
  subject_image: string;
  promotional_price_subject: number;
  category_id: number;
}

export interface CategoriesChild {
  id: number;
  name: string;
}

export interface IClientSubjectDetail {
  subject_id: number;
  subject_name: string;
  subject_content: string;
  subject_image: string;
}

export interface IClientCourse {
  subject_id: number;
  subject_name: string;
  subject_image: string;
  course: IClientCourseDetail[];
}
export interface IClientCourseDetail {
  course_id: number;
  course_name: string;
  course_description: number;
  level:  number;
  price: number;
  promotional_price:  number; 
}
