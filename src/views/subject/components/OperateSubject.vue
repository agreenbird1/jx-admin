<template>
  <div class="operate-subject">
    <main-header>
      <template #right>
        <el-button type="primary" size="small" @click="setSubject">
          保存
        </el-button>
        <el-button plain size="small" @click="() => $router.back()">
          返回
        </el-button>
      </template>
    </main-header>
    <div class="operate-subject-main">
      <div class="title">
        <div class="number">
          <require-label text="题号"></require-label>
          <el-input
            v-model="curSubject.topicNumber"
            class="mb-10 mt-10"
            placeholder="请输入题号"
            maxlength="8"
            :show-word-limit="true"
            type="text"
          ></el-input>
        </div>
        <div class="type">
          <require-label text="题目类型"></require-label>
          <el-radio-group v-model="curSubject.type">
            <el-radio :label="1">单选题</el-radio>
            <el-radio :label="2">多选题</el-radio>
            <el-radio :label="3">不定项</el-radio>
          </el-radio-group>
        </div>
        <div class="chapter">
          <div class="mb-10"><require-label text="章节"></require-label></div>
          <el-cascader
            v-model="chapterIds"
            :props="casProps"
            size="small"
            :options="(chapters as any)"
            placeholder="请选择章节"
          />
        </div>
      </div>
      <div class="body">
        <require-label text="题干"></require-label>
        <el-input
          v-model="curSubject.title"
          class="mt-10 mb-10"
          placeholder="请输入题干"
          type="textarea"
          rows="4"
          :show-word-limit="true"
          maxlength="1500"
        ></el-input>
      </div>
      <div class="options">
        <require-label text="选项"></require-label>
        <el-input
          v-model="curSubject.options"
          class="mt-10 mb-10"
          placeholder="请输入选项，按行可区分不同选项"
          type="textarea"
          rows="4"
          :show-word-limit="true"
          maxlength="1500"
        ></el-input>
      </div>
      <div class="answer">
        <require-label text="正确答案"></require-label>
        <el-input
          v-model="curSubject.answer"
          class="mt-10 mb-10"
          placeholder="请输入正确答案"
          maxlength="10"
          :show-word-limit="true"
          type="text"
        ></el-input>
        <p>
          *请使用大写英文字母输入正确答案，多选或不定项请以英文字符的”，“隔开（例如:A,B)
        </p>
      </div>
      <div class="analysis mt-10">
        <require-label class="mb-10" text="文字解析"></require-label>
        <editor
          v-model="curSubject.resolve"
          api-key="7479q1fed7f4amacykome27iwlmlz0zm3mwbiyle2zx4mr9d"
          :init="initParams"
        ></editor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RequireLabel from "@/components/RequireLabel.vue";
import Editor from "@tinymce/tinymce-vue";
import { initParams } from "./initEditor";
import {
  getAllChapter,
  IChapterData,
  ISubject,
  createOrUpdateSubject,
} from "@/api";
import { useRoute } from "vue-router";
import { getSubject } from "@/api";
import { ElMessage } from "element-plus";
import router from "@/router";

const { query } = useRoute();
const chapterIds = ref<number | number[]>();
const curSubject = ref<ISubject>({
  answer: "", // 正确答案
  chapterId: undefined, // 章节
  id: undefined,
  options: "", // 选项
  resolve: "", // 文字解析
  title: "", // 题干
  topicNumber: undefined, // 题号
  type: undefined, // 题目类型
});
const chapters = ref<IChapterData[]>();
const casProps = { label: "content", value: "id" };
getAllChapter().then((res) => {
  chapters.value = res.data.data;
});
if (query.id) {
  getSubject(Number.parseInt(query.id as string)).then((res) => {
    curSubject.value = res.data.data;
    chapterIds.value = curSubject.value.chapterId;
  });
}
const warningMsg = (msg: string) => {
  ElMessage.warning(msg);
  return false;
};
const judge = () => {
  if ((curSubject.value.topicNumber + "").length !== 8) {
    return warningMsg("请填写八位题号！");
  } else if (!Number.isInteger(+curSubject.value.topicNumber!)) {
    return warningMsg("题号格式不正确！");
  }
  if (!curSubject.value.type) {
    return warningMsg("请勾选题目类型！");
  }
  if (!chapterIds.value) {
    return warningMsg("请选择章节信息！");
  }
  if (!curSubject.value.title.trim()) {
    return warningMsg("请填写题干信息！");
  }
  if (!curSubject.value.options.trim()) {
    return warningMsg("请填写选项信息！");
  }
  if (!curSubject.value.answer.trim()) {
    return warningMsg("请填写答案信息！");
  }
  if (!curSubject.value.resolve.trim()) {
    return warningMsg("请填写答案解析！");
  }
  return true;
};

const setSubject = () => {
  if (judge()) {
    if ((chapterIds.value as number[]).length) {
      curSubject.value.chapterId = (chapterIds.value as number[])[
        (chapterIds.value as number[]).length - 1
      ];
    }
    createOrUpdateSubject(curSubject.value).then((res) => {
      console.log(res.data);
    });
    ElMessage.success("修改成功！");
    router.back();
  }
};
</script>

<style scoped lang="less">
.operate-subject {
  height: 100%;
  overflow-y: auto;
  .operate-subject-main {
    padding: 10px;
    :deep(.el-cascader) {
      width: 150px;
      .el-input {
        height: 30px;
      }
    }
    .title {
      display: flex;
      .number,
      .chapter {
        width: 176px;
      }
      .type {
        margin: 0 70px 0 70px;
        .el-radio-group {
          display: block;
          margin-top: 10px;
          min-width: 240px;
        }
      }
      .chapter {
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .answer,
  .options,
  .body {
    width: 70%;
  }
  .answer {
    font-size: 12px;
  }
}
</style>
