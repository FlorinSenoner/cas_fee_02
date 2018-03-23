import { MY_BETS_CHANGED, GUESSES_CHANGED, INVITES_CHANGED } from './constants'

export const myBetsUpdate = bets => ({ type: MY_BETS_CHANGED, payload: bets })
export const guessesUpdate = bets => ({ type: GUESSES_CHANGED, payload: bets })
export const invitesUpdate = bets => ({ type: INVITES_CHANGED, payload: bets })
