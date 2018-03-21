import { BETS_CHANGED } from './constants'

const initialState = {
  bets: [],
}

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case BETS_CHANGED:
      return { ...state, bets: action.payload }
    default:
      return state
  }
}

export default dashboard
