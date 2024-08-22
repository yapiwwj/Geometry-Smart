<script setup lang="ts">
import Header from '../../../components/teacher/teacherHeader.vue'
import Aside from '../../../components/teacher/aside.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.el-aside {
  border-right: 1px solid #c0c0c0;
}
.el-main {
  border-top: 1px solid #c0c0c0;
}
</style>
