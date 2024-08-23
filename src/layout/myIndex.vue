<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const courseBannerList = ref([
  {
    id: 1,
    img: 'http://121.40.154.188:8080/courseware/img/5f8d4b3e-e9f3-4c26-95fa-afe03654570b.png'
  },
  {
    id: 2,
    img: 'http://121.40.154.188:8080/courseware/img/597a26a3-08eb-4881-b04b-f4dc0877a022.png'
  },
  {
    id: 3,
    img: 'http://121.40.154.188:8080/courseware/img/35e19be1-7036-4f26-baf1-ee77750fb9f6.png'
  },
  {
    id: 4,
    img: 'http://121.40.154.188:8080/courseware/img/a4bb688b-a386-48b8-9b30-1d9ae1844fa2.png'
  },
  {
    id: 5,
    img: 'http://121.40.154.188:8080/courseware/img/3981422a-96df-4f56-99df-217f99c9abe6.png'
  },
  {
    id: 6,
    img: 'http://121.40.154.188:8080/courseware/img/226d2782-231e-4360-8db9-0e4a94a11163.png'
  }
])
// const courseBannerList = ref([
//   {
//     id: 1,
//     img: '/img/1.png'
//   },
//   {
//     id: 2,
//     img: '/img/2.png'
//   },
//   {
//     id: 3,
//     img: '/img/3.png'
//   },
//   {
//     id: 4,
//     img: '/img/4.png'
//   },
//   {
//     id: 5,
//     img: '/img/5.png'
//   },
//   {
//     id: 6,
//     img: '/img/6.png'
//   }
// ])
</script>

<template>
  <div class="banner-container">
    <div class="iframe-container">
      <!-- <iframe src="/static/layoutCube.html" frameborder="0" scrolling="no" allowfullscreen></iframe> -->
      <iframe
        src="http://121.40.154.188:8080/courseware/img/4d6f30d3-4d13-441f-bd44-3029faca293b.html"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
    <div class="main">

      <ul class="images" :style="{ '--quantity': 6 }">
        <li
          v-for="i in courseBannerList"
          :key="i.id"
          :style="{ '--position': `${i.id}` }"
          @click="router.push('/course')"
        >
          <img :src="i.img" alt="" />
        </li>
      </ul>
    </div>
    <footer>
      <span>Chapter</span>
      <span>立体几何</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import url('../styles/home/layout.scss');
</style>
