/**
 * login
 */

export interface Login_Response {
  success: boolean
  data: string
}

export interface Login {
  name: string
  classname: string
  password: string
  identity: number | null
}

/**
 * register
 */
export interface Register_Response {
  success: boolean
  data: string
}

export interface Register {
  name: string
  classname: string
  password: string
  identity: number | null
}
