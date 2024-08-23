import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  let cookies = localStorage.getItem('token') || ''
  const setCookies = (cookie: string) => {
    cookies = cookie
  }

  const localCookie = (cookie: string) => {
    localStorage.setItem('token', cookie)
  }
  return {
    cookies,
    setCookies,
    localCookie
  }
})
