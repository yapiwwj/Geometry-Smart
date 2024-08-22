<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopHeader from '../usercenter/components/header.vue'
import Pie from '../usercenter/components/pie.vue'
import TaskPoint from '../usercenter/components/taskPoint.vue'
import StudyOnline from '@/views/usercenter/components/studyOnlie.vue'
import Discuss from '@/views/usercenter/components/discuss.vue'
import SignIn from '@/views/usercenter/components/signIn.vue'
import MistakesAnalyse from '@/views/usercenter/components/mistakesAnalyse.vue'
import StudyTask from '@/views/usercenter/components/studyTask.vue'

const router = useRouter()

const fade = ref(false)
const toCard = () => {
  fade.value = true
  setTimeout(() => {
    router.push('/usercenter/knowledge-card')
  }, 500) // 等待动画完成后再切换路由
}
</script>

<template>
  <transition name="slide-up" mode="out-in">
    <div class="container" v-if="!fade">
      <div class="box">
        <header>
          <img src="../../assets/icons/arrow-up.svg" alt="" @click="toCard" />
        </header>
        <div class="common-bg">
          <top-header></top-header>
        </div>
        <div class="first-content-box">
          <div class="left common-bg">
            <pie style="height: 300px"></pie>
          </div>
          <div class="right x-between-box">
            <task-point class="common-bg" style="margin-bottom: 20px"></task-point>
            <ul class="two-part">
              <li class="common-bg">
                <study-online></study-online>
              </li>
              <li class="common-bg">
                <discuss></discuss>
              </li>
            </ul>
          </div>
        </div>
        <div class="second-content-box">
          <ul class="left">
            <li class="common-bg">
              <sign-in></sign-in>
            </li>
            <li class="common-bg">
              <mistakes-analyse></mistakes-analyse>
            </li>
          </ul>
          <ul class="right">
            <li class="common-bg">
              <study-task></study-task>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@import url('../../styles/usercenter/index.scss');
</style>
