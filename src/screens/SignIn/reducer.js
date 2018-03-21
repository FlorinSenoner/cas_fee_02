import { USER_CHANGED, SIGNOUT } from './constants'
import { auth } from '../../fire'

const initialState = {
  user: {
    email: '',
  },
}

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case USER_CHANGED:
      return { ...state, user: action.payload }
    case SIGNOUT:
      auth.signOut()
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default signIn
