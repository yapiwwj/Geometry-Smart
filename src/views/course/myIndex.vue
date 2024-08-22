<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aside">
        <ul>
          <li
            v-for="item in directory"
            :key="item.id"
            @click="toContent(item.url, item.id)"
            :style="{ background: activeId === item.id ? '#daecf6' : '' }"
          >
            {{ item.title }}
          </li>
          <li class="onlineClass" @click="router.push({ path: '/course/online-class' })">
            <el-icon size="20"><DataLine /></el-icon>
            <span>在线课堂</span>
          </li>
          <li class="test">
            <el-icon  size="20"><Reading /></el-icon>
            <span>进阶测试</span>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const directory = ref([
  { id: 0, title: '第一章 认识几何体', url: '/course/course1' },
  { id: 1, title: '第二章 表面积与体积', url: '/course/course2' },
  { id: 2, title: '第三章 性质与定理', url: '/course/course3' },
  { id: 3, title: '第四章 平面角与二面角', url: '/course/course4' },
  { id: 4, title: '第五章 向量几何计算', url: '/course/course5' },
  { id: 5, title: '第六章 立体几何综合', url: '/course/course6' }
])

const activeId = ref(0)
const toContent = (url, id) => {
  activeId.value = id
  router.push({ path: url, query: { id } })
}
</script>

<style lang="scss" scoped>
@import url('../../styles/cource/index.scss');
</style>
