import { BETS_CHANGED } from './constants'

export const betsUpdate = bets => ({ type: BETS_CHANGED, payload: bets })
