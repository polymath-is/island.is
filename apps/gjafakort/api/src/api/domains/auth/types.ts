import { CookieOptions } from 'express'

export type VerifyResult = {
  user?: VerifiedUser
}

export type User = {
  ssn: string
}

export type AuthContext = {
  user: User
}

export type VerifiedUser = {
  kennitala: string
  authId: string
}

export type Cookie = {
  name: string
  options: CookieOptions
}

export type Authorize = {
  role?: 'admin' | 'company' | 'person'
  permissions?: ('createLoanApplication' | 'updateLoanApplication')[]
}
