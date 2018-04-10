import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './constants'

export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR })
export const openSnackbar = ({ text, betId }) => ({ type: OPEN_SNACKBAR, payload: { text, betId } })
