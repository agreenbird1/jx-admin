<template>
  <div class="layout">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" />
        <div class="user">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-dropdown>
            <span class="el-dropdown-link">
              用户
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="main">
        <aside-menu></aside-menu>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AsideMenu from "@/components/AsideMenu.vue";
import { useAdminStore } from "@/store/admin";
import storage from "@/utils/storage";
import { ElMessage } from "element-plus";

const adminStore = useAdminStore();
const logout = () => {
  document.cookie = "satoken=;path=/";
  adminStore.$patch({});
  storage.deleteStorage("admin");
  ElMessage.success("退出成功！");
};
</script>

<style scoped lang="less">
.layout {
  .el-header {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 150px;
    }
    .user {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .main {
    height: 90vh;
    .el-main {
      min-width: 600px;
      border: 10px solid #f1f3f5;
      padding: 0;
    }
  }
}
:deep(.el-menu-item.is-active) {
  border-right: 3px solid;
}
</style>
