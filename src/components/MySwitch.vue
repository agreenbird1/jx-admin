<template>
  <div class="my-switch">
    <span class="label">{{ label }}</span>
    <span class="switch-bar" @click="changeSwitch">
      <span
        class="switch-dot"
        :class="modelValue ? 'active' : 'de-active'"
      ></span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const changeSwitch = (e: Event) => {
  e.stopPropagation();
  emit("update:modelValue", !props.modelValue);
};
</script>

<style scoped lang="less">
.my-switch {
  text-align: center;
  display: inline-block;
  span {
    display: inline-block;
  }
  .label {
    color: #aaa;
  }
  .switch-bar {
    position: relative;
    transform: translateY(2px);
    background-color: #aaa;
    border-radius: 20px;
    margin-left: 10px;
    width: 30px;
    height: 14px;
    .active {
      right: -5px;
      background-color: @jxColor;
    }
    .de-active {
      right: 100% - 50px;
      background-color: #c7c7cc;
    }
    .switch-dot {
      position: absolute;
      top: -2px;
      height: 18px;
      width: 18px;
      border-radius: 9px;
      transition: all 0.3s ease;
    }
  }
}
</style>
