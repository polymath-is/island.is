import React from 'react'
import { User } from '../types'

const userContext = React.createContext<{ user: User }>({
  user: { nationalId: '', role: '' },
})

export { userContext }