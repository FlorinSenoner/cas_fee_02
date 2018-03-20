import { LOGIN_SUCCESSFUL } from './constants'

const initialState = {
  user: {},
}
const signIn = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      console.log('I got the login successfull !', action.payload)
      return { ...state, user: action.payload }
    default:
      console.log('why am I in the sign in reducer default?')
      return state
  }
}

export default signIn
