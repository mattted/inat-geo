import {combineReducers} from 'redux'
import geoReducer from './geoReducer'
import filterReducer from './filterReducer'
import obsReducer from './obsReducer'
import partitionReducer from './partitionReducer'

const rootReducer = combineReducers({
  geo: geoReducer,
  filter: filterReducer,
  obs: obsReducer,
  partition: partitionReducer
})

export default rootReducer
