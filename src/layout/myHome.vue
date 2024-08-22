<script setup lang="ts">
import SvgIcon from '../components/SvgIcon/mySvg.vue'
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

//动画开启的对应类名及状态
const logoMoveAnimate = ref(false)
const showText = ref(false)
const closeLogo = ref(false)

// logo动画1s后开启,以下同理
const logoTimer = setTimeout(() => {
  logoMoveAnimate.value = true
}, 1000)

const textTimer = setTimeout(() => {
  showText.value = true
}, 1300)

const closeTimer = setTimeout(() => {
  closeLogo.value = true
  clearTimeout(logoTimer)
  clearTimeout(textTimer)
  router.push('/home')
}, 2500)

onBeforeUnmount(() => {
  clearTimeout(closeTimer)
})
</script>
<template>
  <div class="logo-container" :class="{ closeLogo: closeLogo }">
    <div class="container">
      <svg-icon
        class="logo"
        name="logo"
        width="150"
        height="150"
        :class="{ 'move-animate': logoMoveAnimate }"
      >
      </svg-icon>
      <p class="text" v-if="showText" :class="{ 'font-show': showText }">立体智学</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('../styles/home/index.scss');
</style>
