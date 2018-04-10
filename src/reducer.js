import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import bets from './screens/App/betReducer'
import signIn from './screens/SignIn/reducer'
import snackBar from './screens/App/SnackBar/reducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  bets,
  signIn,
  snackBar,
})
