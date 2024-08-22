<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
const chartDom = ref<HTMLElement>()

const dataX = ref([
  { name: '空间中的垂直关系', max: 10 },
  { name: '空间向量', max: 10 },
  { name: '平面角计算', max: 10 },
  { name: '三视图', max: 10 },
  { name: '几何体综合计算', max: 10 },
  { name: '表面积计算', max: 10 }
])
const dataY = ref([10, 5, 8, 7, 5, 6])

const option = {
  title: {
    text: '高频错误知识点',
    left: 'center'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
    // data: ['Allocated Budget'],
  },
  radar: {
    center: ['50%', '60%'],
    indicator: dataX.value
  },
  series: [
    {
      // name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: dataY.value,
          label: {
            normal: {
              show: true
            }
          },
          areaStyle: {
            //设置区域背景颜色透明度
            normal: {
              width: 1,
              opacity: 0.8
            }
          }
        }
      ]
    }
  ]
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
  width: 40%;
  height: 40vh;
  margin-top: 50px;
}
</style>
