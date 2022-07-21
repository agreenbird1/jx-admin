<template>
  <div class="course">
    <main-header @new-item="newItem"> </main-header>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "@/components/MainHeader.vue";

const newItem = () => console.log("new item");
</script>

<style scoped lang="less"></style>
