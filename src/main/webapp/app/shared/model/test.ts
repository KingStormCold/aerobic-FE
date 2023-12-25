export interface ITestDetail {
  id: number,
  test_content: string,
  video_name: string,
  serial_answer: number,
  video_id: number,
  answers: IAnswerDetail[],
  created_by: string,
  created_at: string,
  updated_by: string,
  updated_at: string
}

export interface IAnswerDetail {
  id: number,
  answer_content: string
}

export interface ICreateTest {
  test_content: string,
  serial_answer: number,
  video_id: string,
  answer_1: string,
  answer_2: string,
  answer_3: string,
  answer_4: string,
}

export interface IUpdateTest {
  test_content: string,
  serial_answer: number,
  video_id: string,
  answers: IAnswerDetail[]
}

export interface IVideoNameDetail {
  id: number,
  name: string
}
