import { USER_CHANGED } from './constants'

export const userChanged = authObject => ({ type: USER_CHANGED, payload: authObject })
