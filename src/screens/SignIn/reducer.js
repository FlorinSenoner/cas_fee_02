import { USER_CHANGED, SIGNOUT } from './constants'
import { auth } from '../../fire'

const initialState = {
  user: {
    email: '',
  },
}

const signIn = (state = initialState, action) => {
  console.log('signin reducer. Action: ', action.type)
  switch (action.type) {
    case USER_CHANGED:
      console.log('signin reducer. User has changed: ', action.payload)
      return { ...state, user: action.payload }
    case SIGNOUT:
      console.log('signing out!')
      auth.signOut()
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default signIn
