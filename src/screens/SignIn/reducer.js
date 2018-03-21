import pick from 'lodash/fp/pick'
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
      console.log('new user data!', action.payload)
      return { ...state, user: pick(['displayName', 'email', 'emailVerified', 'photoURL', 'uid'], action.payload) }
    case SIGNOUT:
      console.log('signing out!')
      auth.signOut()
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default signIn
