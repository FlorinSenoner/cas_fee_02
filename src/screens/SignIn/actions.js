import { LOGIN_SUCCESSFUL } from './constants'

export const loginSuccessful = authObject => ({ type: LOGIN_SUCCESSFUL, payload: authObject })
