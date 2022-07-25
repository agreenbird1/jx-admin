<template>
  <div class="chapter">
    <main-header @new-item="newChapter"></main-header>
    <div class="chapter-main">
      <el-tree :data="treeData" :props="defaultProps" class="pt-10">
        <template #default="{ node }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <my-switch
                v-model="node.data.show"
                label="前端是否展示"
              ></my-switch>
              <a v-if="node.data.type < '2'" @click="addChapter"> 添加子类 </a>
              <a v-else style="display: inline-block; width: 65px"></a>
              <a @click="(e) => updateFn(e, node.data)">修改</a>
              <a @click="deleteChapter">删除</a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>

    <el-dialog v-model="chapterDialogVisible" title="新建" width="30%">
      <RequireLabel text="章节名称" />
      <el-input
        v-model="chapter.name"
        class="mt-10 mb-10"
        maxlength="20"
        placeholder="请输入章节名称"
        show-word-limit
        type="text"
      />
      <RequireLabel text="前端是否展示" />
      <el-select v-model="show" placeholder="前端是否展示">
        <el-option key="yse" label="是" value="yes" />
        <el-option key="no" label="否" value="no" />
      </el-select>
      <template #footer>
        <el-button size="small" @click="chapterDialogVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="chapterDialogVisible = false"
        >
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible" title="删除" width="30%">
      <el-icon color="red" class="mr-10"><warning /></el-icon>正在进行
      <span style="color: red">删除章节</span>操作，请确认无误后进行删除！
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
import useCourseChapter from "@/hooks/useChapter";

const newChapter = () => {
  console.log("newChapter");
};
// 章节
const {
  show,
  chapterDialogVisible,
  deleteDialogVisible,
  chapter,
  addChapter,
  updateFn,
  deleteChapter,
  defaultProps,
  treeData,
} = useCourseChapter();
</script>

<style scoped lang="less">
.chapter {
  .chapter-main {
    padding: 10px;
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
  .el-select {
    display: block;
    width: 200px;
    margin-top: 10px;
  }
}
</style>
