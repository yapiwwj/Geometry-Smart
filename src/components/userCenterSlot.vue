<script setup lang="ts"></script>

<template>
  <header>
    <slot name="title"></slot>
    <div>
      <p>详情</p>
      <el-icon color="#626c89">
        <ArrowRight />
      </el-icon>
    </div>
  </header>
  <ul>
    <slot name="big-number"></slot>
    <slot name="middle-number"></slot>
    <slot name="class-rank"></slot>
    <slot name="progress"></slot>
  </ul>
</template>

<style scoped lang="scss">
@import url('../styles/components/userCenterSlot.scss');
</style>
