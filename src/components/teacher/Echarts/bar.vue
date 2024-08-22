<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'

const chartDom = ref<HTMLElement>()
const { proxy } = getCurrentInstance() as any


const dataX = ref([
  ['错误知识点率', '第一次课后练习', '第二次课后练习', '第一次测试'],
  ['平面与平面垂直', 9, 8, 0],
  ['立方体体积计算', 8, 4, 2],
  ['几何体表面积计算', 8, 6, 2],
  ['三视图', 7, 5, 3],
  ['二面角', 7, 5, 0]
])
const dataY = ref(['错误知识点率', '第一次课后练习', '第二次课后练习', '第一次测试'])
const option = {
  title: {
    text: '近期高频错误知识点改善情况',
    subtext: '立体几何AI智能计算',
    left: 'center'
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    data: dataY.value
  },
  tooltip: {},
  dataset: {
    source: dataX.value
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
}

onMounted(() => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 33vh;
  border-bottom: 1px solid #c0c0c0;
}
</style>
