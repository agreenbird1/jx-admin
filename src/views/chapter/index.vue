<template>
  <div class="chapter">
    <main-header
      @new-item="addChapter({ id: 0, type: 0, isFrontendShow: 1 })"
    ></main-header>
    <div v-loading="isLoading" class="chapter-main">
      <el-tree
        :data="(chapters as any)"
        empty-text="暂时没有数据"
        :props="defaultProps"
        node-key="id"
        class="pt-10"
        :default-expanded-keys="expandKeys"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
      >
        <template #default="{ node }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <my-switch
                :active="node.data.isFrontendShow"
                label="前端是否展示"
                @update:model-value="(isFrontendShow:number) => changeShow(node.data,isFrontendShow as 1|2)"
              ></my-switch>
              <a
                v-if="node.data.type < 3"
                @click="(e) => addChapter(node.data, e)"
              >
                添加子类
              </a>
              <a v-else style="display: inline-block; width: 65px"></a>
              <a @click="(e) => updateFn(node.data, e)">修改</a>
              <a @click="(e) => deleteChapter(node.data, e)">删除</a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>

    <el-dialog
      v-model="chapterDialogVisible"
      :title="isUpdate ? '修改' : '新建'"
      width="30%"
    >
      <require-label text="章节名称" />
      <el-input
        v-model="chapter!.content"
        class="mt-10 mb-10"
        maxlength="20"
        placeholder="请输入章节名称"
        show-word-limit
        type="text"
      />
      <require-label text="前端是否展示" />
      <el-select v-model="chapter!.isFrontendShow" placeholder="前端是否展示">
        <el-option key="是" label="是" :value="1" />
        <el-option key="否" label="否" :value="2" />
      </el-select>
      <template #footer>
        <el-button size="small" @click="chapterDialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="deleteDialogVisible" title="删除" width="30%">
      <el-icon color="red" class="mr-10"><warning /></el-icon>正在进行
      <span style="color: red">删除 {{ chapter.content }} 章节</span
      >操作，请确认无误后进行删除！
      <template #footer>
        <el-button size="small" @click="deleteDialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="confirmDelete">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useCourseChapter from "@/hooks/useChapter";

// 章节
const {
  isUpdate,
  isLoading,
  chapterDialogVisible,
  deleteDialogVisible,
  chapters,
  chapter,
  addChapter,
  updateFn,
  deleteChapter,
  defaultProps,
  confirm,
  getAllChapterData,
  confirmDelete,
  changeShow,
  expandKeys,
  nodeExpand,
  nodeCollapse,
} = useCourseChapter();
getAllChapterData();
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
