<template>
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
</template>

<script setup lang="ts">
import { ref } from "vue";

const isCollapse = ref(false);
</script>

<style scoped></style>
