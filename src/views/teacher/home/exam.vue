<script setup lang="ts">
import { ref } from 'vue'
import Pie from '@/views/teacher/components/Pie.vue'

const setButtonList = ref([
  { id: 0, name: '知识点检测', type: '' },
  { id: 1, name: '章节复习', type: '' },
  { id: 2, name: '综合测试', type: '' }
])

const selectButton = (index: number) => {
  setButtonList.value.forEach((item) => {
    index === item.id ? (item.type = 'primary') : (item.type = '')
  })
}

const demonstration = ref(0)
const demonstration2 = ref(0)
const marks = ref({
  0: '客观题',
  100: '主观题'
})
const marks2 = ref({
  0: '随机权重'
})

const fillButtonList = ref([
  { id: 0, name: '认识几何体', type: '', selected: false },
  { id: 1, name: '几何体表面积与体积', type: '', selected: false },
  { id: 2, name: '平面的定义与公理', type: '', selected: false },
  { id: 3, name: '直线与直线的位置关系', type: '', selected: false },
  { id: 4, name: '空间中的夹角', type: '', selected: false },
  { id: 5, name: '线面平行的判定与性质', type: '', selected: false },
  { id: 6, name: '面面平行的判定与性质', type: '', selected: false },
  { id: 7, name: '线面垂直的判定与性质', type: '', selected: false },
  { id: 8, name: '二面角与面面垂直', type: '', selected: false }
])

interface IndicatorItem {
  name: string
  max: number
}
const indicator = ref<IndicatorItem[]>([])
const selectFillButton = (index: number) => {
  const button = fillButtonList.value[index]
  button.selected = !button.selected
  button.type = button.id === index && button.selected ? 'primary' : ''

  const existsInIndicator = indicator.value.find((item) => item.name === button.name)
  if (button.selected && !existsInIndicator) {
    indicator.value.push({ name: button.name, max: 10 })
  } else if (!button.selected && existsInIndicator) {
    indicator.value = indicator.value.filter((item) => item.name !== button.name)
  }
  console.log(indicator.value)
}
</script>
<template>
  <div class="container">
    <ul>
      <li class="set">
        <span>目标设定</span>
        <section>
          <div class="set-item">
            <el-button
              :type="item.type"
              v-for="(item, index) in setButtonList"
              :key="item.id"
              @click="selectButton(index)"
              >{{ item.name }}
            </el-button>
          </div>
        </section>
      </li>
      <li class="distribution">
        <span>题型分布</span>
        <section>
          <div class="slider-demo-block">
            <el-slider v-model="demonstration" :step="10" show-stops :marks="marks" />
          </div>
        </section>
        <section>
          <div class="slider-demo-block">
            <el-slider
              v-model="demonstration2"
              show-input
              size="small"
              :marks="marks2"
              :max="1"
              :step="0.01"
            />
          </div>
        </section>
      </li>
      <li class="fill">
        <span>知识点覆盖</span>
        <section>
          <div class="fill-item-left">
            <el-button
              :type="item.type"
              v-for="(item, index) in fillButtonList"
              :key="item.id"
              @click="selectFillButton(index)"
              >{{ item.name }}
            </el-button>
          </div>
          <div class="fill-item-right">
            <Pie />
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/teacher/exam';
</style>
