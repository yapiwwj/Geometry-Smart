<script setup lang="ts">
import { ref } from 'vue'
import UserCenterSlot from '@/components/userCenterSlot.vue'

const discussList = ref([
  { id: 0, event: '发帖', times: 7 },
  { id: 1, event: '回帖', times: 10 },
  { id: 2, event: '获赞量', times: 30 }
])
</script>

<template>
  <div style="padding: 15px">
    <user-center-slot>
      <template #title>
        <span class="title">讨论</span>
      </template>
      <template #big-number>
        <li v-for="item in discussList" :key="item.id" style="margin-right: calc(100% / 3 - 40px)">
          <header>
            <p>{{ item.times }}</p>
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
</style>
