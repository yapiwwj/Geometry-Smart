<script setup>
import VueDragResize from 'vue-drag-resize'
import { onMounted, ref } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import MathJax from '@/utils/mathjax.ts'

const width = ref(0)
const height = ref(0)
const top = ref(0)
const left = ref(0)

const resize = (newRect) => {
  width.value = newRect.width
  height.value = newRect.height
  top.value = newRect.top
  left.value = newRect.left
}
//挂载后公式格式化
onMounted(() => {
  if (MathJax.isMathjaxConfig) {
    MathJax.initMathjaxConfig()
  }
  MathJax.MathQueue()
})
//组件通信
const props = defineProps(['id', 'tipTitle', 'tipContent', 'isShow'])
const emit = defineEmits(['closePop'])

const close = () => {
  emit('closePop', props.id)
}
</script>

<template>
  <!--  :isActive="false"-->
  <div class="VueDragResizeBox">
    <VueDragResize
      class="VueDragResize"
      v-if="isShow"
      :w="200"
      :h="200"
      v-on:resizing="resize"
      v-on:dragging="resize"
    >
      <el-row justify="space-between" style="padding-bottom: 10px">
        <el-col :span="18">
          {{ tipTitle }}
        </el-col>
        <el-col :span="2" @click="close">
          <el-icon class="close" :span="6">
            <CloseBold />
          </el-icon>
        </el-col>
      </el-row>
      <el-scrollbar :always="true">
        <p id="content" class="content" v-html="tipContent"></p>
      </el-scrollbar>
    </VueDragResize>
  </div>
</template>

<style lang="scss" scoped>
.VueDragResizeBox {
  position: absolute;
  top: 10%;
  right: 20%;
  .VueDragResize {
    background: #fff;
  }
}

.close {
  cursor: pointer;
}
</style>
