<script setup >
import { useRouter } from 'vue-router'
import { h } from 'vue'
// import { ElMessage } from 'element-plus'

const router = useRouter()
router.beforeEach((to, from, next)=>{
  if(to.path==='/login' || to.path==='/register'){
    next()
  }else{
    const token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      // next('/login')
      ElNotification({
        title: 'Title',
        message: h('i', { style: 'color: #87afff' }, '您还未登录，请先登录'),
      })
    }
  }
})

</script>

<template>
  <div class="home-page-box">
    <iframe src="http://121.40.154.188:8080/courseware/img/6442c6ea-679b-46d0-b199-62eb7174dcbf.html" frameborder="0" scrolling="no"></iframe>
    <p @click="router.push('/login')">探索学习新境界</p>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/home/homePage.scss');
</style>
