import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { quick_question, dialog, recommend_question } from '@/type/function'

export const useAIStore = defineStore('AI', () => {
  const quickQuestion = ref<quick_question>([
    { id: 0, question: '如何求一个球体的表面积?' },
    { id: 1, question: '二面角的范围是多少?' },
    { id: 2, question: '学习立体几何有什么好的方法和建议?' }
  ])

  const dialogList = reactive<dialog>([
    {
      id: 0,
      type: 'gpt',
      text:
        '嗨，聪明的同学们！我是你的AI助手，专门负责拯救大家于立体几何的苦海之中。无论你是几何小白还是几何大神，我都会竭尽全力帮你解开那些立体几何的神秘面纱。\n' +
        '你可以问我各种奇妙的问题，比如：“什么是二面角？”、“怎么计算立方体的表面积？”或者“立体几何和吃薯片有什么关系？”（当然，最后一个可能有点难为我了 😅）。\n' +
        '不过，有个小小的提醒：我不能直接告诉你答案。嘿嘿，自己动脑筋可是最棒的学习方式！但是，我会给你指引和提示，直到你拍着脑袋大喊“我懂了！”。\n' +
        '准备好了吗？让我们一起探索立体几何的奇妙世界吧！'
    }
  ])

  const recommendQuestionList = ref<recommend_question>([
    { id: 0, question: 'BCDE是一个正方形，ABL平面BCDE，则图中(侧面，底面)互相垂直的平面共有( )' },
    { id: 1, question: 'ABCD是一个正方形，ABL平面BCDE，则图中(侧面，底面)互相垂直的平面共有( )' },
    { id: 2, question: 'ABCD是一个正方形，ABL平面BCDE，则图中(侧面，底面)互相垂直的平面共有( )' },
    { id: 3, question: 'ABCD是一个正方形，ABL平面BCDE，则图中(侧面，底面)互相垂直的平面共有( )' },
    { id: 4, question: 'ABCD是一个正方形，ABL平面BCDE，则图中(侧面，底面)互相垂直的平面共有( )' }
  ])
  const handleAddMessage = (type: string, text: string) => {
    dialogList.push({ id: dialogList.length, type, text })
  }

  return { quickQuestion, dialogList, recommendQuestionList, handleAddMessage }
})
