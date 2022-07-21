<template>
  <div class="layout">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" />
      </el-header>
      <el-container class="main">
        <el-menu
          default-active="course"
          :class="isCollapse ? '' : 'coll'"
          :collapse="isCollapse"
          router
        >
          <el-menu-item index="course">
            <el-icon><i-ep-data-board /></el-icon>
            <template #title>课程管理</template>
          </el-menu-item>
          <el-menu-item index="subject">
            <el-icon><i-ep-tickets /></el-icon>
            <template #title>题目管理</template>
          </el-menu-item>
          <el-menu-item index="chapter">
            <el-icon><i-ep-folder /></el-icon>
            <template #title>章节管理</template>
          </el-menu-item>
        </el-menu>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isCollapse = ref(false);
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
      background-color: #f1f3f5;
      padding: 5px;
    }
    .coll {
      width: 200px;
    }
  }
}
:deep(.el-menu-item.is-active) {
  border-right: 3px solid;
}
</style>
