<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DataLine, Reading } from '@element-plus/icons-vue'

const router = useRouter()

const directory = ref([
  { id: 0, title: '第一节 认识几何体', url: '/course/course1' },
  { id: 1, title: '第二节 表面积与体积', url: '/course/course2' },
  { id: 2, title: '第三节 性质与定理', url: '/course/course3' },
  { id: 3, title: '第四节 平面角与二面角', url: '/course/course4' },
  { id: 4, title: '第五节 向量几何计算', url: '/course/course5' },
  { id: 5, title: '第六节 立体几何综合', url: '/course/course6' }
])

const handle = (id: number) => {
  activeId.value = id
  id == 6 ? router.push('/course/online-class') : router.push('/course/advanced')
}

const activeId = ref<number>(0)
const toContent = (url: string, id: number) => {
  activeId.value = id
  router.push({ path: url, query: { id } })
}
</script>

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
          <li
            class="onlineClass"
            @click="handle(6)"
            :style="{ background: activeId === 6 ? '#daecf6' : '' }"
          >
            <el-icon size="20"><DataLine /></el-icon>
            <span>在线课堂</span>
          </li>
          <li
          class="onlineClass"
            @click="handle(7)"
            :style="{ background: activeId === 7 ? '#daecf6' : '' }"
          >
            <el-icon size="20"><Reading /></el-icon>
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

<style lang="scss" scoped>
@import url('../../styles/cource/index.scss');
</style>
