<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const format1 = (percentage: number) => (percentage === 100 ? '100%' : `${percentage}%`)
const format2 = () => `${props.num1}/${props.num2}`

const props = defineProps(['type', 'num1', 'num2', 'titleName'])
const frequency = computed<number>(() => {
  return Number(((props.num1 / props.num2) * 100).toFixed(2))
})
</script>

<template>
  <div class="container" style="margin-top: 15px">
    <span class="box1" v-if="type === 0">
      {{ props.titleName }}
      <el-progress class="progress1" :percentage="frequency" :format="format1" color="#00cd6a">
      </el-progress>
    </span>

    <div class="box2" v-if="type === 1">
      <span>{{ props.titleName }}</span>
      <el-progress class="progress2" :percentage="frequency" :format="format2" color="#00cd6a">
      </el-progress>
      <div class="detail">
        <span>详情</span>
        <el-icon color="#626c89">
          <ArrowRight />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/usercenter/components/progress.scss');
</style>
