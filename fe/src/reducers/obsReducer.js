import * as d3 from 'd3'

const obsReducer = (state = {
  type: '',
  data: {},
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
        type: action.payload.type,
        data: action.payload.data,
        category: action.payload.category,
        colorscale,
        loading: false
      }
    default:
      return state
  }
}

export default obsReducer
