<template>
  <ul>
    <li>
      <el-switch
        v-model="isHighlight"
        class="mb-2"
        style="--el-switch-on-color: #409eff; --el-switch-off-color: #409eff"
        active-text="标注模式"
        inactive-text="笔记模式"
        @click="toggleMode"
      />
    </li>
    <li>
      <el-color-picker
        v-model="color"
        show-alpha
        :predefine="predefineColors"
        style="margin-right: 10px"
      />
      <el-button type="primary" @click="highlightText(color)">
        <el-icon><Edit /></el-icon><span>标注</span></el-button
      >
      <el-button @click="undoHighlight" type="primary" plain>
        <el-icon><RefreshLeft /></el-icon><span>撤销</span></el-button
      >
      <el-button type="success" plain @click="updateCourseContent(contentid)">
        <el-icon><Check /></el-icon><span>确认</span></el-button
      >
      <el-button @click="cancelHighlight" type="danger" plain>
        <el-icon><CloseBold /></el-icon><span>取消</span></el-button
      >
      <el-button @click="resetHighlight" plain>
        <el-icon><Refresh /></el-icon><span>重置</span></el-button
      >
    </li>
  </ul>
  <el-dialog v-model="isDialogVisible" title="笔记内容" align-center>
    <el-input type="textarea" v-model="currentEditTipContent" rows="10"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveEditTipContent"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, nextTick, watchEffect, onMounted, createApp, h } from 'vue'
import { useTipsStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { Check, CloseBold, Edit, Refresh, RefreshLeft } from '@element-plus/icons-vue'

const tipsStore = useTipsStore()
// eslint-disable-next-line vue/no-dupe-keys
const { content, resetContent } = storeToRefs(tipsStore)
const props = defineProps(['selectedRange', 'contentHTML', 'content', 'contentId'])

const selectedRangeSon = ref(null)
const contentHTMLSon = ref(null)
const contentSon = ref('')
const contentid = ref(null)
watchEffect(() => {
  selectedRangeSon.value = props.selectedRange
  contentHTMLSon.value = props.contentHTML
  contentSon.value = props.content
  contentid.value = props.contentId
})

onMounted(() => {})

//取色器
const color = ref('#ff4500')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])

//创造span
const createSpanElement = (color) => {
  const span = document.createElement('span')
  span.style.backgroundColor = color
  span.dataset.id = Date.now()
  return span
}

//span包围文本
const surroundWithSpan = (span) => {
  const range = selectedRangeSon.value
  if (range) {
    range.surroundContents(span)
    selectedRangeSon.value = null
    contentSon.value = contentHTMLSon.value.innerHTML
    content.value = contentSon.value
  }
}

// 模式选择
const isHighlight = ref(true)
const mode = ref('highlight')
const toggleMode = () => {
  console.log(isHighlight.value)
  mode.value = mode.value === 'highlight' ? 'edit' : 'highlight'
}

const highlightHistoryStack = ref([])
const editHistoryStack = ref([])
const highlightText = (color) => {
  if (selectedRangeSon.value) {
    // 无论在哪种模式下，都保存当前的HTML内容到历史栈
    highlightHistoryStack.value.push(contentHTMLSon.value.innerHTML)

    if (mode.value === 'highlight') {
      const span = createSpanElement(color)
      surroundWithSpan(span)
    } else if (mode.value === 'edit') {
      // 在编辑模式下，显示对话框而不是立即创建span
      showEditDialog(color)
    }
  }
}
// 编辑弹窗相关
const isDialogVisible = ref(false)
const currentEditTipContent = ref('')
const currentEditTipElement = ref(null)

const showEditDialog = (color) => {
  editHistoryStack.value.push(contentHTMLSon.value.innerHTML)
  const span = createSpanElement(color)
  currentEditTipElement.value = span
  surroundWithSpan(span)

  isDialogVisible.value = true
  currentEditTipContent.value = ''
}

//撤销
const undoHighlight = () => {
  if (highlightHistoryStack.value.length > 0) {
    const previousContent = highlightHistoryStack.value.pop()
    contentSon.value = previousContent
    contentHTMLSon.value.innerHTML = previousContent
    content.value = previousContent
    // 重新初始化 tooltips 及其他动态内容
    nextTick(() => {
      initializeTooltips() // 确保重新初始化所有动态加载的 Vue 组件
    })
  }
}

// 更新章节内容
const updateCourseContent = (id) => {
  tipsStore.handleCourseContentUpdate(id, contentSon.value)
}

const cancelHighlight = () => {
  highlightText('#ffffff')
}

const resetHighlight = () => {
  content.value = resetContent.value
}

const closeDialog = () => {
  isDialogVisible.value = false
}

const saveEditTipContent = () => {
  if (currentEditTipElement.value) {
    // 提取当前span的背景颜色
    const originalColor = currentEditTipElement.value.style.backgroundColor

    const spanHtml = currentEditTipElement.value.outerHTML
    const spanId = currentEditTipElement.value.dataset.id
    const tooltipHtml = `
      <el-tooltip content="${currentEditTipContent.value}" effect="dark" placement="bottom">
        <span style="background-color: ${originalColor};" data-id="${spanId}">${currentEditTipElement.value.innerHTML}</span>
      </el-tooltip>
    `

    editHistoryStack.value.push(contentHTMLSon.value.innerHTML) // 保存当前状态到历史栈

    contentSon.value = contentSon.value.replace(
      new RegExp(`<span[^>]*data-id="${spanId}"[^>]*>[^<]*</span>`),
      tooltipHtml
    )
    contentHTMLSon.value.innerHTML = contentSon.value

    currentEditTipElement.value = null
    isDialogVisible.value = false

    // 更新 DOM 和 重新初始化动态 Vue 组件
    nextTick(() => {
      contentHTMLSon.value.innerHTML = contentSon.value
      initializeTooltips() // 确保重新初始化所有动态加载的 Vue 组件
    })
  }
}

const initializeTooltips = () => {
  document.querySelectorAll('el-tooltip').forEach((tooltip) => {
    const span = tooltip.querySelector('span')
    const tooltipContent = tooltip.getAttribute('content')
    const app = createApp({
      render() {
        return h(
          ElTooltip,
          {
            content: tooltipContent,
            effect: 'dark',
            placement: 'bottom'
          },
          {
            default: () =>
              h('span', {
                style: { backgroundColor: span.style.backgroundColor },
                innerHTML: span.innerHTML
              })
          }
        )
      }
    })
    app.mount(tooltip)
  })
}
</script>

<style scoped lang="scss">
@import url('../../../styles/cource/components/highlightToolbar.scss');
</style>
