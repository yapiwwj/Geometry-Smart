<script setup lang="ts">
import { ref } from 'vue'
import ProgressView from '@/views/usercenter/components/progress.vue'

const tasksList = ref([
  { id: 0, title: '章节测验', num1: 32, num2: 32 },
  { id: 1, title: '在线考试', num1: 3, num2: 3 },
  { id: 2, title: '课程作业', num1: 30, num2: 32 },
  { id: 3, title: '互动检测', num1: 10, num2: 32 }
])
</script>

<template>
  <div style="padding: 15px">
    <header>
      <span class="title">学习任务</span>
    </header>
    <ul>
      <li v-for="item in tasksList" :key="item.id">
        <progress-view
          :type="1"
          :titleName="item.title"
          :num1="item.num1"
          :num2="item.num2"
          style="padding: 6px 0"
        ></progress-view>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/usercenter/public.scss');
header {
  span {
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
  }
}

li {
  margin-top: 10px;
  margin-right: calc(42% / var(--length) - 40px) !important;
}
</style>
