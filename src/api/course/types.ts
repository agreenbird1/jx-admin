export interface ICourse {
  id: number;
  name: string;
  teacher: string;
  cover: string;
  status: 1 | 2; // 1 为下架，2为已发布
  chapterId: number;
  createTime: string;
  updateTime: string;
  cardNumber: number;
  coursePdfList: ICoursePDF[];
}

export interface ICoursePDF {
  id: number;
  courseId: number;
  name: string;
  coursePdfUrl: string;
  createTime: string;
  updateTime: string;
}

export interface IPage {
  totalPage: number;
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface ICourseData {
  courses: ICourse[];
  pageVo: IPage;
}
