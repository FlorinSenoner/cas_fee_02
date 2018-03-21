import { LOGIN_SUCCESSFUL } from './constants'

const initialState = {
  user: {
    email: '',
  },
}

const signIn = (state = initialState, action) => {
  console.log('signin reducer. Action: ', action.type)
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      console.log('I got the login successfull !', action.payload)
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export default signIn
