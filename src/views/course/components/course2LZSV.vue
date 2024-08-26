<script setup lang="ts">
import { ref, computed } from 'vue'
const radius = ref(100)
const height = ref(100)

const surfaceCM = computed(() => {
  let circle = Math.PI*radius.value*radius.value
  let side = 2*Math.PI*radius.value*height.value
  return (circle*2+side).toFixed(2)
})

const surfaceM = computed( () => {
  return (surfaceCM.value as any/ 10000).toFixed(2)
})

const volumeCM = computed(() => {
  return (Math.PI*radius.value*radius.value*height.value).toFixed(2)
})

const volumeM = computed(() => {
  return (volumeCM.value as any/ 1000000).toFixed(2)
})

</script>
<template>
  <div class="container">
    <div class="lz" ></div>
  </div>
  <div class="calculate">
    <p>假设当前半径：{{ radius }}cm</p>
    <p>假设当前高：{{ height }}cm</p>
    <p>则当前表面积：{{ surfaceCM }}cm² => {{surfaceM}}m²</p>
    <p>则当前体积：{{volumeCM}}cm³ => {{volumeM}}m³</p>
  </div>
  <div class="slider-container">
    <ul>
      <li>
        <div class="slider-demo-block">
          <span class="demonstration">宽</span>
          <el-slider v-model="radius" :min="100" :max="200" />
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
@import url('../../../styles/cource/components/course2LZSV.scss');
</style>