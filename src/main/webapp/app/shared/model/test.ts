export interface ITestDetail {
  id:number,
  test_content:string,
  video_name:string,
  serial_answer:number,
  video_id:number,
  created_by: string,
  created_at:string,
  updated_by: string,
  updated_at:string
}

export interface ICreateTest {
  test_content:string,
  serial_answer:number,
  video_id:string
}

export interface IUpdateTest {
  test_content:string,
  serial_answer:number
}

export interface IVideoNameDetail {
  id:number,
  name: string
}
