<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import drag from '../components/dragResize.vue'

const goAnchor = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

//动态改变a的bgc
const activeAnchor = ref<string>('#one')
const calculateLiViewHeight = () => {
  const anchorList = ['#one', '#two', '#three', '#four']
  anchorList.forEach((item) => {
    const anchorElement = document!.querySelector(item)
    const rect = anchorElement!.getBoundingClientRect() //当前元素在window上的position信息
    const windowHeight = window.innerHeight
    const case1 = rect.top == 0 && rect.bottom == windowHeight
    const case2 = rect.top <= 0 && rect.bottom >= windowHeight * 0.75 && rect.bottom <= windowHeight
    const case3 = rect.top >= 0 && rect.top <= windowHeight * 0.25 && rect.bottom >= windowHeight
    const isVisible = case1 || case2 || case3
    if (isVisible) {
      activeAnchor.value = item
    }
  })
}

onMounted(() => {
  calculateLiViewHeight()
  window.addEventListener('scroll', calculateLiViewHeight)
})
onUnmounted(() => {
  window.removeEventListener('scroll', calculateLiViewHeight)
})

//动态宽度
const asideWidth = ref()
onMounted(() => {
  const aside = document.querySelector('.aside')
  asideWidth.value = aside?.clientWidth
})

type goAnchorIndexListType = {
  id: number
  name: string
  idName: string
}[]

const goAnchorIndexList = ref<goAnchorIndexListType>([
  { id: 1, name: 'one', idName: '#one' },
  { id: 2, name: 'two', idName: '#two' },
  { id: 3, name: 'three', idName: '#three' },
  { id: 4, name: 'four', idName: '#four' }
])
</script>

<template>
  <div class="box">
    <el-container>
      <el-aside class="aside" width="200px">
        <div class="aBox">
          <div class="a">
            <a
              v-for="(item, index) in goAnchorIndexList"
              :key="item.id"
              href="javascript:void(0)"
              :class="{ active: activeAnchor === item.idName }"
              @click="goAnchor(item.idName)"
            >
              to {{ index + 1 }}
            </a>
          </div>
        </div>
      </el-aside>
      <el-main :style="{ width: `calc(100vw - ${asideWidth + 20}px)` }">
        <ul>
          <li v-for="(item, index) in goAnchorIndexList" :key="item.id" :id="item.name">
            {{ index + 1 }}
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
* ul {
  padding: 0;
  list-style: none;
}

.box {
  position: absolute;
  display: flex;

  ul {
    #one {
      height: 100vh;
      background-color: pink;
    }

    #two {
      height: 100vh;
      background-color: green;
    }

    #three {
      height: 100vh;
      background-color: blue;
    }

    #four {
      height: 100vh;
      background-color: yellow;
    }
  }

  .aBox {
    position: fixed;

    .a {
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        padding: 20px;
      }

      .active {
        background-color: orange;
      }
    }
  }
}

.el-main {
  --el-main-padding: 0px;
}
</style>
