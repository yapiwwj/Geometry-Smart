<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const tableData = [
  {
    id: 0,
    rank: 1,
    name: 'Admin',
    tasks: '32/32',
    discuss: 7,
    study: 2,
    day: 30,
  },
  {
    id: 1,
    rank: 2,
    name: '小明',
    tasks: '31/32',
    discuss: 3,
    study: 2,
    day: 12,
  },
  {
    id: 2,
    rank: 3,
    name: '小红',
    tasks: '30/32',
    discuss: 1,
    study: 2,
    day: 10,
  },
  {
    id: 3,
    rank: 4,
    name: '小张',
    tasks: '29/32',
    discuss: 1,
    study: 2,
    day: 8,
  },
  {
    id: 4,
    rank: 5,
    name: '小李',
    tasks: '28/32',
    discuss: 1,
    study: 2,
    day: 6,
  },
  {
    id: 5,
    rank: 6,
    name: '小王',
    tasks: '27/32',
    discuss: 1,
    study: 2,
    day: 4,
  },
  {
    id: 6,
    rank: 7,
    name: '小刘',
    tasks: '26/32',
    discuss: 1,
    study: 2,
    day: 5,
  },
  {
    id: 7,
    rank: 8,
    name: '小赵',
    tasks: '25/32',
    discuss: 1,
    study: 2,
    day: 3,
  },
  {
    id: 8,
    rank: 9,
    name: '小孙',
    tasks: '24/32',
    discuss: 1,
    study: 2,
    day: 2,
  },
  {
    id: 9,
    rank: 10,
    name: '小钱',
    tasks: '23/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 10,
    rank: 11,
    name: '小周',
    tasks: '22/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 11,
    rank: 12,
    name: '小李',
    tasks: '21/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 12,
    rank: 13,
    name: '小孙',
    tasks: '20/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 13,
    rank: 14,
    name: '小孙',
    tasks: '19/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 14,
    rank: 15,
    name: '小孙',
    tasks: '18/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 15,
    rank: 16,
    name: '小孙',
    tasks: '17/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 16,
    rank: 17,
    name: '小孙',
    tasks: '16/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 17,
    rank: 18,
    name: '小孙',
    tasks: '15/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 18,
    rank: 19,
    name: '小孙',
    tasks: '14/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 19,
    rank: 20,
    name: '小孙',
    tasks: '13/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 20,
    rank: 21,
    name: '小孙',
    tasks: '12/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 21,
    rank: 22,
    name: '小孙',
    tasks: '11/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 22,
    rank: 23,
    name: '小孙',
    tasks: '10/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 23,
    rank: 24,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 24,
    rank: 25,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 25,
    rank: 26,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  }, {
    id: 26,
    rank: 27,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  }, {
    id: 27,
    rank: 28,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 28,
    rank: 29,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 29,
    rank: 30,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },

  {
    id: 30,
    rank: 31,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },
  {
    id: 31,
    rank: 32,
    name: '小孙',
    tasks: '9/32',
    discuss: 1,
    study: 2,
    day: 1,
  },

]

interface Student {
  id: number,
  rank: number,
  name: string,
  tasks: string,
  discuss: number,
  study: number,
  day: number,
}

const handle = (index: number, row: Student) => {
  router.push({path: '/teacher/info', query: {id: row.id, name: row.name}})
}

</script>

<template>
  <el-table :data="tableData" height="800" style="width: 100%" stripe>
    <el-table-column prop="rank" label="排名"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="tasks" label="任务点完成数"/>
    <el-table-column prop="discuss" label="讨论数"/>
    <el-table-column prop="study" label="章节学习次数"/>
    <el-table-column prop="day" label="学习天数"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
            size="small"
            type="primary"
            plain
            @click="handle(scope.$index, scope.row)"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>