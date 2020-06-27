import {combineReducers} from 'redux'
import geoReducer from './geoReducer'
import filterReducer from './filterReducer'

const rootReducer = combineReducers({
  geo: geoReducer,
  filter: filterReducer,
})

export default rootReducer
