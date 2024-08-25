<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { judgeQuestion } from '@/api/course'
import { getTestContents } from '@/api/course'

const props = defineProps(['question', 'done', 'id', 'lastSheet'])

const checkedList = ref<boolean[][]>([
  [false, false, false, false],
  [false, false, false, false]
])

const activeNames = ref([''])
const handleChange = (val: string[]) => {}

//答题数组
const sheetList = ref<{ id: number; value: string }[]>([])
const radio = (value: string, id: number) => {
  const data = { id, value }
  sheetList.value.push(data)
}

const handleSheetList = computed(() => {
  const lastValueMap = new Map<number, string>()
  sheetList.value.forEach((item) => {
    lastValueMap.set(item.id, item.value)
  })
  const sortedList = Array.from(lastValueMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map((entry) => entry[1])
  return sortedList.join('')
})

//post
const analysisValue = ref<string[]>([])
const submit = async () => {
  await handleSubmit()
}

const handleSubmit = async () => {
  const data = { id: Number(props.id), type: 0, sheet: handleSheetList.value }
  await judgeQuestion(JSON.stringify(data))
}

const lastSheetValue = ref<string>('')
const answerValue = ref<string[]>([])
const lastSheet = async () => {
  const data = { id: Number(props.id), type: 0 }
  const {
    data: { sheet, analysis, answer }
  } = await getTestContents(JSON.stringify(data))
  if (sheet != null && analysis != null && answer != null) {
    analysisValue.value = analysis.split('|')
    lastSheetValue.value = sheet
    answerValue.value = answer.split('')
  }
}

const indexMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 }
const handleLastSheet = computed(() => {
  return lastSheetValue.value.split('').map((char) => {
    const selectionArray = [false, false, false, false]
    const index = indexMap[char]
    if (index !== undefined) {
      selectionArray[index] = true
    }
    return selectionArray
  })
})

onMounted(() => {
  lastSheet()
})
</script>

<template>
  <div class="qusetion-container">
    <ul>
      <li class="question-body" style="list-style: none" v-for="i in props.question" :key="i.id">
        <div class="question">
          <img :src="i.img" alt="" style="width: 500px" />
          <div class="select">
            <input
              type="radio"
              :name="i.name"
              :checked="props.done === 1 ? handleLastSheet[i.id] : checkedList[i.id][0]"
              :disabled="props.done === 1"
              @click="radio('A', i.id)"
            /><span>{{ i.A }}</span>
            <input
              type="radio"
              :name="i.name"
              :checked="props.done === 1 ? handleLastSheet[i.id] : checkedList[i.id][1]"
              :disabled="props.done === 1"
              @click="radio('B', i.id)"
            /><span>{{ i.B }}</span>
            <input
              type="radio"
              :name="i.name"
              :checked="props.done === 1 ? handleLastSheet[i.id] : checkedList[i.id][2]"
              :disabled="props.done === 1"
              @click="radio('C', i.id)"
            /><span>{{ i.C }}</span>
            <input
              type="radio"
              :name="i.name"
              :checked="props.done === 1 ? handleLastSheet[i.id] : checkedList[i.id][3]"
              :disabled="props.done === 1"
              @click="radio('D', i.id)"
            /><span>{{ i.D }}</span>
          </div>
        </div>
        <div class="answer" v-if="props.done === 1">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="显示答案">
              <div>
                <!-- <h4>{{ answerValue[i.id] }}</h4>
                <p>{{ analysisValue[i.id] }}</p> -->
                <h4>B</h4>
                <p>根据棱柱的定义，可知1、2、6为属于棱柱。</p>
                <p class="QR">
                  <img src="/img/QR.jpg" alt="" />
                  <span>扫码观看视频讲解</span>
                </p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </li>
    </ul>
    <div style="float: right; padding: 20px 0">
      <el-button type="primary">重置</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/cource/components/question.scss');
</style>
