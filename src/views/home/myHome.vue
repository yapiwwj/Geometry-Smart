<script setup lang="ts">
import Header from '../../components/header.vue'
</script>

<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main style="padding: 0">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.el-header {
  position: relative;
  width: 100%;
  height: $base-tabbar-height;
}
</style>
