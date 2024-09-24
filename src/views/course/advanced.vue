<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { postExam } from '@/api/course'
import type { exam_data } from '@/type/course'

const examList = ref<exam_data>([])
onMounted(async () => {
  const { data } = await postExam(10)
  examList.value = data
})
</script>
<template>
  <div>
    <ul>
      <li v-for="(i, index) in examList" :key="i.id">
        <div>&emsp;&emsp;{{ `${index + 1}` }}.</div>
        <div v-html="i.content"></div>
      </li>
    </ul>
  </div>
  <div style="display: flex; justify-content: flex-end">
    <el-button type="primary">提交</el-button>
  </div>
</template>

<style scoped lang="scss">
li {
  margin: 20px 10px;
}
</style>
