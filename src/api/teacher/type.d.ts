import type { type } from 'os'

interface Public_Response<T> {
  success: boolean
  data: T
}

/**
 * 学生列表
 */
type Student_List = {
  id: string
  name: string
  discuss: number
  study: number
  day: number
  tasks: string
  rank: number
}

export type Student_List_Response = Public_Response<Student_List[]>

/**
 * 柱状图数据
 */
type Bar_Data_X = string[][]
type Bar_Data_Y = string[]
interface Bar_Data {
  x: Bar_Data_X
  y: Bar_Data_Y
}

export type Bar_Data_Response = Public_Response<Bar_Data>

/**
 * 雷达图数据
 */
type Radar_Data_X = { id: number; name: string; max: number }[]
type Radar_Data_Y = number[]
interface Radar_Data {
  abilities: Radar_Data_X
  y: Radar_Data_Y
}

export type Radar_Data_Response = Public_Response<Radar_Data>

/**
 * 折线图数据
 */
interface Line_Data {
  x: string[][]
  y: number[]
}
export type Line_Data_Response = Public_Response<Line_Data>
