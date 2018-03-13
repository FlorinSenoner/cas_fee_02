import { BETS_CHANGED } from '../constants/action-types'

export const betsUpdate = bets => ({ type: BETS_CHANGED, payload: bets })
