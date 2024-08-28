/**
 * base
 */
interface ApiResponse<T> {
  success: boolean
  data: T
}

/**
 * 获取课程内容
 */
interface getCourseContent {
  content: string
}

export type GetCourseContentResponse = ApiResponse<getCourseContent> & { init?: string }

/**
 * 获取知识弹窗内容
 */
interface getTipContent {
  title?: string
  content?: string
  judge?: boolean
}

export type GetTipContentResponse = ApiResponse<getTipContent>

/**
 * 更新知识弹窗是否显示
 */
export type UpdateTipContent = {
  id: number
  title?: string
  content?: string
  judge?: boolean
}

/**
 * 更新章节内容（标注/编辑）
 */
export type UpdateCourseContent = {
  id: number
  content: string
}

/**
 * 获取知识小测
 */
interface GetTestContent {
  id: number
  type: number
}

interface TestContentData {
  id: number
  userId: number
  done: number
  question: any
  type: number
  sheet?: string
  analysis?: string
  answer?: string
}

/**
 * 获取知识小测内容
 */
export type GetTestContentResponse = ApiResponse<TestContentData>

interface JudgeData {
  id: number
  type: number
  sheet: string
  answer: string
  analysis?: string,
}

interface Judge_Data {
  answer: string
  analysis: string
  judge: boolean[][]
  ok: boolean[][]
  ans: string
}

/**
 * 获取知识小测判断逻辑
 */
export type JudgeResponse = ApiResponse<Judge_Data>


/**
 * 获取pdf
 */
export type GetPdfResponse = ApiResponse<string[]>