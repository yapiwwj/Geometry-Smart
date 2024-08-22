import request from '@/utils/request'
import type { login, loginResp } from '@/api/user/type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USER_INFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

/**
 * @param data
 * login,传给服务器的数据类型
 * loginResp,服务器返回的数据类型
 */
export const requestLogin = (data: login) => request.post<login, loginResp>(API.LOGIN_URL, data)
export const requestUserInfo = () => request.get(API.USER_INFO_URL)
