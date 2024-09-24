<template>
  <div ref="chartDom" :style="{ width: '100%', height: '350px' }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, watch } from 'vue'

const props = defineProps(['indicator'])

const { proxy } = getCurrentInstance() as any
const chartDom = ref<HTMLElement | null>(null)

const option = {
  title: {
    text: '全班平均高频错误知识点',
    left: 'center',
    top: '0%'
  },
  radar: {
    shape: 'circle',
    indicator: [
      { name: '空间中的垂直关系', max: 10 },
      { name: '空间向量', max: 10 },
      { name: '平面角计算', max: 10 },
      { name: '二面角计算', max: 10 },
      { name: '几何体综合计算', max: 10 },
      { name: '表面积计算', max: 10 }
    ],
    center: ['50%', '55%']
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [8, 5, 7, 6, 5, 8],
          name: 'Allocated Budget',
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
  window.onresize = () => {
    myChart.resize()
  }
  watch(
    () => props.indicator,
    () => {
      myChart.resize()
    },
    {
      deep: true
    }
  )
})
</script>
