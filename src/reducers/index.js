import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import bets from './bets'

export default combineReducers({
  routing: routerReducer,
  bets,
})
