<script setup lang="ts">
import { ref } from 'vue'

const cubeList = ref([
  { id: 0, styleName: 'cube-front', name: '面', tooltip: '正面' },
  { id: 1, styleName: 'cube-back', name: '面', tooltip: '背面' },
  { id: 2, styleName: 'cube-left', name: '面', tooltip: '左侧面' },
  { id: 3, styleName: 'cube-right', name: '面', tooltip: '右侧面' },
  { id: 4, styleName: 'cube-top', name: '面', tooltip: '上顶面' },
  { id: 5, styleName: 'cube-bottom', name: '面', tooltip: '下底面' }
])

const infoList = ref([
  { id: 0, className: 'edge-top', content: '棱' },
  { id: 1, className: 'edge-right', content: '棱' },
  { id: 2, className: 'edge-bottom', content: '棱' },
  { id: 3, className: 'edge-left', content: '棱' }
])
</script>

<template>
  <header style="display: flex;justify-content: center;margin-top: 100px"><h4>几何体的面和棱演示</h4> </header>
  <div class="wrap">
    <ul class="cube">
      <li class="side" v-for="item in cubeList" :key="item.id" :class="item.styleName">
        <el-tooltip class="box-item" effect="dark" :content="item.tooltip" placement="top-start">
          <h2>{{ item.name }}</h2>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          v-for="item2 in infoList"
          :key="item2.id"
          :class="item2.className"
          effect="dark"
          :content="item2.content"
          placement="top-start"
        >
          <div class="edge" :class="item2.className"></div>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/cource/components/course1Cube.scss');
</style>
