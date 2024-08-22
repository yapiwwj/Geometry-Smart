<script setup lang="ts">
import {useRoute} from "vue-router";

import Bar from '../../../../components/teacher/Echarts/bar.vue'
import Radar from '../../../../components/teacher/Echarts/radar.vue'
import Line from '../../../../components/teacher/Echarts/line.vue'

const route = useRoute()
const {id, name} = route.query
</script>

<template>
  <h2>{{name}}的AI智能分析</h2>
  <Bar/>
  <div>
    <Radar/>
    <Line/>
  </div>
</template>

<style scoped lang="scss">
div{
  display: flex;
}
</style>