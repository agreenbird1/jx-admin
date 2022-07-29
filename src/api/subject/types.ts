import { IPage } from "../course";

export interface ISubject {
  answer: string;
  chapterId?: number;
  content?: string;
  createTime?: string;
  id?: number;
  isDelete?: number;
  options: string;
  resolve: string;
  title: string;
  topicNumber?: number;
  type?: number;
  updateTime?: string;
  score?: number;
}

export interface ISubjectData {
  otopics: ISubject[];
  pageVo: IPage;
}
