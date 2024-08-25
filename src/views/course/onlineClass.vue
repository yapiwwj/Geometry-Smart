<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(false)
const buttonList = ref([
  { id: 0, name: '麦克风', icon: 'iconfont icon-maikefeng' },
  { id: 1, name: '摄像头', icon: 'iconfont icon-shexiangtou' },
  { id: 2, name: '聊天', icon: 'iconfont icon-liaotiankuang' }
])

const handle = (id: number) => {
  id === 2 ? (drawer.value = true) : (drawer.value = false)
}
</script>
<template>
  <div class="online-container">
    <iframe src="/static/student.html" frameborder="0" scrolling="no"></iframe>
    <ul class="button-container">
      <li v-for="item in buttonList" :key="item.id" @click="handle(item.id)">
        <el-button type="primary" plain>
          <i :class="item.icon"></i>
          <span> {{ item.name }}</span>
        </el-button>
      </li>
    </ul>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>聊天框</span>
      <img src="/img/chat.png" alt="" />
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/cource/onlineClass.scss');
</style>
