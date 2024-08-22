<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

//dialog
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
// 新建任务
const newTask = reactive({
  name: '',
  desc: ''
})

//查找功能
interface User {
  task: string
  time: string
  des: string
  progress: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.task.includes(search.value) ||
      data.time.includes(search.value) ||
      data.des.includes(search.value) ||
      data.progress.includes(search.value)
  )
)

//处理逻辑
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
const tableData = [
  {
    task: '第一次作业',
    time: '2024-7-14——2024-7-16-24:00',
    des: '作业',
    progress: '100%',
    action: 'operate'
  },
  {
    task: '第二次考试',
    time: '2024-7-14——2024-7-16-24:00',
    des: '考试',
    progress: '100%',
    action: 'operate'
  },
  {
    task: '第三次作业',
    time: '2024-7-14——2024-7-16-24:00',
    des: '作业',
    progress: '90%',
    action: 'operate'
  },
  {
    task: '自主练习测试',
    time: '2024-8-20——无',
    des: '自主练习',
    progress: '80%',
    action: 'operate'
  }
]
</script>

<template>
  <div class="ai-container">
    <ul class="box">
      <li>
        <div class="range top">
          <div class="left">
            <img src="../../assets/icons/table.svg" alt="" />
            <span>我的任务</span>
          </div>
          <div class="right">
            <img src="../../assets/icons/table-white.svg" alt="" />
            <span @click="dialogFormVisible = true">新建任务</span>
          </div>
        </div>
        <div class="range content-box">
          <el-table :data="filterTableData" stripe style="width: 100%">
            <el-table-column prop="task" label="任务" width="calc(100% / 5 )" />
            <el-table-column prop="time" label="时间" width="calc(100% / 5)" />
            <el-table-column prop="des" label="描述" width="calc(100% / 5)" />
            <el-table-column prop="progress" label="进度" width="calc(100% / 5)" />
            <el-table-column align="right">
              <template #header>
                <el-input v-model="search" placeholder="查找" />
              </template>
              <template #default="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
                <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </li>
    </ul>
    <el-dialog v-model="dialogFormVisible" title="任务计划" width="500" align-center>
      <el-form :model="newTask">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="newTask.name" style="width: 240px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            v-model="newTask.desc"
            style="width: 240px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入内容"
            show-word-limit
            maxlength="30"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" style="background: #008545">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/function/tasks.scss');
</style>
