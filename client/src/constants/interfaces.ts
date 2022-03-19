export interface IUser {
  id: number
  username: string
  admin: boolean
}

export interface ILogin {
  username: string
  password: string
}

export interface IRegister {
  username: string
  password: string
}
