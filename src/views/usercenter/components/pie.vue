<script setup lang="ts">
import pie from '../../../components/Echarts/source.vue'
</script>

<template>
  <div class="pie-box">
    <header>综合成绩</header>
    <pie></pie>
  </div>
</template>

<style scoped lang="scss">
.pie-box {
  position: relative;
  padding: 10px;

  header {
    position: absolute;
    top: 10px;
    left: 15px;
  }
}
</style>
