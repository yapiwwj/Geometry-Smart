<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getTestContents, judgeQuestion } from '@/api/course'

const props = defineProps(['id'])
//获取题目
const questionList = ref<any[]>([])
const doneValue = ref()
const analysisValue = ref<string[]>([])
const answerValue = ref<string[]>([])
const lastSheet = ref<any[]>([])
const alphabet = ref('BB')
const getTest = async () => {
  const data_get = {
    id: props.id,
    type: 0
  }
  const {
    data: { done, question }
  } = await getTestContents(JSON.stringify(data_get))
  doneValue.value = done
  questionList.value = JSON.parse(question)

  //若做过，获取答案
  if (doneValue.value === 1) {
    console.log('已答题')
    const data_get = {
      id: props.id,
      type: 0
    }
    const {
      data: { analysis, answer, sheet }
    } = await getTestContents(JSON.stringify(data_get))

    analysisValue.value = analysis!.split('|') //['test','test']
    answerValue.value = answer!.split('') //['B','B']
    lastSheet.value = JSON.parse(sheet as any)
  }
}

const activeNames = ref([''])
const handleChange = (val: string[]) => {}

//提交
const mySheetList = ref<{ id: number; value: string }[]>([])
const select = async (value: string, id: number) => {
  const data = { id, value }
  // 查找是否已有相同 id 的数据，如果有则更新它
  const existingIndex = mySheetList.value.findIndex((item) => item.id === id)
  // 如果存在相同的 id，更新该项的 value,如果不存在，则添加新的数据
  existingIndex !== -1 ? (mySheetList.value[existingIndex] = data) : mySheetList.value.push(data)

  // 对 answerList 按照 id 升序排序
  mySheetList.value.sort((a, b) => a.id - b.id)
  handleAnswerToBoolean()
}

//将{id:number, value:string}[]处理成boolean[][]格式
const indexMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 }
const sheetList = ref<boolean[][]>([])
const handleAnswerToBoolean = () => {
  // 初始化结果数组
  // 更新 sheetList
  sheetList.value = mySheetList.value.map((item) => {
    // 初始化每行的布尔数组，长度为4，对应 A, B, C, D
    const row = new Array(4).fill(false)

    // 根据 value 找到对应的列索引，并设置为 true
    const valueIndex = indexMap[item.value]
    if (valueIndex !== undefined) {
      row[valueIndex] = true
    }

    return row
  })
}

const submit = async () => {
  const judge_data = {
    id: props.id,
    type: 0,
    sheet: JSON.stringify(sheetList.value)
  }
  const res = await judgeQuestion(JSON.stringify(judge_data))
  lastSheet.value = res.data.judge
  await getTest()
}
watch(
  () => props.id,
  () => {
    getTest()
  }
)

onMounted(() => {
  getTest()
})
</script>

<template>
  <div class="qusetion-container">
    <ul>
      <li class="question-body" style="list-style: none" v-for="i in questionList" :key="i.id">
        <div class="question">
          <img :src="i.img" alt="" style="width: 500px" />
          <div class="select">
            <input
              type="radio"
              :name="i.name"
              :checked="doneValue === 0 ? false : lastSheet[i.id][0]"
              :disabled="doneValue === 1"
              @click="select('A', i.id)"
            /><span>{{ i.A }}</span>
            <br />
            <input
              type="radio"
              :name="i.name"
              :checked="doneValue === 0 ? false : lastSheet[i.id][1]"
              :disabled="doneValue === 1"
              @click="select('B', i.id)"
            /><span>{{ i.B }}</span>
            <br />
            <input
              type="radio"
              :name="i.name"
              :checked="doneValue === 0 ? false : lastSheet[i.id][2]"
              :disabled="doneValue === 1"
              @click="select('C', i.id)"
            /><span>{{ i.C }}</span>
            <br />
            <input
              type="radio"
              :name="i.name"
              :checked="doneValue === 0 ? false : lastSheet[i.id][3]"
              :disabled="doneValue === 1"
              @click="select('D', i.id)"
            /><span>{{ i.D }}</span>
          </div>
        </div>
        <div class="answer" v-if="doneValue === 1">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="显示答案">
              <div>
                <h4>{{ alphabet[i.id] }}</h4>
                <p>{{ analysisValue[i.id] }}</p>
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
