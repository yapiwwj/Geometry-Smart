<script setup lang="ts">
import FunctionHeader from '@/components/functionHeader.vue'
</script>

<template>
  <div class="container">
    <div class="content">
      <function-header />
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/function/index.scss');
</style>
