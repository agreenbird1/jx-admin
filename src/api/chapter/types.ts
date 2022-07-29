export interface IChapterData {
  content?: string;
  createTime?: string;
  id?: number;
  isDelete?: null;
  isFrontendShow?: 1 | 2;
  parentId?: number;
  position?: number;
  type?: number;
  updateTime?: string;
  children?: IChapterData[];
}
