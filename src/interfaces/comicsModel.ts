
export interface ComicsRequest {
  num: number;
}

export interface ComicsResponse {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

export interface ComicsCountRequest {
  num: number | 'latest';
}

export interface ComicsCountResponse {
  counts: number;
}