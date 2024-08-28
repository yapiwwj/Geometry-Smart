import request from '@/utils/request'
import type {
  GetCourseContentResponse,
  GetTipContentResponse,
  UpdateTipContent,
  UpdateCourseContent,
  GetTestContent,
  GetTestContentResponse,
  JudgeData,
  JudgeResponse,
  GetPdfResponse
} from '@/api/course/type.d.ts'

enum API {
  KNOWLEDGE_GET_URL = '/courseware/knowledge/get',
  TIP_GET_URL = '/courseware/knowledge/get/point',
  TIP_UPDATE_POST_URL = '/courseware/knowledge/update/point',
  CONTENT_UPDATE_POST_URL = '/courseware/knowledge/update',
  CHANGE_CONTENT_POST_URL = '/courseware/data/knowledge',
  TEST_GET_URL = '/courseware/knowledge/test',
  TEST_JUDGE_GET_URL = '/courseware/knowledge/test/judge',
  PDF_GET_URL = '/courseware/knowledge/img'
}

export const getCourseContents = (id: number) =>
  request.get<number, GetCourseContentResponse>(`${API.KNOWLEDGE_GET_URL}?id=${id}`)

export const getTipContents = (id: number) =>
  request.get<number, GetTipContentResponse>(`${API.TIP_GET_URL}?id=${id}`)

export const updateTipContents = (data: UpdateTipContent) =>
  request.post<UpdateTipContent, any>(API.TIP_UPDATE_POST_URL, data)

export const updateCourseContents = (data: UpdateCourseContent) =>
  request.post<UpdateCourseContent, any>(API.CONTENT_UPDATE_POST_URL, data)

export const changeContent = (data: any) =>
  request.post<any, any>(API.CHANGE_CONTENT_POST_URL, data)

export const getTestContents = (data: string) =>
  // request.get<GetTestContent, GetTestContentResponse>(`${API.TEST_GET_URL}?data=${data}`)
  request.post<GetTestContent, GetTestContentResponse>(API.TEST_GET_URL, data as any)

export const judgeQuestion = (data: string) =>
  request.post<JudgeData, JudgeResponse>(API.TEST_JUDGE_GET_URL, data as any)

export const getPdf = (id: number) =>
  request.post<number, GetPdfResponse>(`${API.PDF_GET_URL}?id=${id}`)