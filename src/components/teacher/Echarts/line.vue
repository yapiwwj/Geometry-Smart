<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
const chartDom = ref<HTMLElement>()

const dataX = ref(['第一次课后练习', '第二次课后练习', '第一次测试'])
const dataY = ref([70, 72, 90])
const option = {
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

onMounted(() => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }
})
</script>

<style scoped>
.box {
  width: 80%;
  height: 40vh;
  margin-top: 50px;
}
</style>
