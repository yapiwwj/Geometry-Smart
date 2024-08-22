import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { is_tip_show_arraylist } from '@/type/course'
import { updateCourseContents } from '@/api/course'

export const useTipsStore = defineStore('tips', () => {
  const content = ref<string>('')
  const openedTipsID = ref<number[]>([-1])
  const isTipShowArrayList = ref<is_tip_show_arraylist>([
    { id: -1, isShow: false, tipTitle: '', tipContent: '' }
  ])
  const resetContent = ref<string>()
  const handleContent = (Content: string, Init: string) => {
    content.value = Content
    resetContent.value = Init
  }

  const handleTipContent = (id: number, TipTitle: string, TipContent: string, judge: boolean) => {
    if (openedTipsID.value.includes(id)) return
    isTipShowArrayList.value.push({ id, isShow: judge, tipTitle: TipTitle, tipContent: TipContent })
    openedTipsID.value.push(id)
  }
  //处理弹窗关闭
  const handleTipClose = (id: number) => {
    const index: number = isTipShowArrayList.value.findIndex((item) => item.id === id)
    const openedID: number = openedTipsID.value.findIndex((item) => item === id)
    if (index !== -1 && openedID !== -1) {
      // index !== -1，即为找到
      isTipShowArrayList.value.splice(index, 1)
      openedTipsID.value.splice(openedID, 1)
    }
  }

  //处理标注后的更新
  const handleCourseContentUpdate = async (id: number, content: string) => {
    const data = { id, content }
    await updateCourseContents(data)
  }
  return {
    resetContent,
    openedTipsID,
    isTipShowArrayList,
    content,
    handleContent,
    handleTipContent,
    handleTipClose,
    handleCourseContentUpdate
  }
})
