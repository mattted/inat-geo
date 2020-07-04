import * as d3 from 'd3'

const obsReducer = (state = {
  selection: '',
  county: '',
  state: '',
  page: 1,
  data: [],
  table: [],
  colorscale: '',
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_OBS':
      return {
        ...state,
        loading: true
      }
    case 'CHANGE_OBS':
      let colorscale = d3.scaleLog()
        .domain([1, d3.extent(Object.values(action.payload.data))[1]])
        .interpolate(d3.interpolateHclLong)
        .range(["#ECEFF4", "#4C566A"])
      return {
        ...state,
        selection: action.payload.selection,
        data: action.payload.data,
        colorscale,
        loading: false
      }
    case 'OBS_TABLE':
      return {
        ...state,
        loading: false,
        table: action.payload.table,
        state: action.payload.state,
        county: action.payload.county,
        page: action.payload.page,
      }
    default:
      return state
  }
}

export default obsReducer
