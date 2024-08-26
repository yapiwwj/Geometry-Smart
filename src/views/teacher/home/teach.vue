<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const pdfList = ref([
  { id: 0, label: '第一节', name: 'first' },
  { id: 1, label: '第二节', name: 'second' },
  { id: 2, label: '第三节', name: 'third' },
  { id: 3, label: '第四节', name: 'fourth' },
  { id: 4, label: '第五节', name: 'fifth' },
  { id: 5, label: '第六节', name: 'sixth' }
])

const activeIndex = ref<number>(0)
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeIndex.value = Number(tab.index)
  console.log(activeIndex.value)
}

const jiaohuComponents = ref([
  {
    id: 0,
    components: [
      defineAsyncComponent(() => import('../../course/components/course1Geometry.vue')),
      defineAsyncComponent(() => import('../../course/components/course1Cube.vue'))
    ]
  },
  { id: 1, components: [
    defineAsyncComponent(() => import('../../course/components/course2SV.vue')),
      defineAsyncComponent(() => import('../../course/components/course2YZSV.vue'))
    ] },
  { id: 2, components: [] },
  {
    id: 3,
    components: [
      defineAsyncComponent(() => import('../../course/components/course4Angle.vue'))
    ]
  },
  { id: 4, components: [] },
  { id: 5, components: [] }
])
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane v-for="item in pdfList" :key="item.id" :label="item.label" :name="item.name">
      <iframe :src="`/pdf/${item.id + 1}.pdf`" frameborder="0" scrolling="no"></iframe>
    </el-tab-pane>
  </el-tabs>

  <ul class="jiaohu-box">
    <li v-for="(component,index) in jiaohuComponents[activeIndex].components" :key="index">
      <component :is="component" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
* {
  list-style: none;
  padding: 0;
  margin: 0;
}
iframe {
  width: 100%;
  height: calc(100vh - 100px);
}
.jiaohu-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
