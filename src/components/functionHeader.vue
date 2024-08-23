<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Mind from '../assets/icons/Mind.svg'
import discuss from '../assets/icons/message.svg'
import geometry from '../assets/icons/package.svg'
import tasks from '../assets/icons/table.svg'
import palette from '../assets/icons/palette.svg'

const router = useRouter()

const activeItem = ref<number>(0)
const functionList = ref([
  { id: 0, name: 'AI Tutor', icon: Mind, router: '/function/AI' },
  { id: 1, name: '讨论中心', icon: discuss, router: '/function/discuss' },
  { id: 2, name: '几何空间', icon: geometry, router: '/function/geometry-space' },
  { id: 3, name: '几何画板', icon: palette, router: '/function/draw' },
  { id: 4, name: '任务列表', icon: tasks, router: '/function/tasks' }
])

const navigate = (id: number) => {
  activeItem.value = id
  router.push(functionList.value[id].router)
}
</script>

<template>
  <ul class="header-box">
    <li
      :class="{ active: activeItem === i.id }"
      v-for="i in functionList"
      :key="i.id"
      @click="navigate(i.id)"
    >
      <img :src="i.icon" alt="" />
      <span>{{ i.name }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('../styles/components/functionHeader.scss');
</style>
