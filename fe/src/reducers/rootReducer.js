import {combineReducers} from 'redux'
import geoReducer from './geoReducer'
import filterReducer from './filterReducer'
import obsReducer from './obsReducer'

const rootReducer = combineReducers({
  geo: geoReducer,
  filter: filterReducer,
  obs: obsReducer,
})

export default rootReducer
