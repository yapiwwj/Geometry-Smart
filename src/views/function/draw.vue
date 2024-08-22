<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="draw-container">
    <ul class="box">
      <li>
        <iframe src="http://121.40.154.188:9001/" frameborder="0" scrolling="no"></iframe>
      </li>
      <el-button plain @click="router.push('/function/transform')">立体转化</el-button>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/function/draw.scss');
</style>
