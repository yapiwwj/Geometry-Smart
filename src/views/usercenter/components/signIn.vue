<script setup lang="ts">
import { ref } from 'vue'
import UserCenterSlot from '@/components/userCenterSlot.vue'
import ProgressView from '@/views/usercenter/components/progress.vue'

const signInList = ref([
  { id: 0, event: '出勤', times: 16 },
  { id: 1, event: '缺勤', times: 0 },
  { id: 2, event: '早退', times: 0 },
  { id: 3, event: '迟到', times: 0 },
  { id: 4, event: '病假', times: 0 },
  { id: 5, event: '事假', times: 1 },
  { id: 6, event: '公假', times: 0 }
])

const listLength = ref(signInList.value.length)
</script>

<template>
  <div style="padding: 15px">
    <user-center-slot>
      <template #title>
        <span class="title">签到</span>
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
    <progress-view :type="0" titleName="出勤率" :num1="16" :num2="17"></progress-view>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/usercenter/public.scss');
li {
  margin-top: 10px;
  margin-right: calc(100% / var(--length) - 40px);
}
li:nth-child(1) {
  margin-left: 20px;
}
</style>
