//登录
export interface login {
  username: string
  password: string
}

interface dataType {
  token: string
}

//登录返回
export interface loginResp {
  code: number
  data: dataType
}

//服务器返回用户信息
export interface userRespData {
  name: string
  avatar: string
}
