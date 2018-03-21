import { USER_CHANGED, SIGNOUT } from './constants'

export const userChanged = authObject => ({ type: USER_CHANGED, payload: authObject })
export const signOut = () => ({ type: SIGNOUT })
