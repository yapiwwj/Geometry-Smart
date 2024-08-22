import request from '@/utils/request'
import type { Login_Response, Register_Response, Login, Register } from '@/api/login/type.d.ts'

enum API {
  LOGIN_POST_URL = '/courseware/login',
  REGISTER_POST_URL = '/courseware/register'
}

export const postLogin = (form: Login) =>
  request.post<Login, Login_Response>(API.LOGIN_POST_URL, form)

export const postRegister = (form: Register) =>
  request.post<Register, Register_Response>(API.REGISTER_POST_URL, form)
