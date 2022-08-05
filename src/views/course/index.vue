<template>
  <div class="course">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <main-header @new-item="newCourse">
      <template #left>
        <el-input size="small" placeholder="id" />
        <el-input size="small" placeholder="课程名称" />
        <el-button size="small" type="primary">查询</el-button>
      </template>
    </main-header>
    <div class="course-main">
      <el-tabs v-model="status" type="card" class="demo-tabs">
        <el-tab-pane label="已下架" :name="1"></el-tab-pane>
        <el-tab-pane label="已发布" :name="2"></el-tab-pane>
      </el-tabs>
      <my-table
        v-model:current-page="currentPage"
        :table-config="tableConfig"
        :table-data="tableData"
        :total="total"
        :loading="loading"
      >
        <template #operation="scope">
          <span @click="modifyCourse(scope.row)">修改</span>
          <span class="operation" @click="removeCourse(scope.row.id)">
            {{ status === 1 ? "下架" : "发布" }}
          </span>
          <span @click="deleteCourse(scope.row.id)">删除</span>
        </template>
        <template #updateTime="scope">
          {{ formatTime(scope.row.updateTime) }}
        </template>
      </my-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import MyTable from "@/components/MyTable.vue";
import tableConfig from "./components/CourseTable";
import { useRouter } from "vue-router";
import { getAllCourse } from "@/api/course";
import type { ICourse } from "@/api/course/types";
import formatTime from "@/utils/formatTime";

const loading = ref(false);
const status = ref(1);
const currentPage = ref(1);
const total = ref(1);
const tableData = ref<ICourse[]>([]);
const router = useRouter();

// 分开观察，若是类型变化，
watch(
  () => status.value,
  () => {
    tableData.value = [];
    currentPage.value = 1;
    getTableData();
  }
);
watch(
  () => currentPage.value,
  () => {
    tableData.value = [];
    getTableData();
  }
);
const getTableData = () => {
  loading.value = true;
  getAllCourse(status.value).then(({ data }) => {
    loading.value = false;
    tableData.value = data.data.courses;
    total.value = data.data.pageVo.total;
  });
};
const newCourse = () => console.log("new course");
const modifyCourse = (row: any) => {
  router.push("/course/operatecourse");
};
const removeCourse = (id: string) => {
  console.log(id);
};
const deleteCourse = (id: string) => {
  console.log(id);
};
getTableData();
</script>

<style scoped lang="less">
.course {
  height: 100%;
  overflow: hidden;
  .el-input {
    width: 100px;
    margin-right: 10px;
  }
  .course-main {
    padding: 10px;
    height: calc(100% - 100px);
    span {
      color: @jxColor;
      cursor: pointer;
    }
    .operation {
      padding: 0 5px 0 5px;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
