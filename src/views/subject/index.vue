<template>
  <div class="subject">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <main-header @new-item="newSubject">
      <template #left>
        <el-input size="small" placeholder="请输入题号" />
        <el-select class="mr-10" placeholder="请选择章节" size="small">
          <el-option
            v-for="item in [1, 2, 3]"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-button size="small" type="primary">查询</el-button>
      </template>
    </main-header>
    <div class="subject-main">
      <my-table :table-config="tableConfig" :table-data="tableData">
        <template #operation="scope">
          <span @click="modifySubject(scope.row)">修改</span>
          <span class="ml-10" @click="deleteSubject(scope.row.id)">删除</span>
        </template>
      </my-table>
    </div>

    <el-dialog v-model="deleteDialogVisible" title="删除" width="30%">
      <el-icon color="red" class="mr-10"><i-ep-warning /></el-icon>正在进行
      <span style="color: red">删除题目</span>操作，请确认无误后进行删除！
      <template #footer>
        <el-button size="small" @click="deleteDialogVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="deleteDialogVisible = false"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import MyTable from "@/components/MyTable.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import tableConfig from "./components/SubjectTable";

interface ISubject {
  id: string;
  stem: string;
  options: string;
  chapter: string;
  type: string;
  updateTime: string;
}

const deleteDialogVisible = ref(false);
const router = useRouter();
const tableData: ISubject[] = [
  {
    id: "12123",
    stem: "我是题干，我是体感",
    options: "我是选项，我是玄学",
    chapter: "我是章节",
    type: "我是提醒",
    updateTime: "2022-12-21 12:31",
  },
  {
    id: "12123",
    stem: "我是题干，我是体感",
    options: "我是选项，我是玄学",
    chapter: "我是章节",
    type: "我是提醒",
    updateTime: "2022-12-21 12:31",
  },
  {
    id: "12123",
    stem: "我是题干，我是体感",
    options: "我是选项，我是玄学",
    chapter: "我是章节",
    type: "我是提醒",
    updateTime: "2022-12-21 12:31",
  },
  {
    id: "12123",
    stem: "我是题干，我是体感,我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感我是题干，我是体感体感我是题干，我是体感",
    options: "我是选项，我是玄学",
    chapter: "我是章节",
    type: "我是提醒",
    updateTime: "2022-12-21 12:31",
  },
];

const newSubject = () => {
  console.log("newSubject");
  router.push("/subject/operatesubject");
};
const modifySubject = (subject: ISubject) => {
  console.log("modifySubject");
  router.push("/subject/operatesubject");
};
const deleteSubject = (id: number) => {
  console.log("deleteSubject");
  deleteDialogVisible.value = true;
};
</script>

<style scoped lang="less">
.subject {
  height: 100%;
  overflow: hidden;
  .el-input,
  .el-select {
    width: 100px;
    margin-right: 10px;
  }
  .subject-main {
    padding: 10px;
    span {
      color: @jxColor;
      cursor: pointer;
    }
  }
  :deep(.el-dialog) {
    .el-dialog__title {
      font-size: 14px;
    }
    .el-dialog__body {
      color: #000;
    }
    .el-dialog__footer {
      height: 45px;
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
