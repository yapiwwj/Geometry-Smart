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
    {
      id: 0,
      question:
        '如图，在三棱柱ABC-A₁B₁C₁中，侧棱垂直于底面，AB⊥BC，AA₁=AC=2,E、F分别为A₁C₁、BC的中点。（1）求证：平面ABE⊥平面B₁BC₁C;（2）求证：C₁F∥平面ABE;（3）求三棱锥E-ABC的体积。'
    },
    {
      id: 1,
      question:
        '在边长为a的菱形ABCD中，∠ABC=60°，PC⊥面ABCD，E,F是PA和AB的中点。（1）求证：EF∥平面PBC；（2）求E到平面PBC的距离。'
    },
    {
      id: 2,
      question:
        '已知如图1,在Rt△ABC中，∠ACB=30°，∠ABC=90°，D为AC中点，AE⊥BD于E，延长AE交BC于F，将△ABD沿BD折起，使平面ABD⊥平面BCD，如图2所示。（1）求证：AE⊥平面BCD;（2）求二面角A-DC-B的余弦值;（3）求三棱锥B-AEF与四棱锥A-FEDC的体积比。'
    }
  ])
  const handleAddMessage = (type: string, text: string) => {
    dialogList.push({ id: dialogList.length, type, text })
  }

  return { quickQuestion, dialogList, recommendQuestionList, handleAddMessage }
})
