/**
 * watch
 */
export type Student_List = {
  id: string
  name: string
  discuss: number
  study: number
  day: number
  tasks: string
  rank: number
}

/**
 * bar
 */
export type Bar_Data_X = string[]
export type Bar_Data_Y = string[]

/**
 * radar
 */
export type Radar_Data_X = { id: number; name: string; max: number }[]
export type Radar_Data_Y = number[]

/**
 * line
 */
export type Line_Data_X=string[][]
export type Line_Data_Y=number[]