export interface IVideoDetail {
    id: number,
    name : string,
    link_video : string,
    finished : string,
    course_name: string,
    course_id: number,
    created_by: string,
    updated_by: string,
    created_at: string,
    updated_at: string
  }
  
  export interface ICreateVideo {
    name : string,
    link_video : string,
    finished : string,
    course_id: number,
  }
  
  export interface IUpdateVideo {
    name : string,
    link_video : string,
    finished : string,
    course_id: number,
  }

  export interface ICourseNameDetail {
    id: number,
    name: string,
  }
  