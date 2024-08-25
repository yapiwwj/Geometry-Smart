<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import {  getRadarData } from '@/api/teacher'
import type {Radar_Data_X,Radar_Data_Y} from '@/type/teacher'
const props = defineProps(['userId'])

const { proxy } = getCurrentInstance() as any
const chartDom = ref<HTMLElement>()

const dataX = ref<Radar_Data_X>([])
const dataY = ref<Radar_Data_Y>([])
// const dataX = ref([
//   { name: '空间中的垂直关系', max: 10 },
//   { name: '空间向量', max: 10 },
//   { name: '平面角计算', max: 10 },
//   { name: '三视图', max: 10 },
//   { name: '几何体综合计算', max: 10 },
//   { name: '表面积计算', max: 10 }
// ])
// const dataY = ref([10, 5, 8, 7, 5, 6])

const option = ref(
  {
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
)


const getData = async () => {
  const {data:{abilities,y}} = await getRadarData(props.userId)
  dataX.value.push(...abilities)
  dataY.value.push(...y)
  updateChart()
}
const updateChart = () => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  option.value.radar.indicator = dataX.value
  option.value.series[0].data[0].value = dataY.value
  myChart.setOption(option.value)
}

onMounted(() => {
  const echarts = proxy.$echarts
  const myChart = echarts.init(chartDom.value)
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })

  getData()
})
</script>

<style scoped>
.box {
  width: 40%;
  height: 40vh;
  margin-top: 50px;
}
</style>
