<script setup lang="ts">
import UserCenterSlot from '@/components/userCenterSlot.vue'
</script>

<template>
  <div style="padding: 15px">
    <user-center-slot>
      <template #title>
        <span class="title">章节任务点</span>
      </template>
      <template #big-number>
        <li>
          <header>
            <p>32</p>
            <span>/32章</span>
          </header>
          <footer>完成速度</footer>
        </li>
      </template>
      <template #middle-number>
        <li>
          <header>
            <p>1</p>
            <span>名</span>
          </header>
          <footer>当前排名</footer>
        </li>
      </template>
      <template #class-rank>
        <li>
          <header>
            <p>1</p>
            <span>/32名</span>
          </header>
          <footer>
            <img src="../../../assets/icons/rank.svg" alt="" />
            <span>班级排名</span>
          </footer>
        </li>
      </template>
      <template #progress>
        <el-progress type="circle" :percentage="100" color="#00cd6a">
          <template #default="{ percentage }">
            <span style="display: block; font-size: 12px">完成率</span>
            <span style="display: block; margin-top: 10px; font-size: 28px">{{ percentage }}%</span>
          </template>
        </el-progress>
      </template>
    </user-center-slot>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/usercenter/public.scss');
</style>
