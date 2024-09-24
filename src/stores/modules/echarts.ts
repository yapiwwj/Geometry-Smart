import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEchartsStore = defineStore('echarts', () => {
  const examIndicatorList = ref<any>([])
  const handleExamIndicatorList = (data: any) => {
    examIndicatorList.value = data
  }

  return { examIndicatorList, handleExamIndicatorList }
})
