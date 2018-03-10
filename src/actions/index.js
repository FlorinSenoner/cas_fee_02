import { BETS_CHANGED } from '../constants/action-types'

export const betsUpdate = bet => ({ type: BETS_CHANGED, payload: bet })
