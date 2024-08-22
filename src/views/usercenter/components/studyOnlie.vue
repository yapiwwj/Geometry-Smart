<script setup lang="ts">
import UserCenterSlot from '@/components/userCenterSlot.vue'
</script>

<template>
  <div style="padding: 15px">
    <user-center-slot>
      <template #title>
        <span class="title">在线学习</span>
      </template>
      <template #big-number>
        <li>
          <header>
            <p>32</p>
            <span>次</span>
          </header>
          <footer>章节学习次数</footer>
        </li>
      </template>
    </user-center-slot>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/usercenter/public.scss');
</style>
