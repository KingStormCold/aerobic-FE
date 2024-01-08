export interface IVideoDetail {
  id: number,
  name: string,
  link_video: string,
  full_time: number,
  course_name: string,
  course_id: number,
  free: number,
  status: number,
  created_by: string,
  updated_by: string,
  created_at: string,
  updated_at: string
}

export interface ICreateVideo {
  name: string,
  link_video: string,
  finished: string,
  course_id: number,
}

export interface IUpdateVideo {
  name: string,
  link_video: string,
  finished: string,
  course_id: number,
}

export interface ICourseNameDetail {
  id: number,
  name: string,
}

export interface ICourseVideo {
  course_id: number,
  courseName: string,
  videos: ICourseVideoDetail[]
}

export interface ICourseVideoDetail {
  video_id: number,
  videoName: string,
  link_video: string,
  full_time: number,
  view: number,
  previous_time: number,
  progress: number,
  finished: number
}

export interface IUpdateVideoUser {
  video_id: number,
  previous_time: number,
  progress: number
}
