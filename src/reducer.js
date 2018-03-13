import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import dashboard from './screens/Dashboard/reducer'

export default combineReducers({
  routing: routerReducer,
  dashboard,
})
