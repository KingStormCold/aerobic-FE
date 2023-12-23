export interface ISubjectDetail {
  id: number,
  content: string,
  image: string,
  promotional_price: number,
  category_id: number,
  category_name: string,
  name: string;
  created_by: string,
  updated_by: string,
  created_at: string,
  updated_at: string
}

export interface ICreateSubject {
  subject_content: string,
  subject_image: string,
  promotionalPriceSubject: number,
  category_id: number,
 
}

export interface IUpdateSubject {
  subject_content: string,
  subject_image: string,
  promotionalPriceSubject: number,
  category_id: number,
}

export interface CategoriesChild{
  id: number,
  name: string,

}

