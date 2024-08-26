<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { CheckboxValueType, ComponentSize } from 'element-plus'
import { getDiscuss, postPublish } from '@/api/function'
import type { discuss_list } from '@/type/function'

const router = useRouter()
const input = ref<string>('')

const handleDiscussRequest = async (sortId: number) => {
  if (sortId == 0) {
    const {
      data: { list, pages }
    } = await getDiscuss(pageValue.value)
    pageCount.value = pages
    newReplyDiscussData.value = list
  } else {
    const {
      data: { list, pages }
    } = await getDiscuss(pageValue.value)
    pageCount.value = pages
    newPublishDiscussData.value = list
  }
}

//获取discuss数据
const newReplyDiscussData = ref<discuss_list>([])
const newPublishDiscussData = ref<discuss_list>([])
const pageValue = ref<any>({ pageSize: 1, pageNum: 12, sort: 0 })
//一加载即请求
const requestList = async () => {
  await handleDiscussRequest(0)
}

//分页
const currentPage = ref(1)
const pageSize = ref<number>(100)
const size = ref<ComponentSize>('default')
const pageCount = ref<number>(0)
const background = ref(false)
const disabled = ref(false)

const handleCurrentChange = async (val: number) => {
  pageValue.value.pageSize = val
  await handleDiscussRequest(pageValue.value.sort)
}

//发布
const title = ref<string>('')
const content = ref<string>('')
const publish = async () => {
  const data = {
    title: title.value,
    content: content.value
  }
  const res = await postPublish(JSON.stringify(data))
  if (res) {
    title.value = ''
    content.value = ''
    await handleDiscussRequest(pageValue.value.sort)
  }
}

onMounted(() => {
  requestList()
  publish()
})

const isActiveIndex = ref<number>(0)
const active = async (e: any) => {
  isActiveIndex.value = Number(e.target.dataset.id)
  //sort重置
  pageValue.value.sort = isActiveIndex.value === 0 ? 0 : 1
  currentPage.value = 1
  await handleDiscussRequest(pageValue.value.sort)

  isActiveIndex.value === 0
    ? router.push('/function/discuss/new-reply')
    : router.push('/function/discuss/new-publish')
}

const checkAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)
const value = ref<CheckboxValueType[]>([])
const selectList = ref([
  {
    value: '题目解答',
    label: '题目解答'
  },
  {
    value: '知识点讲解',
    label: '知识点讲解'
  },
  {
    value: '经验分享',
    label: '经验分享'
  }
])

watch(value, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === selectList.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false
  if (val) {
    value.value = selectList.value.map((_) => _.value)
  } else {
    value.value = []
  }
}
</script>

<template>
  <div class="ai-container">
    <ul class="box left">
      <li>
        <div class="range top">
          <div class="input-box">
            <input type="text" placeholder="搜索一下感兴趣的讨论吧！" />
            <img src="../../assets/icons/search.svg" alt="" />
          </div>
          <div class="select-box">
            <el-select
              v-model="value"
              multiple
              clearable
              collapse-tags
              placeholder="请选择"
              popper-class="custom-header"
              :max-collapse-tags="1"
              style="width: 260px"
            >
              <template #header>
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="indeterminate"
                  @change="handleCheckAll"
                >
                  全部
                </el-checkbox>
              </template>
              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="range buttons">
          <div class="button-box">
            <span data-id="0" :class="{ active: isActiveIndex === 0 }" @click="active"
              >最新回复</span
            >
            <span data-id="1" :class="{ active: isActiveIndex === 1 }" @click="active"
              >最新发布</span
            >
          </div>
        </div>
        <div class="range content-box">
          <router-view :list="newReplyDiscussData" :publish="newPublishDiscussData"></router-view>
        </div>
        <div class="pagination-block">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :size="size"
            :page-count="pageCount"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next,->,slot"
            :total="1000"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </li>
    </ul>
    <ul class="box right">
      <li>
        <div class="range flex">
          <img src="../../assets/icons/me.svg" alt="" />
          <span>小多</span>
        </div>
      </li>
      <li>
        <div class="range">
          <p>发表讨论</p>
          <div class="publish-content">
            <div class="top">
              <h4>主题</h4>
              <input type="text" v-model="title" placeholder="在这里输入讨论贴的主题" />
            </div>
            <div class="bottom">
              <h4>内容</h4>
              <textarea
                v-model="content"
                placeholder="在这里输入讨论贴的内容"
                style="height: 340px"
              ></textarea>
            </div>
            <div class="footer">
              <img src="../../assets/icons/image.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="footer">
          <button @click="publish">发表讨论</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/function/discuss.scss');
</style>
