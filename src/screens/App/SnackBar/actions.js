import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './constants'
import { deleteBet } from '../../../services/bet.service'

export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR })
export const openSnackbar = ({ text, betId }) => ({ type: OPEN_SNACKBAR, payload: { text, betId } })

export const deleteBetSnackbar = betId => deleteBet(betId)
