<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import type {ButtonItem} from '@/type/teacher'
const drawer = ref(false)
const buttonList = ref<ButtonItem[]>([
  { id: 0, name: '麦克风', icon: 'iconfont icon-maikefeng',url:()=>import('@/assets/icons/maikefeng.svg') },
  { id: 1, name: '摄像头', icon: 'iconfont icon-shexiangtou',url:()=>import('@/assets/icons/shexiangtou.svg') },
  { id: 2, name: '聊天', icon: 'iconfont icon-liaotiankuang',url:()=>import('@/assets/icons/liaotiankuang.svg') }
])

const handle = (id: number) => {
  id === 2 ? (drawer.value = true) : (drawer.value = false)
}

const imageUrls = ref<Record<number, string>>({});
onMounted(async () => {
  for (const button of buttonList.value) {
    if (button.url) {
      const module = await button.url();
      imageUrls.value[button.id] = module.default;
    }
  }
});

</script>
<template>
  <div class="online-container">
    <iframe src="/static/teacher.html" frameborder="0" scrolling="no"></iframe>
    <ul class="button-container">
      <li v-for="item in buttonList" :key="item.id" @click="handle(item.id)">
        <el-button type="primary" plain>
<!--          <i :class="item.icon"></i>-->
          <img v-if="imageUrls[item.id]" :src="imageUrls[item.id]" alt="button icon">
          <span> {{ item.name }}</span>
          </el-button
        >
      </li>
    </ul>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>聊天框</span>
      <img src="/img/chat.png" alt="">
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
@import url('../../../styles/teacher/onlineClass.scss');
</style>
