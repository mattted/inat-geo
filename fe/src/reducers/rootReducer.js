import {combineReducers} from 'redux'
import geoReducer from './geoReducer'

const rootReducer = combineReducers({
  geo: geoReducer,
})

export default rootReducer
