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

      <!-- <div class="content-container">
        <div class="pdf-box">
          <li><h3>知识点讲解</h3></li>
          <div class="image-slider">
            <el-button @click="prevImage" :disabled="isFirstImage"
              ><el-icon><ArrowLeftBold /></el-icon
            ></el-button>
            <img :src="currentImg" alt="Image" />
            <el-button @click="nextImage" :disabled="isLastImage"
              ><el-icon><ArrowRightBold /></el-icon
            ></el-button>
          </div>
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

        <div class="question-box">
          <ul>
            <li><h3>知识小测</h3></li>
          </ul>
          <question1 :id="contentId" />
        </div>
      </div> -->

        <div class="test">
          <div>
            <h3>&emsp;&emsp;一、表面积的计算</h3>
            <p>
              &emsp;&emsp;&emsp;1.&emsp;<strong>定义：</strong>表面积（S）是立体图形外部所有面的面积之和。
            </p>
            <p>
              <iframe
                src="/static/course2/c2-3to2.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
            <br />
            <p>&emsp;&emsp;&emsp;2.&emsp;<strong>基本形状的表面积</strong></p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（1）
              <strong
                ><span data-id="7" style="color: #63b0ff; cursor: pointer">长方体：</span></strong
              >设长、宽、高分别为 l,w,h，则表面积
              <div>
                
              </div>
              <p style="display: flex; justify-content: center">
                <img src="/content/course2/1.png" alt="" style="width: 200px" />
              </p>
              <span> \[ S_{\text{长方体}} = 2(lw + lh + wh) \]</span>
            </p>
            <div>
              
            </div>
          <div style="display: flex;justify-content: center; align-items: center;width: 100%;">
            <p style="display: flex;justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/cuboid.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
            <p style="display: flex;justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/square.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
          </div>

            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（2）
              <strong
                ><span data-id="8" style="color: #63b0ff; cursor: pointer">正方体：</span> </strong
              >（特殊长方体）：设边长为 a，则表面积
            </p>
            <div style="display: flex;justify-content: center; align-items: center;width: 100%;">
              <p style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/2.png" alt="" style="width: 200px" />
              </span>
              <span> \[ S_{\text{正方体}} = 6a^2 \]</span>
            </p>
            <p style="display: flex;justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/cube.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
            </div>
            
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（3）
              <strong
                ><span data-id="9" style="color: #63b0ff; cursor: pointer">圆柱体：</span></strong
              >设底面半径为 r，高为 h，则表面积
              
            </p>
         <div  style="display: flex;justify-content: center; align-items: center;width: 100%;">
          <p style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/3.png" alt="" style="width: 120px" />
              </span>
              <span> \[ S_{\text{圆柱体}} = 2\pi r^2 + 2\pi rh \] </span>
            </p>
            <p style="display: flex;justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/cylinder.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
         </div>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（4）
              <strong
                ><span data-id="10" style="color: #63b0ff; cursor: pointer">圆锥体：</span></strong
              >设底面半径为 r，斜边（母线）长为 l，则表面积
              <br/> &emsp;&emsp;&emsp;&emsp;&emsp;（注意：这里假设圆锥侧面展开后为<span
                data-id="11"
                style="color: #63b0ff; cursor: pointer"
                >扇形</span
              >，且其弧长等于底面圆的周长）
            </p>
           <div style="display: flex;justify-content: center; align-items: center;width: 100%;">
            <p style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/4.png" alt="" style="width: 160px" />
              </span>
              <span> \[ S_{\text{圆锥体}} = \pi r^2 + \pi rl \] </span>
            </p>
            <p style="display: flex;justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/pyramid.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
           </div>

            <br />
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（5）
              <strong
                ><span data-id="12" style="color: #63b0ff; cursor: pointer">圆台：</span></strong
              >设圆台的上底面半径为 r，下底面半径为 R（R>r），高为 h，斜边（母线）长为 l。则表面积
              
            </p>
           <div  style="display: flex;justify-content: center; align-items: center;width: 100%;">
            <p  style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/5.png" alt="" style="width: 150px" />
              </span>
              <span> \[ S = \pi r^2 + \pi R^2 + \pi (r + R) l \] </span>
            </p>
            <p  style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/round.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
           </div>

            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（6）
              <strong
                ><span data-id="13" style="color: #63b0ff; cursor: pointer">球体：</span></strong
              >设半径为 r，则表面积
            
            </p>
           <div  style="display: flex;justify-content: center; align-items: center;width: 100%;">
             <p style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/6.png" alt="" style="width: 170px" />
              </span>
              <span> \[ S_{\text{球体}} = 4\pi r^2 \] </span>
            </p>
            <p style="display: flex;flex-direction: column; justify-content: center;width: 50%;">
              <iframe
                src="/static/course2/circle.html"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 50vh"
              ></iframe>
            </p>
           </div>
            <br />
            <p>
              &emsp;&emsp;3.&emsp;
              <strong>组合体表面积计算：</strong
              >对于由多个基本形状组合而成的立体，需分别计算各部分的表面积，并根据组合方式（如拼接、挖空等）进行加减调整，注意共享面在计算时只计算一次。
            </p>
            <br />
            <h3>&emsp;&emsp;二、体积的计算</h3>
            <br />
            <p>
              &emsp;&emsp;&emsp;1.&emsp; <strong>定义：</strong>体积（V）是立体图形所占空间的大小。
            </p>
            <br />
            <p>&emsp;&emsp;&emsp;2.&emsp; <strong>基本形状体积公式：</strong></p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（1） <strong>长方体：</strong>设长、宽、高分别为
              l,w,h，则体积
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/1.png" alt="" style="width: 200px" />
              </span>
              <span> \[ V_{\text{长方体}} = lwh \] </span>
            </p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（2） <strong>正方体：</strong>设底面半径为 r，高为
              h，则体积
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/2.png" alt="" style="width: 200px" />
              </span>
              <span> \[ V_{\text{正方体}} = a^3 \] </span>
            </p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（3） <strong>圆柱体：</strong>（特殊长方体）：设边长为
              a，则体积
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/3.png" alt="" style="width: 120px" />
              </span>
              <span> \[ V_{\text{圆柱体}} = \pi r^2 h \] </span>
            </p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（4） <strong>圆锥体：</strong>设底面半径为 r，高为
              h，则体积
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/4.png" alt="" style="width: 160px" />
              </span>
              <span> \[ V_{\text{圆锥体}} = \frac{1}{3}\pi r^2 h \] </span>
            </p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（5） <strong>圆台体：</strong>设圆台的上底面半径为
              r，下底面半径为 R（R>r），高为 h，则体积
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/5.png" alt="" style="width: 150px" />
              </span>
              <span> \[ V = \frac{1}{3} \pi h (R^2 + r^2 + Rr) \] </span>
            </p>
            <p>
              &emsp;&emsp;&emsp;&emsp;&emsp;（6） <strong>球体：</strong>设半径为 r，则体积
              <span style="display: flex; justify-content: center">
                <img src="/content/course2/6.png" alt="" style="width: 170px" />
              </span>
              <span> \[ V_{\text{球体}} = \frac{4}{3}\pi r^3 \] </span>
            </p>
            <br />
            <p>
              &emsp;&emsp;3.&emsp;
              <strong>组合体体积计算：</strong
              >组合体的体积计算通常更为直接，只需将各部分的体积相加即可。若存在挖空部分，则需从总体积中减去相应体积。
            </p>
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
import { ref, onMounted, nextTick, computed } from 'vue'
import dragResize from '../../components/dragResize.vue'
import MathJax from '@/utils/mathjax.ts'
import { useTipsStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import {
  getCourseContents,
  getTipContents,
  updateTipContents,
  getPdf
} from '@/api/course/index.ts'
import { useRoute } from 'vue-router'
import HighlightToolbar from '@/views/course/components/HighlightToolbar.vue'
import Question1 from '@/views/course/components/question.vue'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

const images = ref([])

const currentIndex = ref(0)
const currentImg = computed(() => images.value[currentIndex.value])
const isFirstImage = computed(() => currentIndex.value === 0)
const isLastImage = computed(() => currentIndex.value === images.value.length - 1)

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
  }
}

const getPDFResponse = async ()=>{
  const {data} = await getPdf(contentId.value)
  images.value = data
}

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

  await getPDFResponse()
})
</script>

<style lang="scss" scoped>
@import url('../../styles/cource/course1.scss');
</style>
