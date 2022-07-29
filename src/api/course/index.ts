import request from "@/utils/request";
import { ICourseData } from "./types";
export * from "./types";
/**
 *
 * @returns 所有课程信息
 */
export const getAllCourse = (status: number, currentPage?: number) => {
  return request<ICourseData>("/question/course/get/all", "get", {
    status,
    currentPage,
  });
};
