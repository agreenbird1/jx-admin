<template>
  <div class="operate-subject">
    <main-header>
      <template #right>
        <el-button type="primary" size="small">保存</el-button>
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
            class="mb-10 mt-10"
            placeholder="请输入题号"
            maxlength="8"
            :show-word-limit="true"
            type="text"
          ></el-input>
        </div>
        <div class="type">
          <require-label text="题目类型"></require-label>
          <el-radio-group>
            <el-radio :label="3">单选题</el-radio>
            <el-radio :label="6">多选题</el-radio>
            <el-radio :label="9">不定项</el-radio>
          </el-radio-group>
        </div>
        <div class="chapter">
          <div><require-label text="章节"></require-label></div>
          <el-select
            class="mr-10 mb-10 mt-10"
            placeholder="请选择章节"
            size="default"
          >
            <el-option
              v-for="item in [1, 2, 3]"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>
      <div class="body">
        <require-label text="题干"></require-label>
        <el-input
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
        <editor></editor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RequireLabel from "@/components/RequireLabel.vue";
import Editor from "@tinymce/tinymce-vue";
</script>

<style scoped lang="less">
.operate-subject {
  height: 100%;
  overflow-y: auto;
  .operate-subject-main {
    padding: 10px;
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
