<script setup lang="ts">
import { ref } from 'vue'
import UserCenterSlot from '@/components/userCenterSlot.vue'

const signInList = ref([
  { id: 0, event: '错题数', times: 16 },
  { id: 1, event: '高频错点', times: 0 },
  { id: 2, event: '考试/作业次数', times: 4 }
])

const listLength = ref(signInList.value.length)
</script>

<template>
  <div style="padding: 15px">
    <user-center-slot>
      <template #title>
        <span class="title">AI智能错误分析</span>
      </template>
      <template #middle-number>
        <li v-for="item in signInList" :key="item.id" :style="{ '--length': listLength }">
          <header>
            <p style="font-size: 30px">{{ item.times }}</p>
            <span></span>
          </header>
          <footer>{{ item.event }}</footer>
        </li>
      </template>
    </user-center-slot>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/usercenter/public.scss');
.title {
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0;
}
li {
  margin-top: 10px;
  margin-right: calc(42% / var(--length) - 40px) !important;
}
li:nth-child(1) {
  margin-left: 20px;
}
</style>
