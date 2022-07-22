<template>
  <span>{{ text }}</span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<style scoped lang="less">
span {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  &::after {
    position: absolute;
    top: 0;
    right: -8px;
    content: "*";
    color: @dangerColor;
  }
}
</style>
