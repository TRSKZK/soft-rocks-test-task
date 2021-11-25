export interface User {
  id: number,
  name: string,
  userName: string,
  email?: string,
  phone?: number,
}

export interface UserToAdd {
  name: string,
  userName: string,
  email?: string,
}