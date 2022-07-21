<template>
  <div class="layout">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" />
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
</script>

<style scoped lang="less">
.layout {
  .el-header {
    height: 10vh;
    padding-left: 30px;
    img {
      width: 20vh;
      padding-top: 2vh;
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
