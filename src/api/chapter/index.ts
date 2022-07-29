import request from "@/utils/request";
import { IChapterData } from "./types";
export * from "./types";

/**
 *
 * @returns 所有章节信息
 */
export const getAllChapter = () => {
  return request<IChapterData[]>("/question/chapter/get/all", "get");
};

/**
 * 创建新的章节
 * @param params - IChapterData必须类型
 * @returns
 */
export const createChapter = (params: IChapterData) => {
  return request<null>("/question/chapter/create", "post", params);
};

/**
 * 修改章节是否显示、名称内容
 * @param params - IChapterData必须类型
 * @returns
 */
export const updateChapterApi = (params: IChapterData) => {
  return request<null>("/question/chapter/update", "post", params);
};

/**
 * 删除指定章节
 * @param id - 章节id
 * @returns
 */
export const deleteChapterApi = (id: number) => {
  return request<null>("/question/chapter/delete?id=" + id, "post");
};
