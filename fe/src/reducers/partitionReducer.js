import * as d3 from 'd3'

const partitionReducer = (state = {
  aggData: {},
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_PARTITION':
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default partitionReducer

