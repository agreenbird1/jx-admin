<template>
  <div class="main-header">
    <div>
      <el-icon @click="changeMenu"><i-ep-switch /></el-icon>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right">
        <el-button size="small" type="primary" @click="newItem">
          新建
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import mitt from "@/utils/Bus";

const emits = defineEmits(["newItem"]);
const changeMenu = () => mitt.emit("asideCollapse");
const newItem = () => emits("newItem");
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 16px 0 16px;
  border-bottom: 1px solid @bgColor;
  .el-icon {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
