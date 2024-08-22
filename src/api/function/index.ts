import request from '@/utils/request'
import type {
  AI_response,
  Discuss_Response,
  Publish_Response,
  Publish_Data,
  Discuss_Data,
  Model_Response
} from '@/api/function/type.d.ts'

enum API {
  AICHAT_GET_URL = '/courseware/ai/chat',
  DISCUSS_POST_URL = '/courseware/discuss/list',
  PUBLISH_POST_URL = '/courseware/discuss/publish',
  MODEL_POST_URL = '/courseware/ai/model'
}

export const getAIChat = (content: string) =>
  request.get<string, AI_response>(`${API.AICHAT_GET_URL}?msg=${content}`)

export const getDiscuss = (value: Discuss_Data) =>
  request.post<Discuss_Data, Discuss_Response>(API.DISCUSS_POST_URL, value)

export const postPublish = (data: string) =>
  request.post<any, Publish_Response>(API.PUBLISH_POST_URL, data)

export const model = (img: any) => request.post<any, Model_Response>(API.MODEL_POST_URL, img)
