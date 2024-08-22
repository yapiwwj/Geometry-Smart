<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent])

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {d}%'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    orient: 'vertical',
    top: '10%',
    left: 'left',
    data: ['阅读', '考试', '章节测验', '章节任务点']
  },
  series: [
    {
      name: '综合成绩',
      type: 'pie',
      radius: ['10%', '50%'],
      avoidLabelOverlap: false,
      center: ['50%', '40%'],
      roseType: 'area',
      padAngle: 3,
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 55, name: '章节任务点' },
        { value: 45, name: '章节测验' },
        { value: 0, name: '考试' },
        { value: 0, name: '阅读' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
