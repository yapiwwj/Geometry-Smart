/**
 * AI
 */

export type quick_question = {
  id: number
  question: string
}[]

export type dialog = {
  id: number
  type: string
  text: string
}[]

export type recommend_question = {
  id: number
  question: string
}[]

export type discuss_list = {
  id: number
  title: string
  content: string
  time: string
  name: string
  avatar: string
}[]
