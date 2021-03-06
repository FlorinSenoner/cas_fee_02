import { MY_BETS_CHANGED, INVITES_CHANGED, GUESSES_CHANGED } from './betConstants'

export const initialState = {
  invites: [],
  myBets: [],
  guesses: [],
}

const bets = (state = initialState, action) => {
  switch (action.type) {
    case MY_BETS_CHANGED:
      return { ...state, myBets: action.payload }
    case INVITES_CHANGED:
      return { ...state, invites: action.payload }
    case GUESSES_CHANGED:
      return { ...state, guesses: action.payload }
    default:
      return state
  }
}

export default bets
