import API from '../api'

const partitionData = () => {
  // let url = `${geoType}_obs_by_query?search=${orgType};column=${orgFilter}`
  
  return dispatch => {
    dispatch({type: 'LOADING_PARTITION'})
    API.fetch('counties_partition')
      .then(data => dispatch({type: 'ADDING_PARTITION', payload: {data: data}}))
  }
} 

export {partitionData}
