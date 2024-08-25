<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getStudentsList } from '@/api/teacher'
import type { Student_List } from '@/type/teacher'

const router = useRouter()
const tableData = ref<Student_List[]>([])

const getList = async () => {
  const { data } = await getStudentsList()
  tableData.value.push(...data)
}

onMounted(() => {
  getList()
})
const handle = (index: number, row: Student_List) => {
  router.push({ path: '/teacher/info', query: { id: row.id, name: row.name } })
}
</script>

<template>
  <el-table :data="tableData" height="800" style="width: 100%" stripe>
    <el-table-column prop="rank" label="排名" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="tasks" label="任务点完成数" />
    <el-table-column prop="discuss" label="讨论数" />
    <el-table-column prop="study" label="章节学习次数" />
    <el-table-column prop="day" label="学习天数" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" plain @click="handle(scope.$index, scope.row)">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
