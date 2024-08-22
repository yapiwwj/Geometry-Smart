<template>
  <div>
    <el-row class="box">
      <el-col :span="12">
        <div class="logo-box" @click="router.push('/layout')">
          <svg-icon class="logo" name="logo" width="50" height="50"></svg-icon>
          <span>立体智学</span>
        </div>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="2" v-for="item in sourceList" :key="item.name">
        <div class="source" @click="router.push(item.url)">{{ item.name }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sourceList = ref([
  {
    name: '课程',
    icon: 'course',
    url: '/course'
  },
  {
    name: '功能',
    icon: 'function',
    url: '/function'
  },
  {
    name: '个人',
    icon: 'usercenter',
    url: '/usercenter'
  }
])
</script>

<style scoped lang="scss">
@import url('../styles/components/header.scss');
</style>
