import { BETS_CHANGED } from './constants'

const initialState = {
  bets: [],
}

const dashboard = (state = initialState, action) => {
  console.log('dashboard reducer. Action: ', action.type)
  switch (action.type) {
    case BETS_CHANGED:
      console.log('bets have changed. updating state!')
      return { ...state, bets: action.payload }
    default:
      console.log('bets reducer without a know state')
      return state
  }
}

export default dashboard
