import { fromJS } from 'immutable'

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
})

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default appReducer
