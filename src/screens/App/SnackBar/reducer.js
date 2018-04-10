import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from './constants'

const initialState = {
  isOpen: false,
  text: '',
  betId: '',
}

const snackBar = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return { ...state, isOpen: true, text: action.payload.text, betId: action.payload.betId }
    case CLOSE_SNACKBAR:
      return { ...state, isOpen: false, text: '' }
    default:
      return state
  }
}

export default snackBar
