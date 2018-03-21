import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import dashboard from './screens/Dashboard/reducer'
import signIn from './screens/SignIn/reducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  dashboard,
  signIn,
})
