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
        <el-form-item label-width="70px" label="用户名" prop="nickname">
          <el-input
            v-model="ruleForm.nickname"
            type="text"
            autocomplete="off"
          />
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
import { login } from "@/api/login";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useAdminStore } from "@/store/admin";
import storage from "@/utils/storage";
import CryptoJS from "crypto-js";

// 表单实例
const ruleFormRef = ref<FormInstance>();
// 校验规则
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

const adminStore = useAdminStore();
const ruleForm = reactive({
  nickname: "",
  password: "",
});
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  nickname: [{ validator: validateUser, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await login(
        ruleForm.nickname,
        CryptoJS.AES.encrypt(
          "123456",
          CryptoJS.enc.Utf8.parse("hAz11oBYbdqfDKaE"),
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString()
      );
      if (data.code !== 2002) {
        // 成功状态码
        ElMessage.error(data.msg);
      } else {
        // 初始化 pinia、本地存储
        ElMessage.success(data.msg);
        adminStore.$patch(data.data);
        storage.setStorage("admin", data.data);
        router.push("/");
      }
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
  background: no-repeat url("@/assets/imgs/login-bg.png") center;
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
