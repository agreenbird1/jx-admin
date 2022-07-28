import { defineStore } from "pinia";
import storage from "@/utils/storage";
import { IAdmin } from "@/api";

export const useAdminStore = defineStore({
  id: "admin",
  state: () => {
    return (
      // 持久化操作
      storage.getStorage<IAdmin>("admin") || {
        id: 0,
        nickname: "",
        avatar: "",
      }
    );
  },
  actions: {},
});
