import { USER_CHANGED, SIGNOUT } from './constants'

const initialState = {
  user: {
    uid: '',
    email: '',
  },
}

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case USER_CHANGED:
      return { ...state, user: action.payload }
    case SIGNOUT:
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default signIn
