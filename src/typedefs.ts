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

export interface patchUser {
  name?: string,
  email?: string,
  phone?: number | string,
  username?: string,
}

export interface CachedUser {
  cachedName?: string,
  cachedEmail?: string
  cachedPhone?: number,
  cachedUserName?: string,
}