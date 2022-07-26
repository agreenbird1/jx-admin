<template>
  <div class="login">
    <el-card shadow="always">
      <div class="title mb-10">Hello!</div>
      <p>欢迎来到觉晓科技-管理后台登录页</p>
      <el-form
        ref="ruleFormRef"
        label-position="left"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label-width="70px" label="用户名" prop="user">
          <el-input v-model="ruleForm.user" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label-width="70px" label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: unknown, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else if (value.length < 6) {
    callback(new Error("密码最少六位！"));
  } else if (value.length > 16) {
    callback(new Error("密码最多十六位！"));
  }
  return true;
};
const validateUser = (rule: unknown, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("用户名不能为空"));
  }
  return true;
};

const ruleForm = reactive({
  user: "",
  password: "",
});

const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  user: [{ validator: validateUser, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    }
  });
};
</script>

<style scoped lang="less">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: no-repeat url("../../assets/imgs/login-bg.png") center;
  background-size: cover;
  .el-card {
    .title {
      font-size: 24px;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      color: @assistTextColor;
      margin-bottom: 30px;
    }
    :deep(.el-form-item) {
      .el-form-item__content {
        margin-left: 0 !important;
        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
