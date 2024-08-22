/**
 * AI
 */

export interface AI_response {
  success: boolean
  data: string
}

/**
 * discuss
 */

interface Discuss_Data {
  pageNum: number
  pageSize: number
  sort: number
}

interface Discuss_Response_Data {
  id: number
  title: string
  content: string
  time: string
  name: string
  avatar: string
}

export interface Discuss_Response {
  success: boolean
  data: {
    list: Discuss_Response_Data[]
    total: number
    pageNum: number
    pageSize: number
    pages: number
  }
}

export interface Publish_Response {
  success: boolean
}

export interface Publish_Data {
  title: string
  content: string
}

export interface Model_Response {
  success: boolean
  data: string
}
