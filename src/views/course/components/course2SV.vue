<script setup lang="ts">
import { ref, computed } from 'vue'
const width = ref(100)
const height = ref(100)

const surfaceCM = computed(() => {
  return width.value * height.value * 6
})

const surfaceM = computed(() => {
  return (surfaceCM.value / 10000).toFixed(2)
})

const volumeCM = computed(() => {
  return width.value * height.value * 100
})

const volumeM = computed(() => {
  return (volumeCM.value / 1000000).toFixed(2)
})
</script>
<template>
  <header>
    <h4 class="title">几何体表面积与体积</h4>
  </header>
  <div class="container">
    <ul class="cube">
      <li class="face front" :style="{ width: `${width}px`, height: `${height}px` }"></li>
      <li class="face right" :style="{ height: `${height}px` }"></li>
      <li class="face top" :style="{ width: `${width}px` }"></li>
    </ul>
  </div>
  <div class="caculate">
    <p>假设当前宽：{{ width }}cm</p>
    <p>假设当前高：{{ height }}cm</p>
    <p>假设当前长：100cm</p>
    <p>则当前体积:{{ volumeCM }}cm³ => {{ volumeM }}m³</p>
    <p>则当前表面积：{{ surfaceCM }}cm² => {{ surfaceM }}m²</p>
  </div>

  <div class="slider-container">
    <ul>
      <li>
        <div class="slider-demo-block">
          <span class="demonstration">宽</span>
          <el-slider v-model="width" :min="100" :max="300" />
        </div>
      </li>
      <li>
        <div class="slider-demo-block">
          <span class="demonstration">高</span>
          <el-slider v-model="height" :min="100" :max="300" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/cource/components/course2SV.scss');
</style>
