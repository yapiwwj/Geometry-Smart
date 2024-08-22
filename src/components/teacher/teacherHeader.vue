<template>
  <div>
    <el-row class="box">
      <el-col :span="12">
        <div class="logo-box" @click="router.push('/teacher')">
          <img src="../../assets/icons/logo.svg" style="width: 50px; height: 50px" alt="" />
          <span>立体智学</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
@import url('../../styles/teacher/components/header.scss');
</style>
