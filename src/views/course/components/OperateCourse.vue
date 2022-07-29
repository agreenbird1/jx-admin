<template>
  <div class="operate-course">
    <main-header>
      <template #right>
        <el-button type="primary" size="small">保存</el-button>
        <el-button plain size="small" @click="() => $router.back()">
          返回
        </el-button>
      </template>
    </main-header>
    <div class="course-name pt-10">
      <div class="pb-10"><require-label text="课程名称" /></div>
      <el-input
        v-model="courseName"
        maxlength="8"
        placeholder="请输入课程名称"
        show-word-limit
        type="text"
      />
    </div>
    <div class="chapter-cards pt-10">
      <require-label text="章节" />
      <el-button type="primary" size="small" @click="addChapter">
        添加
      </el-button>
      <el-tree :data="treeData" :props="defaultProps" class="pt-10">
        <template #default="{ node }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <a v-if="node.data.type === '1'" @click="addCourseCard">
                新增课卡
              </a>
              <a @click="(e) => updateCourseCard(e, node.data)">修改</a>
              <a @click="deleteCourseCard">删除</a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <div class="info pt-10">
      资料
      <el-button class="mb-10" type="primary" size="small" @click="addInfo"
        >添加</el-button
      >
      <my-table
        :table-config="courseInfoTableConfig"
        :table-data="tableData"
        :total="4"
      >
        <template #operation="scope">
          <a @click="updateInfo(scope.row)">修改</a>
          <a style="margin-left: 8px" @click="deleteInfo">删除</a>
        </template>
      </my-table>
    </div>

    <el-dialog v-model="chapterDialogVisible" title="章节名称" width="30%">
      <RequireLabel text="章节名称" />
      <el-input
        v-model="chapterName"
        class="mt-10"
        maxlength="20"
        placeholder="请输入章节名称"
        show-word-limit
        type="text"
      />
      <template #footer>
        <el-button @click="chapterDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="chapterDialogVisible = false">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="cardDialogVisible" title="课卡" width="50%">
      <RequireLabel text="卡片名称" />
      <el-input
        v-model="card.name"
        class="mt-10 mb-10"
        maxlength="20"
        placeholder="请输入卡片名称"
        show-word-limit
        type="text"
      />
      <RequireLabel text="学习时长" />
      <el-input
        v-model="card.time"
        class="mt-10 mb-10"
        maxlength="20"
        placeholder="请输入学习时长"
        show-word-limit
        type="text"
      />
      音频地址
      <el-input
        v-model="card.audioUrl"
        class="mt-10 mb-10"
        maxlength="1000"
        placeholder="请输入音频名称"
        show-word-limit
        type="textarea"
      />
      视频地址
      <el-input
        v-model="card.videoUrl"
        class="mt-10"
        maxlength="1000"
        placeholder="请输入视频名称"
        show-word-limit
        type="textarea"
      />
      <template #footer>
        <el-button @click="cardDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="cardDialogVisible = false">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="infoDialogVisible" title="资料" width="30%">
      <RequireLabel text="资料名称" />
      <el-input
        v-model="info.name"
        class="mt-10 mb-10"
        maxlength="20"
        placeholder="请输入资料名称"
        show-word-limit
        type="text"
      />
      <RequireLabel text="资料PDF链接" />
      <el-input
        v-model="info.PDF"
        class="mt-10"
        maxlength="1000"
        placeholder="请输入资料PDF链接"
        show-word-limit
        type="textarea"
        rows="4"
      />
      <template #footer>
        <el-button @click="infoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="infoDialogVisible = false">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MainHeader from "@/components/MainHeader.vue";
import MyTable from "@/components/MyTable.vue";
import RequireLabel from "@/components/RequireLabel.vue";
import { courseInfoTableConfig } from "./CourseTable";
import useCourseInfo from "@/hooks/useCourseInfo";
import useCourseChapter from "@/hooks/useCourseChapter";

// 课程名称
const courseName = ref("");
// 章节
const {
  chapterName,
  chapterDialogVisible,
  cardDialogVisible,
  card,
  addChapter,
  addCourseCard,
  updateCourseCard,
  deleteCourseCard,
  defaultProps,
  treeData,
} = useCourseChapter();
// 资料
const { info, infoDialogVisible, addInfo, updateInfo, deleteInfo, tableData } =
  useCourseInfo();
</script>

<style scoped lang="less">
.operate-course {
  height: 100%;
  padding: 10px;
  overflow-y: auto;

  .chapter-cards {
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      a {
        color: @jxColor;
        margin-left: 8px;
      }
    }
  }
  .course-name {
    .el-input {
      width: 400px;
    }
  }
  .info {
    & > .el-button {
      margin-left: 20px;
    }
    a {
      color: @jxColor;
      cursor: pointer;
    }
  }
}
</style>
