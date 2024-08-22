<script setup lang="ts">
import { ref, computed } from 'vue'

const angle = ref(180)

// const topTransform = computed(() => `rotateX(${angle.value}deg)`)
const bottomTransform = computed(() => `rotateX(${angle.value - 360}deg) skewX(${-angle.value}deg)`)
</script>

<template>
  <div class="container">
    <div class="face top-face" style="{ transform: rotateX(0deg)}"></div>
    <div class="face bottom-face" :style="{ transform: bottomTransform }"></div>
    <div class="arc">二面角：{{ 180 - angle }}°</div>
    <input type="range" v-model="angle" min="0" max="180" />
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/cource/components/course4Angle.scss');
</style>
