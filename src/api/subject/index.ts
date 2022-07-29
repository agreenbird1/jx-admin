import request from "@/utils/request";
export * from "./types";
import { ISubject, ISubjectData } from "./types";

/**
 * 条件查询数据，题号和章节id可以不要
 * @param topicNumber - 题号
 * @param chapterId - 章节id
 * @param currentPage - 当前页
 * @returns 分页数据
 */
export const getSubjects = (params: {
  currentPage: number;
  topicNumber?: number;
  chapterId?: number;
}) => {
  return request<ISubjectData>("/question/otopic/get/condition", "get", {
    ...params,
    pageSize: 20,
  });
};

export const deleteSubject = (id: number) => {
  return request(`/question/otopic/delete?id=${id}`, "POST");
};

/**
 *
 * @param id - 题目id
 * @returns 题目数据
 */
export const getSubject = (id: number) => {
  return request<ISubject>(`/question/otopic/get/one?id=${id}`, "get");
};

export const createOrUpdateSubject = (subject: ISubject) => {
  return request<ISubjectData>(
    "/question/otopic/createOrUpdate",
    "post",
    subject
  );
};
