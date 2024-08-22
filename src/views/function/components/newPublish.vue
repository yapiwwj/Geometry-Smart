<script setup lang="ts">
const props = defineProps(['publish'])
</script>

<template>
  <el-scrollbar height="600px">
    <ul>
      <li v-for="(i, index) in props.publish" :key="index">
        <div class="content-range card-top">
          <img :src="i.avatar" alt="" />
          <span>{{ i.name }}</span>
        </div>
        <div class="content-range reply-box">
          <h4>{{ i.title }}</h4>
          <p>{{ i.content }}</p>
        </div>
      </li>
    </ul>
  </el-scrollbar>
</template>

<style scoped lang="scss">
@import url('../../../styles/function/newReply.scss');
</style>
