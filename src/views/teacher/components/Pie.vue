<template>
  <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from 'vue'
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance() as any
    // 配置建议写在 onMount 的外面
    const option = {
      radar: {
        shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    }
    onMounted(() => {
      // 获取挂载的组件实例
      const echarts = proxy.$echarts
      //初始化挂载
      const echarts1 = echarts.init(document.getElementById('myChart'))
      //添加配置
      echarts1.setOption(option)
      // 自适应
      window.onresize = function () {
        echarts1.resize()
      }
    })
    return {}
  }
})
</script>