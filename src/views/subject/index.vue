<template>
  <div class="subject">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <main-header @new-item="newSubject">
      <template #left>
        <!-- 长度限制、数字限制 -->
        <el-input
          v-model="topicNumber"
          size="small"
          oninput="value=value.replace(/[^0-9]/g,'')"
          placeholder="请输入题号"
          maxlength="8"
          type="text"
        />
        <el-cascader
          v-model="chapterId"
          :props="casProps"
          size="small"
          filterable
          :options="(chapters as any)"
          placeholder="请选择章节"
          clearable
          @change="cascaderChange"
        />
        <el-button size="small" type="primary" @click="getTableData">
          查询
        </el-button>
      </template>
    </main-header>
    <div class="subject-main">
      <my-table
        v-model:current-page="currentPage"
        :table-config="tableConfig"
        :total="total"
        :table-data="tableData"
        :loading="loading"
      >
        <template #operation="scope">
          <span @click="modifySubject(scope.row.id)">修改</span>
          <span
            v-if="scope.row.isDelete === 1"
            class="ml-10"
            @click="deleteSubject(scope.row.id)"
            >删除</span
          >
        </template>
        <template #updateTime="scope">
          {{ formatTime(scope.row.updateTime) }}
        </template>
        <template #type="scope">
          {{
            scope.row.type === 1
              ? "单选"
              : scope.row.type === 2
              ? "多选"
              : "不定项"
          }}
        </template>
        <template #isDelete="scope">
          <span v-if="scope.row.isDelete === 1">未删除</span>
          <span v-else style="color: #ff0303">已删除</span>
        </template>
      </my-table>
    </div>

    <el-dialog v-model="deleteDialogVisible" title="删除" width="30%">
      <el-icon color="red" class="mr-10"><warning /></el-icon>正在进行
      <span style="color: red">删除题目</span>操作，请确认无误后进行删除！
      <template #footer>
        <el-button size="small" @click="deleteDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" size="small" @click="deleteSubjectConfirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import MyTable from "@/components/MyTable.vue";
import { useRoute, useRouter } from "vue-router";
import tableConfig from "./components/SubjectTable";
import formatTime from "@/utils/formatTime";
import { ElMessage } from "element-plus";
import { getSubjects, deleteSubject as deleteSubjectApi } from "@/api/subject";
import { getAllChapter } from "@/api/chapter";
import type { ISubject } from "@/api/subject/types";
import type { IChapterData } from "@/api/chapter/types";

const route = useRoute();
const currentSubjectId = ref<number>();
const chapters = ref<IChapterData[]>();
const currentPage = ref(1);
const total = ref(1);
const topicNumber = ref<number | undefined>(undefined); // 题号
const loading = ref(true);
const chapterId = ref<number[]>([]); // 章节id
const deleteDialogVisible = ref(false);
const router = useRouter();
const tableData = ref<ISubject[]>([]);
const casProps = {
  label: "content",
  value: "id",
};

getAllChapter().then((res) => {
  chapters.value = res.data.data;
});
const getTableData = () => {
  loading.value = true;
  getSubjects({
    currentPage: currentPage.value,
    topicNumber: topicNumber.value,
    chapterId: chapterId.value[2],
  })
    .then(({ data }) => {
      loading.value = false;
      tableData.value = data.data.otopics;
      total.value = data.data.pageVo.total;
      currentPage.value = data.data.pageVo.currentPage;
    })
    .catch(() => {
      // 题号 不处于 查询的章节条件下的时候报错
      tableData.value = [];
      loading.value = false;
      total.value = 0;
      currentPage.value = 1;
    });
};
watch(
  () => currentPage.value,
  () => {
    tableData.value = [];
    getTableData();
  }
);
const newSubject = () => {
  router.push("/subject/operatesubject");
};
// 携带id参数
const modifySubject = (id: number) => {
  router.push({
    path: "/subject/operatesubject",
    query: {
      id,
    },
  });
};
const deleteSubject = (id: number) => {
  currentSubjectId.value = id;
  deleteDialogVisible.value = true;
};
const deleteSubjectConfirm = () => {
  deleteSubjectApi(currentSubjectId.value as number).then((res) => {
    deleteDialogVisible.value = false;
    if (res.data.code === 2005) {
      ElMessage.success("删除成功！");
      getTableData();
    } else ElMessage.error("删除失败！");
  });
};
const cascaderChange = (val: number[] | null) => {
  // 不论怎么变化，都需要重新请求
  if (val === null) {
    chapterId.value = [];
  }
  getTableData();
};
watch(
  () => route.path,
  () => getTableData(),
  {
    immediate: true,
  }
);
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
  :deep(.el-cascader) {
    width: 100px;
    margin-right: 10px;
  }
  .subject-main {
    padding: 10px;
    height: calc(100% - 50px);
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
