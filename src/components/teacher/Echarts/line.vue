<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import {  getLineData } from '@/api/teacher'
import type { Line_Data_X, Line_Data_Y } from '@/type/teacher'
const props = defineProps(['userId'])

const { proxy } = getCurrentInstance() as any
const chartDom = ref<HTMLElement>()

const dataX = ref<Line_Data_X>([])
const dataY = ref<Line_Data_Y>([])

const option =ref(
  {
    title: {
      text: '历次作业/考试成绩',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // prettier-ignore
      data: dataX.value
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 分'
      },
      axisPointer: {
        snap: true
      }
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: '#5470c6'
        },
        {
          gt: 6,
          lte: 8,
          color: '#5470c6'
        },
        {
          gt: 8,
          lte: 14,
          color: '#5470c6'
        },
        {
          gt: 14,
          lte: 17,
          color: '#5470c6'
        },
        {
          gt: 17,
          color: '#5470c6'
        }
      ]
    },
    series: [
      {
        name: '分数',
        type: 'line',
        smooth: true,
        // prettier-ignore
        data: dataY.value
      }
    ]
  }
)
const getData = async () => {
  const {data:{x,y}} = await getLineData(props.userId)
  dataX.value.push(...x)
  dataY.value.push(...y)
  updateChart()

}
const updateChart = () => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  option.value.xAxis.data = dataX.value
  option.value.series[0].data = dataY.value
  myChart.setOption(option.value)
}


onMounted(() => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }

  getData()
})
</script>

<style scoped>
.box {
  width: 80%;
  height: 40vh;
  margin-top: 50px;
}
</style>
