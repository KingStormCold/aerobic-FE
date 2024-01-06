export interface IPayment {
    id: number,
    email: string,
    course_name: ICourseData [],
    subject_name: number,
    price: number,
    created_at: string,

  }

  export interface IPaymentDetail {
    id: number,
    email: string,
    course_name: ICourseData [],
    created_at: string,

  }

  export interface ICourseData {
    name: string,
    description: string,
    level: number,
    price: number,
    promotional_price:number

  }