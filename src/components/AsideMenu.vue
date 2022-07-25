<template>
  <!-- 刷新的时候解决 item 与 当前路由不匹配的情况 -->
  <el-menu
    :default-active="'/'+(routes.name as string)"
    :collapse="isCollapse"
    router
  >
    <el-menu-item
      :class="{'is-active':(routes.path as string).startsWith('/subject')}"
      index="/subject"
    >
      <el-icon><i-ep-tickets /></el-icon>
      <template #title>题目管理</template>
    </el-menu-item>
    <el-menu-item
      :class="{'is-active':(routes.path as string).startsWith('/course')}"
      index="/course"
    >
      <el-icon><i-ep-data-board /></el-icon>
      <template #title>课程管理</template>
    </el-menu-item>
    <el-menu-item
      :class="{'is-active':(routes.path as string).startsWith('/chapter')}"
      index="/chapter"
    >
      <el-icon><i-ep-folder /></el-icon>
      <template #title>章节管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mitt from "@/utils/Bus";
import { useRoute } from "vue-router";

const isCollapse = ref(false);
const routes = useRoute();
mitt.on("asideCollapse", () => (isCollapse.value = !isCollapse.value));
</script>

<style scoped lang="less">
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  .el-menu-item {
    width: 200px;
  }
}
</style>
