import request from "@/utils/request";
import { IAdmin } from "./types";

/**
 *
 * @param nickname - 管理员昵称
 * @param password - 密码
 * @returns 管理员基本信息
 */
export const login = (nickname: string, password: string) => {
  return request<IAdmin>("/auth/loginByPassword", "post", {
    nickname,
    password,
  });
};
