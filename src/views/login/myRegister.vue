<script setup lang="ts">
import LoginSlot from '../../components/loginRegisterSlot.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { postRegister } from '@/api/login'
import { useUserStore } from '@/stores/modules/user'

const router = useRouter()
const userStore = useUserStore()

const identifyList = ref([
  {
    id: 0,
    name: '教师端',
    icon: 'Ticket'
  },
  {
    id: 1,
    name: '学生端',
    icon: 'User'
  }
])

const form = ref({ name: '', classname: '', password: '', identity: null })
const register = async () => {
  const res = await postRegister(form.value)
  // console.log(res)
  // userStore.setCookies(res.data)
}
onMounted(() => {
  register()
})
</script>

<template>
  <div>
    <login-slot>
      <template #title>
        <h1>Sign Up</h1>
      </template>
      <template #subTitle>
        <p>
          <span>已经有一个账户？</span>
          <span @click="router.push({ name: 'login' })">登录</span>
        </p>
      </template>
      <template #left>
        <ul class="left">
          <li>
            <p>姓名</p>
            <input v-model="form.name" type="text" placeholder="请输入姓名" />
          </li>
          <li>
            <p>班级</p>
            <input v-model="form.classname" type="text" placeholder="请输入班级" />
          </li>
          <li>
            <p>密码</p>
            <input v-model="form.password" type="password" placeholder="请输入密码" />
          </li>
          <li>
            <el-button class="button" round @click="register">注册</el-button>
          </li>
        </ul>
      </template>
      <template #right>
        <ul class="right">
          <li>
            <el-radio-group v-model="form.identity">
              <el-radio
                v-for="item in identifyList"
                :key="item.id"
                :value="item.id"
                style="margin-bottom: 30px"
              >
                <el-button class="button" round>
                  <el-icon style="width: 30px; font-size: 16px">
                    <component :is="item.icon" />
                  </el-icon>
                  <span>{{ item.name }}登录</span>
                </el-button>
              </el-radio>
            </el-radio-group>
          </li>
        </ul>
      </template>
    </login-slot>
  </div>
</template>

<style scoped lang="scss">
@import url('@/styles/login/loginRegister.scss');
@import url('https://at.alicdn.com/t/c/font_4605058_jep3ilfzo4j.css');
</style>
