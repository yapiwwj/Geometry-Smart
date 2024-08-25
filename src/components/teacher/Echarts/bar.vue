<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { getBarData } from '@/api/teacher'
import type { Bar_Data_X, Bar_Data_Y } from '@/type/teacher'
const props = defineProps(['userId'])

const chartDom = ref<HTMLElement>()
const { proxy } = getCurrentInstance() as any

const dataX = ref<Bar_Data_X[]>([])
const dataY = ref<Bar_Data_Y>([])

const option = ref({
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
})

const getData = async () => {
  const { data } = await getBarData(props.userId)
  dataX.value.push(...data.x)
  dataY.value.push(...data.y)
  updateChart()
}
const updateChart = () => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  option.value.legend.data = dataY.value
  option.value.dataset.source = dataX.value
  myChart.setOption(option.value)
}

onMounted(async () => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })

  await getData()
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 33vh;
  border-bottom: 1px solid #c0c0c0;
}
</style>
