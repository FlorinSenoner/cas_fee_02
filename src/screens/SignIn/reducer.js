import pick from 'lodash/fp/pick'
import { USER_CHANGED } from './constants'

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
    default:
      return state
  }
}

export default signIn
