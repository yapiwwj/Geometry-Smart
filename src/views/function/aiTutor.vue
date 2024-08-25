<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useAIStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { getAIChat } from '@/api/function'
import { View } from '@element-plus/icons-vue'

const aiStore = useAIStore()
const { quickQuestion, dialogList, recommendQuestionList } = storeToRefs(aiStore)

const userInputValue = ref<string>('')
const gptPartialResponse = ref<string>('')

const sendInfo = async () => {
  if (!userInputValue.value.trim()) return
  const content = userInputValue.value
  aiStore.handleAddMessage('user', content)
  userInputValue.value = ''

  const res = await getAIChat(content)
  const gptResponse = res.data
  gptPartialResponse.value = ''
  aiStore.handleAddMessage('gpt', gptPartialResponse.value)

  //流式数据显示
  for (let i = 0; i < gptResponse.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 50))
    gptPartialResponse.value += gptResponse[i]
    await nextTick()
    aiStore.dialogList[aiStore.dialogList.length - 1].text = gptPartialResponse.value
  }
}

// 放大显示
const drawer = ref(false)

//视频测试暂用
const isFrameShow = ref(false)
const show = ()=>{
  setInterval(()=>{
    isFrameShow.value = true
  },20000)
}

onMounted(()=>{
  show()
})
</script>

<template>
  <div class="ai-container">
    <ul class="box left">
      <li>
        <el-scrollbar class="scrollbar" height="600px">
          <div class="dialog-box" v-for="item in dialogList" :key="item.id">
            <div class="gpt" v-if="item.type === 'gpt'">
              <i>
                <div class="avatar">
                  <img src="../../assets/icons/Mind.svg" alt="" />
                </div>
                <div class="text" v-html="item.text"></div>
              </i>
            </div>

            <div class="user" v-if="item.type === 'user'">
              <i>
                <div class="text">{{ item.text }}</div>
                <div class="avatar">
                  <img src="../../assets/icons/me.svg" alt="" />
                </div>
              </i>
            </div>
          </div>
        </el-scrollbar>
        <div class="footer">
          <ul class="top">
            <li v-for="i in quickQuestion" :key="i.id">{{ i.question }}</li>
          </ul>
          <ul class="bottom">
            <li>
              <div class="left-part">
                <img src="../../assets/icons/add.svg" alt="" />
                <el-input
                  class="textarea"
                  v-model="userInputValue"
                  :rows="1"
                  maxlength="1000"
                  style="width: 1200px"
                  placeholder="Hi~~ 你需要什么帮助?直接提问或点击浅绿色问题快捷提问。"
                  show-word-limit
                  type="textarea"
                  @keydown.enter="sendInfo"
                />
              </div>
              <div class="right-part">
                <img src="../../assets/icons/send.svg" alt="" @click="sendInfo" />
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <ul class="box right">
      <li>
        <p>推荐问题</p>
        <el-scrollbar height="200px">
          <ul class="recommend-question-list">
            <li v-for="i in recommendQuestionList" :key="i.id">
              <span>{{ i.question }}</span>
              <div class="typebox">
                <img src="../../assets/icons/alert.svg" alt="" />
                <span>近日错题</span>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </li>
      <li class="three-model">
        <p>立体可视化</p>
        <iframe v-if="isFrameShow" src="/static/model1.html" frameborder="0" scrolling="no"></iframe>
        <!-- <iframe
          src="http://121.40.154.188:8080/courseware/img/7b011569-fd03-40e3-8937-5206806cf260.html"
          frameborder="0"
          scrolling="no"
        ></iframe> -->
        <el-icon size="20" @click="drawer = true"><View /></el-icon>
      </li>
    </ul>
  </div>
  <el-drawer v-model="drawer" size="105%">
    <iframe src="/static/model2.html" frameborder="0" scrolling="no"></iframe>
    <!-- <iframe
      src="http://121.40.154.188:8080/courseware/img/30bc5738-2335-44c7-b789-b5e1b8511d1c.html"
      frameborder="0"
      scrolling="no"
    ></iframe> -->
  </el-drawer>
</template>

<style scoped lang="scss">
@import url('../../styles/function/ai.scss');
</style>
