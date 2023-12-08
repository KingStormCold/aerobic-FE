export interface IVideo {
  video_id?: string;
  video_url?: string;
  display_in_slider?: boolean;
  created_date?: string;
  created_by?: string;
  updated_date?: string;
  updated_by?: string;
}

export interface IPagination {
  page_num: number;
  page_size: number;
  total_page: number;
  total_item: number;
}

export const defaultValue: Readonly<IVideo> = {
  video_id: "",
  video_url: "",
  display_in_slider: false,
  created_date: "",
  created_by: "",
  updated_date: "",
  updated_by: ""
}
