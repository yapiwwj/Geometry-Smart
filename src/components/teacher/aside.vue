<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuList = ref([
  [
    { index: 0, title: '学情监控', className: 'iconfont icon-eye', path: '/teacher/watch' },
    {
      index: 1,
      title: '组卷中心',
      className: 'iconfont icon-shougongzujuan',
      path: '/teacher/exam-center'
    },
    { index: 2, title: '在线课堂', className: 'iconfont icon-zaixianketang', path: '/teacher/online-class' },
    { index: 3, title: '教学课件', className: 'iconfont icon-kejian', path: '/teacher/teach' },
    { index: 4, title: '消息中心', className: 'iconfont icon-xiaoxi', path: '/teacher/news' },
    { index: 5, title: '任务发布', className: 'iconfont icon-renwu', path: '/teacher/publish' },
    { index: 6, title: '反馈收集', className: 'iconfont icon-radio', path: '/teacher/feedback' },
    { index: 7, title: '发布考勤', className: 'iconfont icon-tag', path: '/teacher/attendance' }
  ],
  [
    { index: 8, title: '使用指南', className: 'iconfont icon-map', path: '/teacher/guide' },
    { index: 9, title: '账号设置', className: 'iconfont icon-shezhi', path: '/teacher/setting' }
  ]
])
const activeIndex = ref(0)
const handleActive = (id: number, path: string) => {
  console.log(id, path)
  activeIndex.value = id
  router.push(path)
}
</script>

<template>
  <ul>
    <li class="top">
      <img src="../../assets/icons/teacher.svg" alt="" />
      <span>教师端</span>
    </li>
    <li class="center">
      <div
        :class="{ active: activeIndex === item.index }"
        v-for="(item, index) in menuList[0]"
        :key="index"
        @click="handleActive(item.index, item.path)"
      >
        <i :class="item.className"></i>
        <span>{{ item.title }}</span>
      </div>
    </li>
    <li class="bottom">
      <div v-for="(item, index) in menuList[1]" :key="index" @click="router.push(item.path)">
        <i :class="item.className"></i>
        <span>{{ item.title }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import url('../../styles/teacher/components/aside.scss');
</style>
