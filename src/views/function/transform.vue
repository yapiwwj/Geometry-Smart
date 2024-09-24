<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import axios from 'axios'

const imgURL = ref<string>('')
const rawFile = ref<any>() //存储原生File对象
const file = ref<any>() //上传服务器的file

//加载
const loading = ref(false)
const iframeSrc = ref<string>('')

const handleSuccess = (response: any, UploadFile: UploadFile) => {
  const { data } = response
  const { raw } = UploadFile

  imgURL.value = data
  rawFile.value = raw

  fileReader()
}

const fileReader = () => {
  const reader = new FileReader()
  reader.readAsDataURL(rawFile.value)
  reader.onloadend = () => {
    file.value = reader.result
  }
}

const transform = async () => {
  loading.value = true
  wsRequest()
}

const wsRequest = () => {
  const ws = new WebSocket('ws://121.40.154.188:10001/courseware/progress')
  // const ws = new WebSocket('ws://localhost:10001/courseware/progress')
  ws.onopen = () => {
    console.log('连接成功')
  }
  // ws.onmessage = (event: any) => {
  //   console.log(event.data)
  //   if (event) {
  //     loading.value = false
  //     iframeSrc.value = event.data
  //   }
  // }
  onBeforeUnmount(() => {
    ws.onclose = () => {
      console.log('连接关闭')
    }
  })
}

const isShow = ref(false)
setInterval(() => {
  isShow.value = true
  loading.value = false
}, 20000)

onMounted(() => {})
</script>

<template>
  <div class="transform-container">
    <ul>
      <li class="left">
        <el-upload
          v-if="!imgURL"
          class="upload-demo"
          drag
          action="http://121.40.154.188:10001/courseware/chart/upload"
          multiple
          :on-success="handleSuccess"
        >
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">将文件拖放到此处 or <em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">小于 500KB 的 JPG/PNG 文件</div>
          </template>
        </el-upload>
        <!--        <el-upload-->
        <!--          v-if="!imgURL"-->
        <!--          class="upload-demo"-->
        <!--          drag-->
        <!--          action="http://localhost:10001/courseware/chart/upload"-->
        <!--          multiple-->
        <!--          :on-success="handleSuccess"-->
        <!--        >-->
        <!--          <el-icon class="el-icon&#45;&#45;upload">-->
        <!--            <upload-filled/>-->
        <!--          </el-icon>-->
        <!--          <div class="el-upload__text">将文件拖放到此处 or <em>点击上传</em></div>-->
        <!--          <template #tip>-->
        <!--            <div class="el-upload__tip">小于 500KB 的 JPG/PNG 文件</div>-->
        <!--          </template>-->
        <!--        </el-upload>-->
        <img v-if="imgURL" :src="imgURL" alt="" />
      </li>
    </ul>
    <div class="progress-container">
      <el-button plain @click="transform" style="border-radius: 16px; margin: 0 5px"
        >开始转化
      </el-button>
    </div>
    <ul>
      <li class="right" v-loading="loading" element-loading-text="请等待2-3分钟...">
        <iframe v-if="isShow" src="/static/jiaohu.html" frameborder="0" scrolling="no"></iframe>
        <!--        <iframe :src="iframeSrc" frameborder="0" scrolling="no"></iframe>-->
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/function/transform.scss');
</style>
