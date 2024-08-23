<template>
  <ul>
    <li class="left">
      <div class="highlight">
        <highlight-toolbar
          :selectedRange="selectedRange"
          :content="content"
          :contentHTML="contentHTML"
          :contentId="contentId"
        />
      </div>
      <div class="content-container">
        <div class="pdf-box">
          <li><h3>知识点讲解</h3></li>
          <iframe src="/pdf/1.pdf" frameborder="0"></iframe>
        </div>
       <div class="content-box">
          <li style="list-style: circle"><h3>知识点总结</h3></li>
          &emsp;
          <div
            id="contentHTML"
            ref="contentHTML"
            v-html="content"
            class="content"
            @click="popTip"
            @mouseup="handleMouseUp"
          ></div>
          <ul>
            <li v-for="item in isTipShowArrayList" :key="item.id">
              <drag-resize
                :id="item.id"
                :tipTitle="item.tipTitle"
                :tipContent="item.tipContent"
                :isShow="item.isShow"
                @closePop="handleTipCloseFn"
              ></drag-resize>
            </li>
          </ul>
        </div>
        <div class="test">

        </div>

        <div class="jiaohu-box">
          <ul>
            <li><h3>知识交互</h3></li>
          </ul>
          <course1-cube />
          <course1-geometry />
        </div>
        <div class="question-box">
          <ul>
            <li><h3>知识小测</h3></li>
          </ul>
          <question1 :question="questionList" :done="doneValue" :id="contentId" />
        </div>
      </div>
    </li>
    <li class="right">
      <div class="tip-container">
        <p>弹窗栏</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import dragResize from '../../components/dragResize.vue'
import MathJax from '@/utils/mathjax.ts'
import { useTipsStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import {
  getCourseContents,
  getTipContents,
  updateTipContents,
  getTestContents
} from '@/api/course/index.ts'
import { useRoute } from 'vue-router'
import HighlightToolbar from '@/views/course/components/HighlightToolbar.vue'
import Course1Cube from '@/views/course/components/course1Cube.vue'
import Course1Geometry from '@/views/course/components/course1Geometry.vue'
import Question1 from '@/views/course/components/question.vue'

const tipsStore = useTipsStore()
const { content, isTipShowArrayList } = storeToRefs(tipsStore)
const route = useRoute()

const contentId = ref()

const popTip = async (e) => {
  const target = e.target
  if (target.tagName === 'SPAN') {
    const data = target.dataset
    const res = await getTipContents(Number(data.id))
    tipsStore.handleTipContent(Number(data.id), res.data.title, res.data.content, res.data.judge)
  }
}

const handleTipCloseFn = async (id) => {
  const data = {
    id: id,
    judge: false
  }
  await updateTipContents(data)
  tipsStore.handleTipClose(id)
}

const selectedRange = ref(null)
const contentHTML = ref()

const handleMouseUp = () => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    selectedRange.value = selection.getRangeAt(0)
  } else {
    selectedRange.value = null
  }
}
//
const questionList = ref([])
const doneValue = ref()
const getTest = async () => {
  const data = {
    id: contentId.value,
    type: 0
  }
  const {
    data: { done, question }
  } = await getTestContents(JSON.stringify(data))
  doneValue.value = done
  questionList.value = JSON.parse(question)
}

onMounted(async () => {
  contentId.value = route.query.id
  const {
    data: { content, init }
  } = await getCourseContents(contentId.value)
  tipsStore.handleContent(content, init)

  await nextTick(() => {
    if (MathJax.isMathjaxConfig) {
      MathJax.initMathjaxConfig()
    }
    MathJax.MathQueue()
  })

  await getTest()
})
</script>

<style lang="scss" scoped>
@import url('../../styles/cource/course1.scss');
</style>
